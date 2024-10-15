import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import useSWR from "swr";
import NoteCard from "../components/NoteCard";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import SkeletonNoteCard from "../components/SkeletonNoteCard";

export interface NoteType {
  _id: string;
  author: string;
  title: string;
  content: string;
  image_url: string;
  createdAt: string;
  message: string;
}
export interface NotesResponse {
  notes: NoteType[];
  totalNotes: number;
  totalPages: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  const { data, isLoading, error } = useSWR<NotesResponse>(
    `${import.meta.env.VITE_API_URL}/notes?page=${page}`,
    fetcher,
  );

  const handlePage = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage !== page &&
      selectedPage <= totalPage
    ) {
      setPage(selectedPage);
      // Scroll to top when the page changes
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (data) setTotalPage(data?.totalPages);
  }, [data]);

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
    <section className="pb-4">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {isLoading ? (
          <SkeletonNoteCard />
        ) : (
          data?.notes.map((note) => <NoteCard key={note._id} {...note} />)
        )}
      </div>

      <nav
        aria-label="Page navigation example"
        className="mt-4 flex justify-end"
      >
        <ul className="flex h-8 items-center -space-x-px text-sm">
          <li>
            <button
              className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-stone-200 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePage(page - 1)}
            >
              <span className="sr-only">Previous</span>
              <IoChevronBack />
            </button>
          </li>
          {data &&
            Array.from({ length: data.totalPages }).map((_, i) => (
              <li key={i + 1}>
                <button
                  className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-stone-200 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${page === i + 1 ? "bg-stone-200" : ""}`}
                  onClick={() => handlePage(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          <li>
            <button
              className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-stone-200 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePage(page + 1)}
            >
              <span className="sr-only">Next</span>
              <IoChevronForward />
            </button>
          </li>
        </ul>
      </nav>
      <ScrollToTopBtn />
    </section>
  );
};

export default Home;
