import useSWR from "swr";
import NoteCard from "../components/NoteCard";
import SkeletonNoteCard from "../components/SkeletonNoteCard";

export interface NoteType {
  title: string;
  content: string;
  _id: string;
  author: string;
  createdAt: string;
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

  if (error) return <p>{error.message}</p>;

  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
      {isLoading ? (
        <SkeletonNoteCard />
      ) : (
        data && data.notes.map((note) => <NoteCard key={note._id} {...note} />)
      )}
    </section>
  );
};

export default Home;
