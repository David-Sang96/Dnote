import { useState } from "react";
import { GrNotes } from "react-icons/gr";
import { IoIosAddCircle, IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { IoHomeOutline, IoReturnUpBackOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/authContext";

const Nav = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();

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
        {authUser && (
          <>
            <NavLink to={"/me"} className="flex flex-col items-center gap-1">
              <p>MY NOTES</p>
              <hr className="hidden h-[1.5px] w-2/4 border-none bg-teal-700" />
            </NavLink>
            <NavLink
              to={"/create"}
              className="flex flex-col items-center gap-1"
            >
              <p>CREATE</p>
              <hr className="hidden h-[1.5px] w-2/4 border-none bg-teal-700" />
            </NavLink>
          </>
        )}
        {!authUser ? (
          <NavLink to={"/log-in"} className="flex flex-col items-center gap-1">
            <p>LOGIN</p>
            <hr className="hidden h-[1.5px] w-2/4 border-none bg-teal-700" />
          </NavLink>
        ) : (
          <button
            className="flex flex-col items-center gap-1"
            onClick={() => {
              setAuthUser(null);
              navigate("/log-in");
              sessionStorage.removeItem("currentPage");
            }}
          >
            <p>LOGOUT</p>
          </button>
        )}
      </ul>

      <div className="flex items-center gap-5 sm:hidden">
        {authUser && (
          <Link to={"/create"}>
            <IoIosAddCircle className="size-7 text-teal-600" />
          </Link>
        )}
        <div
          className="text-3xl text-teal-600 sm:hidden"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <RxHamburgerMenu />
        </div>
      </div>

      {/* Sidebar menu for mobile device */}
      <div
        className={`fixed bottom-0 right-0 top-0 z-50 overflow-hidden backdrop-blur-lg transition-all duration-500 ease-in-out ${showMenu ? "w-full" : "w-0"}`}
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
            onClick={() => {
              setShowMenu(false);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <IoHomeOutline className="size-5 text-teal-600" />
            HOME
          </NavLink>
          {authUser && (
            <NavLink
              to={"/me"}
              className="flex items-center gap-1 border py-2 pl-6"
              onClick={() => setShowMenu(false)}
            >
              <GrNotes className="size-5 text-teal-600" />
              MY NOTES
            </NavLink>
          )}
          {!authUser ? (
            <NavLink
              className="flex items-center gap-1 border py-2 pl-6"
              to={"/log-in"}
              onClick={() => setShowMenu(false)}
            >
              <IoMdLogIn className="size-5 text-teal-600" />
              LOGIN
            </NavLink>
          ) : (
            <button
              className="flex items-center gap-1 border py-2 pl-6"
              onClick={() => {
                setAuthUser(null);
                navigate("/log-in");
                setShowMenu(false);
                sessionStorage.removeItem("currentPage");
              }}
            >
              <IoMdLogOut className="size-5 text-teal-600" />
              LOGOUT
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
