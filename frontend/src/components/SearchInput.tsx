import type { RefObject } from "react";
import { BsX } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
  searchRef: RefObject<HTMLInputElement>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  handleClearSearch: () => void;
}

const SearchInput = ({
  search,
  searchRef,
  handleClearSearch,
  handleSearch,
}: Props) => {
  return (
    <div className="relative mb-3 w-3/5 sm:w-2/5">
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
        <IoSearchOutline className="text-xl" />
      </div>
      <input
        type="text"
        ref={searchRef}
        className="block w-full rounded-lg border border-teal-500 bg-gray-50 px-2.5 ps-10 text-sm text-gray-900 focus:border-teal-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        placeholder="search..."
        onChange={handleSearch}
      />
      {search && (
        <button
          className="absolute inset-y-0 end-2 flex items-center ps-3.5"
          onClick={handleClearSearch}
        >
          <BsX
            className="scale-100 text-2xl duration-300 active:scale-90"
            fill="red"
          />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
