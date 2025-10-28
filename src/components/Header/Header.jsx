import Link from "next/link";
import { wpFetch } from "@/lib/wp";
import { ALL_PAGES } from "@/lib/queries";

export default async function Header() {
  const data = await wpFetch(ALL_PAGES);
  const pages = data.pages.nodes;

  console.log(pages);

  return (
    <header>
      <Link href="/">Početna</Link>
      <Link href="/novosti">Novosti</Link>
      {pages.map((p) => (
        <Link key={p.slug} href={p.uri}>
          {p.title}
        </Link>
      ))}
    </header>
  );
}
