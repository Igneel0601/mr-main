
import Services from "@/app/services/page";
import Navbar from "@/components/Navbar";
import Index from "@/app/index/page";
import OurServicesSvg from "@/app/ourServicesSvg/page";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Index />
        <OurServicesSvg />
        <Services />
      </main>
    </>
  );
}
