import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Nav from "./components/Nav";

function App() {
  const location = useLocation();

  return (
    <section className="mx-auto max-w-6xl">
      <Nav />
      <SwitchTransition>
        <CSSTransition timeout={200} classNames="fade" key={location.pathname}>
          <div className="mt-5 px-2">
            <Outlet />
          </div>
        </CSSTransition>
      </SwitchTransition>
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
