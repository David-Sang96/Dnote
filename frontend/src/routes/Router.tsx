import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Create from "../pages/Create";
import Details from "../pages/Details";
import Home from "../pages/Home";
import Update from "../pages/Update";

const Router = () => {
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
          element: <Create />,
        },
        {
          path: "/update/:id",
          element: <Update />,
        },
        {
          path: "/note/:id",
          element: <Details />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
