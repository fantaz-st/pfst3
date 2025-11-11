import { NextResponse } from "next/server";
import { wpFetch } from "@/lib/wp";
import { ALL_NEWS } from "@/lib/queries";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const vars = {
    first: 12,
    after: searchParams.get("after"),
    search: searchParams.get("q") || null,
    category: searchParams.get("cat") || null,
    tag: searchParams.get("tag") || null,
    year: searchParams.get("y") ? parseInt(searchParams.get("y"), 10) : null,
    month: searchParams.get("m") ? parseInt(searchParams.get("m"), 10) : null,
    order: searchParams.get("sort") === "old" ? "ASC" : "DESC",
  };
  const data = await wpFetch(ALL_NEWS, vars);
  return NextResponse.json(data.posts);
}
