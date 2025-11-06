"use client";
import parseHtml from "@/functions/parser";
import { Stack, Button, Typography, Link as MLink, Box, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import classes from "./FileBlock.module.css";

const PdfIcon = () => {
  return (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 31.9 40" style={{ height: "30px" }}>
      <path
        className="st0"
        d="M25.7,26.1c-0.5,0.1-1.2,0.2-2,0c-0.8-0.1-1.7-0.4-2.5-0.7c1.5-0.2,2.6-0.1,3.6,0.2
	C25,25.7,25.4,25.9,25.7,26.1z M17.5,24.7c-0.1,0-0.1,0-0.2,0c-0.4,0.1-0.8,0.2-1.2,0.3l-0.5,0.1c-1,0.3-2,0.5-3.1,0.8
	c0.4-0.9,0.7-1.9,1.1-2.8c0.3-0.7,0.5-1.4,0.8-2.1c0.1,0.2,0.3,0.5,0.4,0.7C15.6,22.9,16.5,23.9,17.5,24.7z M14.9,14.2
	c0.1,1.2-0.2,2.3-0.5,3.3c-0.4-1.3-0.7-2.8-0.1-3.9c0.1-0.3,0.3-0.5,0.3-0.5C14.7,13.3,14.9,13.7,14.9,14.2z M9.6,28.8
	c-0.3,0.5-0.5,0.9-0.8,1.3c-0.6,1-1.7,2-2.2,2c-0.1,0-0.1,0-0.2-0.1c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.4,0.5-1,1.2-1.6
	C8.1,29.7,8.8,29.2,9.6,28.8z M27.4,26.1c-0.1-1.2-2.1-1.9-2.1-1.9c-0.8-0.3-1.6-0.4-2.5-0.4c-1,0-2.1,0.1-3.5,0.5
	c-1.2-0.9-2.3-2-3.1-3.2c-0.4-0.5-0.7-1.1-1-1.6c0.7-1.6,1.3-3.4,1.2-5.3c-0.1-1.6-0.8-2.6-1.8-2.6c-0.7,0-1.2,0.5-1.7,1.5
	c-0.8,1.7-0.6,3.9,0.6,6.5c-0.4,1.1-0.9,2.2-1.3,3.2c-0.5,1.3-1,2.7-1.6,4c-1.6,0.6-3,1.4-4.1,2.4c-0.7,0.6-1.6,1.6-1.7,2.6
	c0,0.5,0.1,0.9,0.5,1.3c0.4,0.4,0.8,0.6,1.3,0.6c1.6,0,3.1-2.2,3.4-2.6c0.6-0.9,1.1-1.9,1.7-3c1.4-0.5,2.8-0.9,4.2-1.2l0.5-0.1
	c0.4-0.1,0.8-0.2,1.2-0.3c0.4-0.1,0.9-0.2,1.3-0.3c1.4,0.9,3,1.5,4.5,1.7c1.3,0.2,2.4,0.1,3.2-0.3C27.3,26.9,27.4,26.4,27.4,26.1z
	 M30.5,36.2c0,2.2-1.9,2.3-2.3,2.3H3.7c-2.1,0-2.3-1.9-2.3-2.3l0-32.5c0-2.2,1.9-2.3,2.3-2.3h16.5l0,0v6.4c0,1.3,0.8,3.7,3.7,3.7
	h6.4l0.1,0.1L30.5,36.2z M29,10.2H24c-2.1,0-2.3-1.9-2.3-2.3V3L29,10.2z M31.9,36.2V11.1L21.7,0.9v0h0L20.9,0H3.7C2.4,0,0,0.8,0,3.8
	v32.5C0,37.5,0.8,40,3.7,40h24.5C29.5,40,31.9,39.2,31.9,36.2z"
      />
    </svg>
  );
};

const WordIcon = () => {
  return (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 31.9 40" style={{ height: "30px" }}>
      <path
        className="st0"
        d="M7.3,16.4L5.2,7.9h1.6l1,4.2c0.1,0.6,0.3,1.2,0.4,1.7c0.1-0.6,0.3-1.2,0.4-1.8l1.1-4.2h1.4l1,4.2
	c0.1,0.6,0.3,1.1,0.4,1.7c0.1-0.5,0.2-1,0.4-1.5l0-0.2l1.1-4.2h1.5l-2.4,8.5h-1.4l-1.1-4.3c-0.1-0.5-0.2-1-0.3-1.5
	c-0.1,0.5-0.2,1-0.4,1.5l-1.2,4.3L7.3,16.4L7.3,16.4L7.3,16.4z M16.8,14.6H26c0.4,0,0.8,0.3,0.8,0.8c0,0.4-0.3,0.8-0.8,0.8h-9.2
	c-0.4,0-0.8-0.3-0.8-0.8C16,15,16.3,14.6,16.8,14.6z M26.7,20.5c0,0.4-0.3,0.8-0.8,0.8H6.8C6.4,21.3,6,21,6,20.5
	c0-0.4,0.3-0.8,0.8-0.8H26C26.4,19.8,26.7,20.1,26.7,20.5z M26.7,25.1c0,0.4-0.3,0.8-0.8,0.8H6.8c-0.4,0-0.8-0.3-0.8-0.8
	c0-0.4,0.3-0.8,0.8-0.8H26C26.4,24.3,26.7,24.7,26.7,25.1z M26.7,29.7c0,0.4-0.3,0.8-0.8,0.8H6.8c-0.4,0-0.8-0.3-0.8-0.8
	c0-0.4,0.3-0.8,0.8-0.8H26C26.4,28.9,26.7,29.2,26.7,29.7z M26.7,34.3c0,0.4-0.3,0.8-0.8,0.8H6.8c-0.4,0-0.8-0.3-0.8-0.8
	c0-0.4,0.3-0.8,0.8-0.8H26C26.4,33.5,26.7,33.9,26.7,34.3z M30.5,36.2c0,2.2-1.9,2.3-2.3,2.3H3.7c-2.1,0-2.3-1.9-2.3-2.3l0-32.5
	c0-2.2,1.9-2.3,2.3-2.3h16.5l0,0v6.4c0,1.3,0.8,3.7,3.7,3.7h6.4l0.1,0.1L30.5,36.2z M29,10.2H24c-2.1,0-2.3-1.9-2.3-2.3V3L29,10.2z
	 M31.9,36.2V11.1L21.7,0.9v0h0L20.9,0H3.7C2.4,0,0,0.8,0,3.8v32.5C0,37.5,0.8,40,3.7,40h24.5C29.5,40,31.9,39.2,31.9,36.2z"
      />
    </svg>
  );
};

const PowerpointIcon = () => {
  return (
    <svg version="1.1" x="0px" y="0px" viewBox="0 0 31.9 40" style={{ height: "30px" }}>
      <g>
        <path
          d="M30.5,36.2c0,2.2-1.9,2.3-2.3,2.3H3.7c-2.1,0-2.3-1.9-2.3-2.3V3.7c0-2.2,1.9-2.3,2.3-2.3h16.5l0,0v6.4
		c0,1.3,0.8,3.7,3.7,3.7h6.4l0.1,0.1L30.5,36.2z M29,10.2h-5c-2.1,0-2.3-1.9-2.3-2.3V3L29,10.2z M31.9,36.2V11.1L21.7,0.9l0,0l0,0
		L20.9,0H3.7C2.4,0,0,0.8,0,3.8v32.5C0,37.5,0.8,40,3.7,40h24.5C29.5,40,31.9,39.2,31.9,36.2z"
        />
      </g>
      <path
        d="M2.9,25.1v-5.7h1.9c0.7,0,1.2,0,1.4,0.1C6.5,19.5,6.8,19.7,7,20s0.3,0.7,0.3,1.1c0,0.4-0.1,0.6-0.2,0.9s-0.3,0.4-0.5,0.6
	s-0.4,0.2-0.6,0.3c-0.3,0.1-0.7,0.1-1.2,0.1H4.1v2.2H2.9z M4.1,20.3V22h0.6c0.5,0,0.8,0,0.9-0.1s0.3-0.2,0.4-0.3s0.1-0.3,0.1-0.4
	c0-0.2-0.1-0.4-0.2-0.5s-0.3-0.2-0.5-0.3c-0.1,0-0.4,0-0.8,0H4.1z M8.3,25.1v-5.7h1.9c0.7,0,1.2,0,1.4,0.1c0.3,0.1,0.6,0.3,0.8,0.6
	s0.3,0.7,0.3,1.1c0,0.4-0.1,0.6-0.2,0.9s-0.3,0.4-0.5,0.6s-0.4,0.2-0.6,0.3c-0.3,0.1-0.7,0.1-1.2,0.1H9.4v2.2H8.3z M9.4,20.3V22h0.6
	c0.5,0,0.8,0,0.9-0.1s0.3-0.2,0.4-0.3s0.1-0.3,0.1-0.4c0-0.2-0.1-0.4-0.2-0.5s-0.3-0.2-0.5-0.3c-0.1,0-0.4,0-0.8,0H9.4z M14.9,25.1
	v-4.8h-1.7v-1h4.6v1h-1.7v4.8H14.9z M17.9,25.1l2-3l-1.8-2.7h1.4l1.1,1.8l1.1-1.8h1.3l-1.8,2.8l2,2.9h-1.4l-1.3-2l-1.3,2H17.9z"
      />
      <path d="M25.7,17.2c0,0.4-0.3,0.8-0.8,0.8H0.8C0.4,18,0,17.7,0,17.2c0-0.4,0.3-0.8,0.8-0.8H25C25.4,16.5,25.7,16.8,25.7,17.2z" />
      <path d="M25.7,27.2c0,0.4-0.3,0.8-0.8,0.8H0.8C0.4,28,0,27.7,0,27.2c0-0.4,0.3-0.8,0.8-0.8H25C25.4,26.5,25.7,26.8,25.7,27.2z" />
      <path d="M24.9,27.9c-0.4,0-0.8-0.3-0.8-0.8v-9.9c0-0.4,0.3-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v10C25.6,27.6,25.3,27.9,24.9,27.9z" />
    </svg>
  );
};
export default function FileBlock({ attributes }) {
  const highLightLinks = false;
  if (attributes.html && !attributes.href) return <>{parseHtml(attributes.html)}</>;
  const url = attributes.href || "";
  const label = `${attributes.fileLabel} [${attributes.filesizeHuman}]`;
  return (
    <Box className={classes.container}>
      <Box className={classes.fileTypeIcon}>{attributes.extension === "pdf" ? <PdfIcon /> : attributes.extension === "word" ? <WordIcon /> : <PowerpointIcon />}</Box>
      <Box className={classes.content}>
        <Typography variant="body3">{label}</Typography>
        <Box className={classes.icons}>
          {attributes.extension === "pdf" && (
            <a href={url} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer" alt={attributes.fileLabel}>
              <Tooltip title="Otvori u pregledniku" arrow>
                <VisibilityIcon className={classes.eye} sx={{ backgroundColor: highLightLinks ? "#ff0000" : "none" }} />
              </Tooltip>
            </a>
          )}
          <a download href={url} style={{ textDecoration: "none" }} target="_blank" rel="noopener noreferrer" alt={attributes.fileLabel}>
            <Tooltip title="Preuzmi datoteku" arrow>
              <DownloadIcon className={classes.arrow} sx={{ backgroundColor: highLightLinks ? "#ff0000" : "none" }} />
            </Tooltip>
          </a>
        </Box>
      </Box>
    </Box>
  );
}

{
  /* <Stack direction="row" spacing={2} alignItems="center">
      <Button component={MLink} href={url} target="_blank" rel="noopener" variant="contained">
        {label}
      </Button>
      {size ? (
        <Typography variant="body2" color="text.secondary">
          {size}
        </Typography>
      ) : null}
    </Stack> */
}
