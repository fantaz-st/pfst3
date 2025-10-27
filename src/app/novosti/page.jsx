import Link from "next/link";
import { wpFetch } from "@/lib/wp";
import { LATEST_POSTS } from "@/lib/queries";

export const revalidate = 300;

export default async function News() {
  const data = await wpFetch(LATEST_POSTS, { first: 6 });
  const posts = data.posts.nodes;
  return (
    <main>
      <h1>Novosti</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            <h3>
              <Link href={`/novosti/${p.slug}`}>{p.title}</Link>
            </h3>
            <div dangerouslySetInnerHTML={{ __html: p.excerpt }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
