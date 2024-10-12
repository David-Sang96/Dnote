import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <section className="mx-auto lg:w-[1200px]">
      <Nav />
      <div className="mt-5 px-2">
        <Outlet />
      </div>
    </section>
  );
}

export default App;
