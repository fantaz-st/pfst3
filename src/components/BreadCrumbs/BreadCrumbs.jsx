import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import { Typography, Breadcrumbs } from "@mui/material";

const LinkRouter = ({ href, delay = 0, children, ...props }) => (
  <Link href={href} data-aos="fade-right" data-aos-delay={delay * 200} {...props}>
    <Typography variant="body3" sx={{ backgroundColor: "background.lightest", padding: "4px 6px", borderRadius: "6px", color: "primary.main", fontWeight: "600", "&:hover": { opacity: "0.5" } }}>
      {children}
    </Typography>
  </Link>
);

const BreadCrumbs = ({ data }) => {
  let pathnames = data?.page?.ancestors?.nodes || [];
  const pageName = data?.page?.title;

  pathnames = [...pathnames.slice().reverse(), { id: "lmao", title: pageName }];

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      color="text.primary"
      sx={{ fontSize: "0.8rem", marginBottom: "1rem" }}
      separator={
        <span data-aos="fade" data-aos-delay={pathnames.length * 200}>
          /
        </span>
      }
    >
      <LinkRouter color="inherit" href={"/"} style={{ marginTop: "-5px" }}>
        <HomeIcon />
      </LinkRouter>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        return last ? (
          <Typography variant="body3" color="text.primary" key={value.id} sx={{ cursor: "default" }} data-aos="fade-right" data-aos-delay={index * 200}>
            {value.title}
          </Typography>
        ) : (
          <LinkRouter underline="hover" color="inherit" href={value.uri} key={value.id} delay={index}>
            {value.title}
          </LinkRouter>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
