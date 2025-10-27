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
      }
    }
  }
`;

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
