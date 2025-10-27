import { wpFetch } from "@/lib/wp";
import { POST_BY_SLUG } from "@/lib/queries";
import { notFound } from "next/navigation";

export const revalidate = 300;

export default async function Post(props) {
  const { slug } = await props.params; // <-- await the Promise
  const data = await wpFetch(POST_BY_SLUG, { slug });
  const p = data.post;
  if (!p) return notFound();
  return (
    <main>
      <h1>{p.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: p.content }} />
    </main>
  );
}
