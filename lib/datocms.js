import { GraphQLClient } from "graphql-request";
import { ApolloClient, InMemoryCache } from "@apollo/client";


export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
    }
  });
  return client.request(query, variables);
}



export async function getAll() {
  const HOMEPAGE_QUERY = `query HomePage($limit: String) {
    allStandardPages(filter: {slug: {eq: $limit}}) {
      standardPageTitle
    }
  }`;
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 'home-page' }
  });
  return data
}