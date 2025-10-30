import Link from "next/link";
import classes from "./HeaderMenu.module.css";
import { Typography } from "@mui/material";

export default function HeaderMenu({ menuItems, variant = "horizontal" }) {
  if (variant === "vertical") {
    return (
      <nav className={`${classes.menu} ${classes.vertical}`}>
        {menuItems.map((it) => (
          <Link key={it.databaseId} href={it.uri} className={classes.vItem}>
            <Typography variant="h6">{it.label}</Typography>
          </Link>
        ))}
      </nav>
    );
  }
  return (
    <nav className={classes.menu}>
      {menuItems.map((it) => (
        <Link key={it.databaseId} href={it.uri} className={classes.item}>
          <Typography variant="h6">{it.label}</Typography>
        </Link>
      ))}
    </nav>
  );
}
