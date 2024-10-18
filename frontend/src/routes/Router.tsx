import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Create from "../pages/Create";
import Details from "../pages/Details";
import Home from "../pages/Home";

import { useAuthContext } from "../contexts/authContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Update from "../pages/Update";

const Router = () => {
  const { authUser } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: authUser ? (
            <Create />
          ) : (
            <Navigate to={"/log-in"} replace={true} />
          ),
        },
        {
          path: "/update/:id",
          element: authUser ? (
            <Update />
          ) : (
            <Navigate to={"/log-in"} replace={true} />
          ),
        },
        {
          path: "/note/:id",
          element: <Details />,
        },
        {
          path: "/log-in",
          element: !authUser ? <Login /> : <Navigate to={"/"} replace={true} />,
        },
        {
          path: "/register",
          element: !authUser ? (
            <Register />
          ) : (
            <Navigate to={"/"} replace={true} />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
