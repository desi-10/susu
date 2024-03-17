import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Karla as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={fontSans.variable}>
          <section className="w-[90%] sticky top-0 lg:container mx-auto border-b p-3 z-10 dark:bg-gray-950 bg-white">
            <Navbar />
          </section>
          <section className="w-[90%] lg:container mx-auto">{children}</section>
        </body>
      </ThemeProvider>
    </html>
  );
}
