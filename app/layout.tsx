import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProvider from '@/components/ScrollProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ScrollProvider>
          <CustomCursor />
          {children}
        </ScrollProvider>
      </body>
    </html>
  );
}
