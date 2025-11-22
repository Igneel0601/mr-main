
import Services from "@/app/services/page";
import Navbar from "@/components/Navbar";
import Index from "@/app/index/page";
import OurServices from "@/app/ourServices/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Index />
        <OurServices />
        <Services />
      </main>
    </>
  );
}
