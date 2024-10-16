/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useEffect, useState, type ChangeEvent } from "react";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdOutlineCloudUpload } from "react-icons/md";
import { PiSpinnerBold } from "react-icons/pi";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import serverRequestFn from "../ultis/serverRequestFn";

type Props = {
  isCreate: boolean;
};

interface FormValues {
  title: string;
  content: string;
  cover_image?: File | string;
}

const NoteForm = ({ isCreate }: Props) => {
  const { id } = useParams();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isError, setIsError] = useState<string>("");
  const [initialValues, setInitialValues] = useState<FormValues>({
    title: "",
    content: "",
    cover_image: "",
  });
  const [previewImg, setPreviewImg] = useState("");

  const navigate = useNavigate();

  // const validate = (values: FormValues) => {
  //   const errors: any = {};
  //   if (values.title.trim().length < 10) {
  //     errors.title = "Title must be at least 10 characters";
  //   }

  //   if (values.content.trim().length < 10) {
  //     errors.content = "content must be at least 10 characters";
  //   }

  //   return errors;
  // };

  useEffect(() => {
    if (!isCreate) {
      const getNote = async () => {
        try {
          setInitialValues({
            title: "Loading title...",
            content: "Loading content...",
            cover_image: "",
          });
          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/notes/${id}`,
          );
          const data = await res.json();

          if (data.message) {
            setIsError(data.message);
            return;
          }

          setPreviewImg(data.image_url);

          setInitialValues({
            title: data.title,
            content: data.content,
            cover_image: data.image_url,
          });
        } catch (error) {
          if (error instanceof Error) {
            setIsError(error.message);
          } else {
            setIsError("An unknown error occurred.");
          }
        }
      };

      getNote();
    }
  }, [isCreate, id]);

  const FormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short")
      .max(30, "Title is too long")
      .required("Title is required"),
    content: Yup.string()
      .min(10, "Content is too short")
      .required("Content is required"),
    cover_image: isCreate
      ? Yup.mixed()
          .required("Image is required")
          .test("fileSize", "File is too large", (value) => {
            return value && (value as File).size <= 5 * 1024 * 1024;
          })
          .test("fileFormat", "Unsupported Format", (value) => {
            return (
              value &&
              ["image/jpeg", "image/png"].includes((value as File).type)
            );
          })
      : Yup.mixed().notRequired(),
  });

  const handleSubmit = async (values: FormValues) => {
    const updatedValues = { ...values };

    if (typeof values.cover_image === "string") {
      // If the image hasn't been changed (still a URL), don't send it as a file
      delete updatedValues.cover_image;
    }

    if (isCreate) {
      const responseStatus = await serverRequestFn({
        setIsLoading: setIsCreating,
        path: "/notes/create",
        method: "POST",
        values: updatedValues,
      });
      if (responseStatus === 201) {
        navigate("/");
      }
    } else {
      const responseStatus = await serverRequestFn({
        setIsLoading: setIsUpdating,
        path: `/notes/update/${id}`,
        method: "PATCH",
        values: updatedValues,
      });
      if (responseStatus === 200) {
        navigate("/");
      }
    }
  };

  const handleFileUpload = (
    event: ChangeEvent<HTMLInputElement>,
    setFieldValue: FormikHelpers<any>["setFieldValue"],
    setFieldTouched: FormikHelpers<any>["setFieldTouched"],
    validateField: FormikHelpers<any>["validateField"],
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setFieldValue("cover_image", file);
      setFieldTouched("cover_image", true); // Mark the field as touched
      validateField("cover_image"); // Trigger validation for the file field
    }
  };

  const handleRemoveFile = (
    setFieldValue: FormikHelpers<any>["setFieldValue"],
  ) => {
    setPreviewImg("");
    setFieldValue("cover_image", "");
  };

  if (isError) {
    return (
      <div className="text-center text-xl font-medium text-red-500">
        <p>{isError}</p>
        <Link to={"/"} className="text-sm font-normal text-teal-500 underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl pb-5">
      <div className="item-center flex justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">
          {isCreate ? "Create a new note." : "Update note"}
        </h2>
        <button onClick={() => navigate(-1)}>
          <IoReturnUpBackOutline className="size-6 text-teal-600 sm:size-8" />
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
        enableReinitialize={true} // Allows form to update when initialValues change
      >
        {({ errors, setFieldValue, setFieldTouched, validateField }) => (
          <Form className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="title"
                className={`mb-2 block font-medium text-gray-900 ${errors.title && "text-red-500"}`}
              >
                Note Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className={`mb-2 block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${errors.title ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-teal-500 focus:border-teal-500 focus:ring-teal-500"}`}
                placeholder="write your title here..."
              />
              {/* {errors.title && touched.title && (
                <span className="text-xs font-semibold text-red-500">
                  {errors.title}
                </span>
              )} */}
              <ErrorMessage
                name="title"
                component="div"
                className="text-xs font-semibold text-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className={`mb-2 block font-medium text-gray-900 ${errors.content && "text-red-500"}`}
              >
                Note Content
              </label>
              <Field
                id="content"
                name="content"
                as="textarea"
                rows={6}
                className={`mb-2 block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 ${errors.content ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-teal-500 focus:border-teal-500 focus:ring-teal-500"}`}
                placeholder="Write your content here..."
              />
              <ErrorMessage
                name="content"
                component="div"
                className="text-xs font-semibold text-red-500"
              />
            </div>
            {!previewImg && (
              <div className="flex w-full flex-col justify-center gap-2.5">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <MdOutlineCloudUpload size={30} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG or JPEG
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleFileUpload(
                        e,
                        setFieldValue,
                        setFieldTouched,
                        validateField,
                      )
                    }
                  />
                </label>
                <ErrorMessage
                  name="cover_image"
                  component="div"
                  className="text-xs font-semibold text-red-500"
                />
              </div>
            )}
            {previewImg && (
              <div className="flex flex-col">
                <button
                  className="mb-1 w-fit self-end rounded-md border-2 border-teal-500 bg-teal-500 px-2 text-sm text-white hover:bg-teal-600"
                  onClick={() => handleRemoveFile(setFieldValue)}
                >
                  remove
                </button>
                <img
                  src={previewImg}
                  alt="preview"
                  className="mx-auto h-60 w-full rounded-md object-cover sm:h-80"
                />
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 sm:w-auto ${(isUpdating || isCreating) && "cursor-not-allowed bg-teal-400 hover:bg-teal-500"}`}
                disabled={isCreating || isUpdating}
              >
                {(isCreating || isUpdating) && (
                  <PiSpinnerBold size={17} className="animate-spin" />
                )}
                {isCreate ? " Save" : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NoteForm;
