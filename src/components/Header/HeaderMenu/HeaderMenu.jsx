import Link from "next/link";
import classes from "./HeaderMenu.module.css";

export default function HeaderMenu({ menuItems, variant = "horizontal" }) {
  if (variant === "vertical") {
    return (
      <nav className={`${classes.menu} ${classes.vertical}`}>
        {menuItems.map((it) => (
          <Link key={it.databaseId} href={it.uri} className={classes.vItem}>
            {it.label}
          </Link>
        ))}
      </nav>
    );
  }
  return (
    <nav className={classes.menu}>
      {menuItems.map((it) => (
        <Link key={it.databaseId} href={it.uri} className={classes.item}>
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
