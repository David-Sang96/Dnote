import { FaFileAlt, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mt-36 flex justify-center">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <FaFileAlt className="h-24 w-24 text-gray-400" />
        </div>
        <h1 className="mb-4 text-2xl font-bold text-gray-800">
          404 - Note Not Found
        </h1>
        <p className="mb-8 text-gray-600">
          Oops! The note you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 text-white transition-colors hover:bg-teal-700"
        >
          <FaHome className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
