import { format } from "date-fns";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import type { NoteType } from "../pages/Home";

const NoteCard = ({ title, content, _id, createdAt }: NoteType) => {
  return (
    <Link
      to={`/note/${_id}`}
      className="flex flex-col rounded-md border-t-4 border-teal-600 p-3 shadow-md"
    >
      <h2 className="pb-4 font-medium md:text-lg">{title}</h2>
      <p className="line-clamp-3 text-sm">{content}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs font-medium text-gray-500">
        <p className="flex items-center gap-1">
          <SlCalender size={15} /> <span>Published on -</span>
        </p>
        <p>{format(createdAt, "EEE, dd MMMM yyyy")}</p>
      </div>
    </Link>
  );
};

export default NoteCard;
