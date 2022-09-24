import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/julibi/moonpage-graphs',
  cache: new InMemoryCache(),
});

export default client;
