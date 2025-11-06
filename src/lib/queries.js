export const LATEST_POSTS = `
  query Latest($first:Int=6){
    posts(first:$first, where:{status:PUBLISH, orderby:{field:DATE, order:DESC}}) {
      nodes {
        slug
        title
        date
        excerpt
      }
    }
  }
`;

export const POST_BY_SLUG = `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      date
      modified
      featuredImage { node { sourceUrl altText } }
      blocks(attributes: true, dynamicContent: true)
    }
  }
`;

export const ALL_PAGES = `
  query AllPages {
    pages(first: 20, where:{parent:null, status:PUBLISH}) {
      nodes {
        slug
        title
        uri
        databaseId
      }
    }
  }
`;
export const ALL_PAGES_ALT = `
query NewQuery {
  pages(where: {status: PUBLISH}) {
    nodes {
      databaseId
      parentDatabaseId
      slug
      title
      uri
    }
  }
}`;
// old, and pfst2024 menu query
export const pagesMenuQuery = `query NewQuery {
    menu(id: "main", idType: NAME) {
      menuItems(first:200) {
        nodes {
          databaseId
          parentDatabaseId
          label
          uri
        }
      }
    }
  }`;

// new, paginated menu query
export const MENU_PAGE = `query MenuPage($after:String) {
  menu(id:"main", idType: NAME) {
    menuItems(first:100, after:$after) {
      nodes { databaseId parentDatabaseId label uri }
      pageInfo { hasNextPage endCursor }
    }
  }
}`;

export const PAGE_BY_PATH = `
  query PageByPath($path: ID!) {
    page(id: $path, idType: URI) {
      id
      title
      modified
      featuredImage {
        node {
          sourceUrl
          altText
          
        }
      }
      ancestors {
        nodes {
          ... on Page {
            id
            uri
            title
          }
        }
      }
      children {
        nodes {
          ... on Page {
            id
            uri
            title
          }
        }
      }
      # WPGraphQL Blocks payload (usually JSON string)
      blocks(attributes: true, dynamicContent: true)
    }
  }
`;
