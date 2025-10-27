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
  query PostBySlug($slug:ID!) {
    post(id:$slug, idType:SLUG) {
      title
      date
      content
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
      content
      editorBlocks(flat: false) {
        __typename
        name
        clientId

        ... on CoreFile {
          attributes { id href textLinkHref fileName }
          filesize
          filesizeHuman
          filetype
          extension
        }

        innerBlocks {
          __typename
          name
          clientId
          ... on CoreFile {
            attributes { id href textLinkHref fileName }
            filesize
            filesizeHuman
            filetype
            extension
          }
        }
      }
    }
  }
`;
