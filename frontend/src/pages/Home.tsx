import { debounce } from "lodash";
import { useEffect, useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import useSWR from "swr";
import NoteCard from "../components/NoteCard";
import ScrollToTopBtn from "../components/ScrollToTopBtn";
import SearchInput from "../components/SearchInput";
import SkeletonNoteCard from "../components/SkeletonNoteCard";
import { useAuthContext } from "../contexts/authContext";

export interface NoteType {
  _id: string;
  author: string;
  title: string;
  content: string;
  image_url: string;
  createdAt: string;
  message: string;
  pathVar?: string;
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
  const [search, setSearch] = useState<string>("");
  const searchRef = useRef<HTMLInputElement>(null);
  const { authUser } = useAuthContext();

  const { data, isLoading, error } = useSWR<NotesResponse>(
    `${import.meta.env.VITE_API_URL}/notes/all?page=${page}&search=${search}`,
    fetcher,
  );

  const handleSearch = debounce((e) => setSearch(e.target.value), 500);

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

  const handleClearSearch = () => {
    setSearch("");
    if (searchRef.current) searchRef.current.value = "";
  };

  useEffect(() => {
    if (data) setTotalPage(data?.totalPages);
  }, [data]);

  if (error) {
    return (
      <p className="text-center text-xl font-medium text-red-500">
        {error.message
          ? `Error: ${error.message}`
          : "An error occurred while fetching data."}
      </p>
    );
  }

  const noNotesFound = data?.notes.length === 0 && search;

  return (
    <section className="pb-4">
      {authUser && (
        <SearchInput
          search={search}
          handleClearSearch={handleClearSearch}
          searchRef={searchRef}
          handleSearch={handleSearch}
        />
      )}

      {isLoading ? (
        <SkeletonNoteCard />
      ) : noNotesFound ? (
        <div className="pt-20 text-center text-xl font-medium">
          <p>No notes found for "{search}".</p>
        </div>
      ) : data?.notes.length === 0 ? (
        <div className="pt-20 text-center text-xl font-medium">
          <p>No notes available.</p>
          {authUser && (
            <Link to="/create" className="text-sm font-normal underline">
              Create one
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {data?.notes.map((note) => (
            <NoteCard key={note._id} {...note} pathVar="note" />
          ))}
        </div>
      )}

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
                    style={{ backgroundColor: page === i + 1 ? "#e7e5e4" : "" }}
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

export default Home;
