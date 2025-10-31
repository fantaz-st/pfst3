import Header from "@/components/Header/Header";
import ThemeRegistry from "./ThemeRegistry";
import { wpFetch } from "@/lib/wp";
import { ALL_PAGES, pagesMenuQuery } from "@/lib/queries";
import createDataTree from "@/functions/createDataTree";
import { Box } from "@mui/material";
export const metadata = { title: "PFST", description: "Pomorski fakultet u Splitu" };
import "@/app/globals.css";

export default async function RootLayout({ children }) {
  const data = await wpFetch(pagesMenuQuery);

  const menu = data?.menu?.menuItems?.nodes || [];
  const menuItems = createDataTree(menu);
  // console.log(menuItems);
  // const pages = data.pages.nodes;

  return (
    <html lang="hr" data-theme="light">
      <body>
        <ThemeRegistry>
          <Header menuItems={menuItems} />
          <Box sx={{ marginBottom: "4rem" }}></Box>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
