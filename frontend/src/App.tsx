import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <section className="mx-auto max-w-6xl">
      <Nav />
      <div className="mt-5 px-2">
        <Outlet />
      </div>
      <Toaster
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
          },
          // Default options for specific types
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />
    </section>
  );
}

export default App;
