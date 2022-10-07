import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_ENVIRONMENT === 'DEV'
      ? 'https://api.thegraph.com/subgraphs/name/julibi/moonpage-graphs-dev'
      : 'https://api.thegraph.com/subgraphs/name/julibi/moonpage-graphs-prod',
  cache: new InMemoryCache(),
});

export default client;
