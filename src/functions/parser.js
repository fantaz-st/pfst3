import parse, { domToReact } from "html-react-parser";
import Link from "next/link";
import { Link as MUILink } from "@mui/material";

const internal = (href = "") => href.startsWith("/");

export default function parseHtml(html = "") {
  return parse(html, {
    replace: (node) => {
      if (node.type === "tag" && node.name === "a") {
        const href = node.attribs?.href || "#";
        if (internal(href)) return <Link href={href}>{domToReact(node.children)}</Link>;
        return (
          <MUILink href={href} target="_blank" rel="noopener">
            {domToReact(node.children)}
          </MUILink>
        );
      }
    },
  });
}
