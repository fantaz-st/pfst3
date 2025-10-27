import Header from "@/components/Header/Header";
import ThemeRegistry from "./ThemeRegistry";

export const metadata = { title: "PFST", description: "Pomorski fakultet u Splitu" };

export default function RootLayout({ children }) {
  return (
    <html lang="hr" data-theme="light">
      <body>
        <Header />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
