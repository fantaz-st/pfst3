"use client";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import classes from "./SubPageLink.module.css";

export default function SubPageLink({ subpage: { link, name, description, description2, out, solo } }) {
  return (
    <Box component={Link} href={link} className={`${classes.card} ${solo ? classes.solo : ""}`}>
      <Typography variant="h5" className={classes.title}>
        {name}
      </Typography>
      {description && (
        <Typography variant="body2" className={classes.desc}>
          {description}
        </Typography>
      )}
      {description2 && (
        <Typography variant="body2" className={classes.desc}>
          {description2}
        </Typography>
      )}
      {out && <ArrowForwardIcon className={classes.arrow} />}
    </Box>
  );
}
