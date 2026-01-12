import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProvider from '@/context/ScrollProvider';
import { NavProvider } from '@/context/NavContext';
import HashScrollHandler from "@/components/HashScrollHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollProvider>
          <NavProvider>
            <CustomCursor />
            <HashScrollHandler />
            {children}
          </NavProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
