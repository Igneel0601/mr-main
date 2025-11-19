
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="px-60">
        <Intro />
      </main>
    </>
  );
}
