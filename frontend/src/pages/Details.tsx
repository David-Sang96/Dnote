import { format } from "date-fns";
import { useState } from "react";
import { FaEdit, FaRegUser } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import DeleteModal from "../components/DeleteModal";
import SkeletonDetail from "../components/SkeletonDetail";
import type { NoteType } from "./Home";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Details = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { id } = useParams();
  const { data, isLoading, error } = useSWR<NoteType>(
    `${import.meta.env.VITE_API_URL}/notes/${id}`,
    fetcher,
  );
  const navigate = useNavigate();

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {isLoading ? (
        <SkeletonDetail />
      ) : (
        <section className="mx-auto max-w-2xl">
          <div className="flex flex-col rounded-md border-t-4 border-teal-600 p-3 shadow-md">
            <div className="flex items-center justify-between pb-4">
              <h2 className="font-medium md:text-lg">{data?.title}</h2>
              <button onClick={() => navigate(-1)}>
                <IoReturnUpBackOutline className="size-6 text-teal-600 sm:size-8" />
              </button>
            </div>
            <p className="text-sm">{data?.content}</p>
            <div className="mt-auto flex items-center justify-between pt-4 text-xs text-gray-500">
              <div className="space-y-1 font-medium">
                <p className="flex items-center gap-1">
                  <p>
                    <FaRegUser size={15} />
                  </p>
                  <span>Posted by - {data?.author}</span>
                </p>
                <p className="flex items-center gap-1">
                  <p>
                    <SlCalender size={14} />
                  </p>
                  <span>
                    Published on -{" "}
                    {data && format(data.createdAt, "EEE, dd MMMM yyyy")}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <p>
                <FaEdit className="size-5 text-teal-700" />
              </p>
              <button onClick={() => setShowModal(true)}>
                <FaTrashCan className="size-5 text-red-700" />
              </button>
            </div>
          </div>
          {showModal && (
            <DeleteModal setShowModal={setShowModal} _id={data?._id} />
          )}
        </section>
      )}
    </>
  );
};

export default Details;
