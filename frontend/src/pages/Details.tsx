import { format } from "date-fns";
import { FaRegUser } from "react-icons/fa";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import SkeletonDetail from "../components/SkeletonDetail";
import type { NoteType } from "./Home";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Details = () => {
  const { id } = useParams();
  const { data, isLoading } = useSWR<NoteType>(
    `${import.meta.env.VITE_API_URL}/notes/${id}`,
    fetcher,
  );
  const navigate = useNavigate();

  if (data && data.message) {
    return (
      <div className="text-center text-xl font-medium text-red-500">
        <p>{data.message}</p>
        <Link to={"/"} className="text-sm font-normal text-teal-500 underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        <section className="mx-auto max-w-2xl">
          <div className="flex flex-col rounded-md border-t-4 border-teal-600 p-3 shadow-md">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-lg font-medium">{data?.title}</h2>
              <button onClick={() => navigate(-1)}>
                <IoReturnUpBackOutline className="size-6 text-teal-600 sm:size-8" />
              </button>
            </div>
            <p className="pb-3 text-sm">{data?.content}</p>
            <img
              src={data?.image_url}
              alt="photo "
              className="h-80 rounded-md"
            />
            <div className="mt-auto flex items-center justify-between pt-4 text-xs text-gray-500">
              <div className="space-y-1 font-medium">
                <div className="flex items-center gap-1">
                  <p>
                    <FaRegUser size={15} />
                  </p>
                  <span>Posted by - {data?.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <p>
                    <SlCalender size={14} />
                  </p>
                  <span>
                    Published on -{" "}
                    {data && format(data.createdAt, "EEE, dd MMMM yyyy")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Details;
