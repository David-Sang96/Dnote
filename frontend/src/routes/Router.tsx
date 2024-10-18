// routes/Routes.tsx
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../contexts/authContext";
import Create from "../pages/Create";
import Details from "../pages/Details";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyNoteDetails from "../pages/MyNoteDetails";
import MyNotes from "../pages/MyNotes";
import Register from "../pages/Register";
import Update from "../pages/Update";

const Routes = () => {
  const { authUser, loading } = useAuthContext();

  if (loading) return <Spinner />;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/create",
          element: authUser ? <Create /> : <Navigate to="/log-in" replace />,
        },
        {
          path: "/update/:id",
          element: authUser ? <Update /> : <Navigate to="/log-in" replace />,
        },
        { path: "/note/:id", element: <Details /> },
        {
          path: "/log-in",
          element: !authUser ? <Login /> : <Navigate to="/" replace />,
        },
        {
          path: "/register",
          element: !authUser ? <Register /> : <Navigate to="/" replace />,
        },
        {
          path: "/me",
          element: authUser ? <MyNotes /> : <Navigate to="/log-in" replace />,
        },
        {
          path: "/me/:id",
          element: authUser ? (
            <MyNoteDetails />
          ) : (
            <Navigate to="/log-in" replace />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
