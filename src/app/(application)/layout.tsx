import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

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
        <body className="">
          <section className="container mx-auto border-b p-3">
            <Navbar />
          </section>
          <section className="container mx-auto">{children}</section>
        </body>
      </ThemeProvider>
    </html>
  );
}
