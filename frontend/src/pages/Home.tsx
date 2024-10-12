import NoteCard from "../components/NoteCard";

const Home = () => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </section>
  );
};

export default Home;
