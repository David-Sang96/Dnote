import { useState } from "react";
import { IoIosAddCircle, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { IoHomeOutline, IoReturnUpBackOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-between bg-slate-100 px-2 py-4">
      <Link to={"/"} className="text-2xl font-bold text-teal-600 md:text-3xl">
        Dnote.io
      </Link>
      <ul className="hidden gap-5 text-sm text-gray-700 sm:flex">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-teal-700" />
        </NavLink>
        <NavLink to={"/create"} className="flex flex-col items-center gap-1">
          <p>CREATE</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-teal-700" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p>LOGIN</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-teal-700" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p>LOGOUT</p>
          <hr className="hidden h-[1.5px] w-2/4 border-none bg-teal-700" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-5 sm:hidden">
        <Link to={"/create"}>
          <IoIosAddCircle className="size-7 text-teal-600" />
        </Link>
        <div
          className="text-3xl text-teal-600 sm:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <RxHamburgerMenu />
        </div>
      </div>

      {/* Sidebar menu for mobile device */}
      <div
        className={`absolute bottom-0 right-0 top-0 overflow-hidden backdrop-blur-lg transition-all duration-500 ease-in-out ${showMenu ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex cursor-pointer items-center gap-2 p-3 pl-6"
            onClick={() => setShowMenu(false)}
          >
            <IoReturnUpBackOutline className="size-5 text-teal-600" />
            <p>Back</p>
          </div>
          <NavLink
            className="flex items-center gap-1 border py-2 pl-6"
            to={"/"}
            onClick={() => setShowMenu(false)}
          >
            <IoHomeOutline className="size-5 text-teal-600" />
            HOME
          </NavLink>
          <NavLink
            className="flex items-center gap-1 border py-2 pl-6"
            to={"/collection"}
            onClick={() => setShowMenu(false)}
          >
            <IoMdLogIn className="size-5 text-teal-600" />
            LOGIN
          </NavLink>
          <NavLink
            className="flex items-center gap-1 border py-2 pl-6"
            to={"/about"}
            onClick={() => setShowMenu(false)}
          >
            <IoMdLogOut className="size-5 text-teal-600" />
            LOGOUT
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
