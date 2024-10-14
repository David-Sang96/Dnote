import { useState } from "react";
import toast from "react-hot-toast";
import { PiSpinnerBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../ultis/axiosInstance";

interface DeleteProps {
  setShowModal: (value: boolean) => void;
  _id: string | undefined;
}

const DeleteModal = ({ setShowModal, _id }: DeleteProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.delete(`/notes/${_id}`);
      toast.success("Deleted");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Unknown error occur");
      }
    } finally {
      setShowModal(false);
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800">Delete Note</h2>
        <p className="mt-2 text-gray-600">
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className={`rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-400 ${isLoading && "cursor-not-allowed"}`}
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className={`flex items-center gap-1 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 ${isLoading && "cursor-not-allowed bg-red-400 hover:bg-red-400"}`}
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading && <PiSpinnerBold className="size-5 animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
