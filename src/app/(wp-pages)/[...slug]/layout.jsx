import { Container, Grid } from "@mui/material";
import SideMenu from "@/components/SideMenu/SideMenu";
import { wpFetch } from "@/lib/wp";
import { pagesMenuQuery } from "@/lib/queries";
import createDataTree from "@/functions/createDataTree";

export const revalidate = 300;

async function getMenu() {
  const menuData = await wpFetch(pagesMenuQuery);
  return createDataTree(menuData.menu.menuItems.nodes);
}

export default async function Layout({ children }) {
  const menuItems = await getMenu();
  return (
    <Container maxWidth="xxl">
      <Grid container>
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: "none", lg: "block" }, position: "sticky", top: 24, alignSelf: "start" }}>
          <SideMenu menuItems={menuItems} />
        </Grid>
        <Grid size={{ xs: 12, md: 9 }}>{children}</Grid>
      </Grid>
    </Container>
  );
}
