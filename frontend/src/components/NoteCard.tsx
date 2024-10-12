import { Link } from "react-router-dom";

const NoteCard = () => {
  return (
    <Link to={"/update/1"} className="border-t-4 border-teal-600 p-3 shadow-md">
      <h3 className="font-medium md:text-lg">Create notes as your desire.</h3>
      <p className="text-sm">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
        similique nihil molestiae, debitis ea laboriosam vel.
      </p>
    </Link>
  );
};

export default NoteCard;
