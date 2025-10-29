import Header from "@/components/Header/Header";
import ThemeRegistry from "./ThemeRegistry";
import { wpFetch } from "@/lib/wp";
import { ALL_PAGES, pagesMenuQuery } from "@/lib/queries";
import createDataTree from "@/functions/createDataTree";
export const metadata = { title: "PFST", description: "Pomorski fakultet u Splitu" };

export default async function RootLayout({ children }) {
  const data = await wpFetch(pagesMenuQuery);

  const menu = data?.menu?.menuItems?.nodes || [];
  const menuItems = createDataTree(menu);
  console.log(menuItems);
  // const pages = data.pages.nodes;

  return (
    <html lang="hr" data-theme="light">
      <body>
        <Header menuItems={menuItems} />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
