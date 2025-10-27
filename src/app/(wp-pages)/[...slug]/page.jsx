import { wpFetch } from "@/lib/wp";
import { PAGE_BY_PATH } from "@/lib/queries";
import { notFound } from "next/navigation";
import { Container, Typography, List, ListItem, Link as MUILink } from "@mui/material";

export const revalidate = 300;

const collectFiles = (blocks, out = []) => {
  (blocks || []).forEach((b) => {
    if (b?.__typename === "CoreFile") out.push(b);
    if (b?.innerBlocks?.length) collectFiles(b.innerBlocks, out);
  });
  return out;
};

export default async function WpPage(props) {
  const { slug } = await props.params;
  const segments = Array.isArray(slug) ? slug : [slug].filter(Boolean);
  const path = `/${segments.join("/")}/`;

  const data = await wpFetch(PAGE_BY_PATH, { path });
  const page = data?.page;
  if (!page) return notFound();

  const files = collectFiles(page.editorBlocks);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {page.title}
      </Typography>

      {!!files.length && (
        <>
          <Typography variant="h6">Files</Typography>
          <List>
            {files.map((f) => {
              const a = f.attributes || {};
              const size = f.filesizeHuman || (f.filesize ? `${(f.filesize / 1024).toFixed(1)} KB` : "");
              const ext = f.extension ? `${f.extension}` : "";
              const type = f.filetype || "";
              return (
                <ListItem key={f.clientId} sx={{ display: "list-item" }}>
                  <MUILink href={a.href} target="_blank" rel="noopener">
                    {a.fileName || a.href}
                  </MUILink>{" "}
                  {size && `(${size})`} {ext && ` ${ext}`}
                </ListItem>
              );
            })}
          </List>
        </>
      )}

      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </Container>
  );
}
