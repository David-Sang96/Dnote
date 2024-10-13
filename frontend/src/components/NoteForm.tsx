import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

type Props = {
  isCreate: boolean;
};

interface FormValues {
  title: string;
  content: string;
}

const initialValues: FormValues = {
  title: "",
  content: "",
};

const NoteForm = ({ isCreate }: Props) => {
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

  const FormSchema = Yup.object({
    title: Yup.string()
      .min(3, "Title is too short!")
      .max(30, "Title is too long!")
      .required("Title is required"),
    content: Yup.string()
      .min(10, "Content is too short!")
      .required("Content is required"),
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
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
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FormSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ errors, touched }) => (
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
                className={`mb-2 block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 ${errors.title ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-teal-500"}`}
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
                  rows={4}
                  className={`mb-2 block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-teal-500 focus:ring-teal-500 ${errors.content ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-teal-500"}`}
                  placeholder="Write your content here..."
                />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-xs font-semibold text-red-500"
                />
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NoteForm;
