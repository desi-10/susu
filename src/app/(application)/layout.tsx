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
        <body>
          <Navbar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
