import { useForm, type SubmitHandler } from "react-hook-form";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Props = {
  isCreate: boolean;
};

type IFormInput = {
  title: string;
  description: string;
};

const ReactHookForm = ({ isCreate }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="mx-auto md:w-2/3">
      <div className="item-center flex justify-between">
        <h2 className="text-lg sm:text-xl">
          {isCreate ? "Create a new note." : "Update note"}
        </h2>
        <button onClick={() => navigate(-1)}>
          <IoReturnUpBackOutline className="size-6 text-teal-600 sm:size-8" />
        </button>
      </div>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-gray-900"
          >
            Note Title
          </label>
          <input
            type="text"
            id="email"
            className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500`}
            placeholder="write your title here..."
            {...register("title", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.title?.type === "required" && (
            <span className="text-sm font-semibold text-red-500">
              Title is required
            </span>
          )}
          {errors.title?.type === "minLength" && (
            <span className="text-sm font-semibold text-red-500">
              Title must be at least 3 characters
            </span>
          )}
          {errors.title?.type === "maxLength" && (
            <span className="text-sm font-semibold text-red-500">
              Title must not be more than 20 characters
            </span>
          )}
        </div>
        <div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-medium text-gray-900"
            >
              Note Description
            </label>
            <textarea
              id="message"
              rows={4}
              className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500`}
              placeholder="Write your description here..."
              defaultValue={""}
              {...register("description", { required: true, minLength: 10 })}
            />
            {errors.description?.type === "required" && (
              <span className="text-sm font-semibold text-red-500">
                Description is required
              </span>
            )}
            {errors.description?.type === "minLength" && (
              <span className="text-sm font-semibold text-red-500">
                Description must be at least 10 characters
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 sm:w-auto"
          >
            {isCreate ? " Save" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReactHookForm;
