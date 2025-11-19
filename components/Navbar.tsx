import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-20 bg-white/0 backdrop-blur-md text-white flex items-center px-[220px] animate-slide-down">
      <a href="/" className="flex items-center gap-0 logo-link">
        <div className="flex items-center gap-0">
          <Image src="/logo_dark.svg" alt="Logo" width={64} height={64} />
        </div>
        <div className="flex flex-col leading-tight animate-slide-in-right overflow-hidden w-[120px]">
          <span className="text-sm font-normal whitespace-nowrap">MARKETING</span>
          <span className="text-sm font-normal whitespace-nowrap">RAVAN</span>
        </div>
      </a>
      <div className="ml-auto flex gap-18">
        <a href="#" className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full">PROJECTS</a>
        <a href="#" className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full">SERVICES</a>
        <a href="#" className="relative hover:text-[#8d7aff] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-0.5 after:bg-[#8d7aff] after:transition-all after:duration-300 hover:after:w-full">ABOUT</a>
      </div>
      <div className="ml-auto flex">
        <a href="#" className="rounded-full border border-[#8d7aff] py-3 px-8 no-scale">
          <span className="inline-block">GET IN TOUCH</span>
        </a>
      </div>
    </nav>
  );
}
