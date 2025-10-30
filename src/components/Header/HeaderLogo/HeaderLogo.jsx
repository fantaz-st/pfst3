import Link from "next/link";
import Image from "next/image";
import MainLogoSmall from "../../../../assets/logo/pfst-logo-new-fntz-long-color.svg";
import classes from "./HeaderLogo.module.css";
import { Box } from "@mui/material";

export default function HeaderLogo() {
  return (
    <Link href="/" aria-label="PFST Home" className={classes.logoLink}>
      <Box className={classes.logoBox}>
        <Image src={MainLogoSmall} alt="PFST Logo" fill className={classes.logoImg} />
      </Box>
    </Link>
  );
}
