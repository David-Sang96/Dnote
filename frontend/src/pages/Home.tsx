import { Link } from "react-router-dom";
import useSWR from "swr";
import NoteCard from "../components/NoteCard";
import SkeletonNoteCard from "../components/SkeletonNoteCard";

export interface NoteType {
  title: string;
  content: string;
  _id: string;
  author: string;
  createdAt: string;
  message?: string;
}
interface Notes {
  notes: NoteType[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, isLoading, error } = useSWR<Notes>(
    `${import.meta.env.VITE_API_URL}/notes`,
    fetcher,
  );

  if (error) {
    // If the error object has a message, display it; otherwise, show a fallback message
    return (
      <p className="text-center text-xl font-medium text-red-500">
        {error.message
          ? `Error: ${error.message}`
          : "An error occurred while fetching data."}
      </p>
    );
  }

  if (data?.notes.length === 0)
    return (
      <div className="pt-20 text-center text-xl font-medium">
        <p>No notes available.</p>
        <Link to="/create" className="text-sm font-normal underline">
          Create one
        </Link>
      </div>
    );

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {isLoading ? (
        <SkeletonNoteCard />
      ) : (
        data?.notes.map((note) => <NoteCard key={note._id} {...note} />)
      )}
    </section>
  );
};

export default Home;
