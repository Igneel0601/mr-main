import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProvider from '@/context/ScrollProvider';
import { NavProvider } from '@/context/NavContext';

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
            {children}
          </NavProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
