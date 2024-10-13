import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <section className="mx-auto max-w-7xl">
      <Nav />
      <div className="mt-5 px-2">
        <Outlet />
      </div>
    </section>
  );
}

export default App;
