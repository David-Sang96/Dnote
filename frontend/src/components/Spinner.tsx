import { ImSpinner3 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <ImSpinner3 className="size-4 animate-spin" />;
    </div>
  );
};

export default Spinner;
