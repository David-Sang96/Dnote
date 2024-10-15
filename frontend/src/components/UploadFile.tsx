import { Field } from "formik";
import { MdOutlineCloudUpload } from "react-icons/md";

const UploadFile = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <label
        htmlFor="dropzone-file"
        className="flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <MdOutlineCloudUpload size={30} />
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG or JPEG (ONLY ONE FILE)
          </p>
        </div>
        <Field id="dropzone-file" type="file" className="hidden" />
      </label>
    </div>
  );
};

export default UploadFile;
