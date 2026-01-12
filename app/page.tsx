
import Services from "@/components/services/services";
import Navbar from "@/components/Navbar";
import OurServicesSvg from "@/components/ourServicesSvg/ourServicesSvg";
import Intro from "@/components/intro/intro";

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <main>
        <Intro />
        <OurServicesSvg />
        <Services />
      </main>
    </div>
  );
}
