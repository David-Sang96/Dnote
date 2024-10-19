import { useEffect, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
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

const fetcher = (url: string) => {
  const authUser = localStorage.getItem("authUser");
  const token = authUser ? JSON.parse(authUser).token : null;

  return fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((errorData) => {
        throw new Error(errorData.message);
      });
    }
    return res.json();
  });
};

const MyNotes = () => {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const { data, isLoading, error } = useSWR<NotesResponse>(
    token && `${import.meta.env.VITE_API_URL}/my-note?page=${page}`,
    fetcher,
  );

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    const fetchedToken = authUser ? JSON.parse(authUser).token : null;
    setToken(fetchedToken);
  }, []);

  useEffect(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    if (savedPage) {
      setPage(parseInt(savedPage, 10));
    }
  }, []);

  const handlePage = (selectedPage: number) => {
    if (
      selectedPage >= 1 &&
      selectedPage !== page &&
      selectedPage <= totalPage
    ) {
      setPage(selectedPage);
      sessionStorage.setItem("currentPage", selectedPage.toString());

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
    if (error.message === "Unauthorized - token expired") {
      localStorage.removeItem("authUser");
      navigate("/log-in");
    }

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
          data?.notes.map((note) => (
            <NoteCard key={note._id} {...note} pathVar="me" />
          ))
        )}
      </div>

      {!isLoading && data && data.totalNotes > 9 && (
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
                    className={`flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-stone-200 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    style={{ backgroundColor: page === i + 1 ? "#e7e5e4" : "" }} // Fallback to inline style
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
      )}
      <div className="sm:hidden">
        <ScrollToTopBtn />
      </div>
    </section>
  );
};

export default MyNotes;
