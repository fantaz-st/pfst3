import Header from "@/components/Header/Header";
import ThemeRegistry from "./ThemeRegistry";
import { wpFetchAllMenuItems } from "@/lib/wp";
import createDataTree from "@/functions/createDataTree";
import { Box } from "@mui/material";
import "@/app/globals.css";

export const metadata = { title: "PFST", description: "Pomorski fakultet u Splitu" };

export default async function RootLayout({ children }) {
  const flat = await wpFetchAllMenuItems();
  const menuItems = createDataTree(flat);

  return (
    <html lang="hr" data-theme="light">
      <body>
        <ThemeRegistry>
          <Header menuItems={menuItems} />
          <Box sx={{ marginBottom: "4rem" }} />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
