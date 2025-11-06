import { MENU_PAGE } from "./queries";

export async function wpFetch(query, variables = {}) {
  const r = await fetch(process.env.WP_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300 },
  });
  const j = await r.json();
  if (j.errors) throw new Error(j.errors[0]?.message || "WPGraphQL error");
  return j.data;
}

export async function wpFetchAllMenuItems() {
  let after = null,
    all = [];
  for (;;) {
    const data = await wpFetch(MENU_PAGE, { after });
    const conn = data?.menu?.menuItems;
    if (!conn) break;
    all.push(...conn.nodes);
    if (!conn.pageInfo?.hasNextPage) break;
    after = conn.pageInfo.endCursor;
  }
  return all;
}
