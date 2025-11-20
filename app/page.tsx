
import Services from "@/components/ Services";
import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Index from "@/components/Index";
import styles from '@/components/styles.module.scss';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Index />
        <Services />
      </main>
    </>
  );
}
