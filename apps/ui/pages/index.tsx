import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import gql from 'graphql-tag'
// import { useQuery } from '@apollo/client'
import client from '../apolloclient'

// TODO use useQuery instead!
export const queryDaos = gql`
  query exampleQuery {
    daos {
      id
      author
      address
      createdAt
      title
    }
  }
`;

export function Index() {
  const { account } = useWeb3React();
  // const hasTried = useEagerConnect();
  const fetchDaos = async () => {
    const {
      data: { daos }
    } = await client.query({
      query: queryDaos,
    });
  
    if (!daos.length) {
      return [];
    }
    console.log({ daos });
    return daos;
  };
  
  useEffect(() => {
    fetchDaos();
  }, []);

  return (
    <div>
      <h1>MOONLIT HOMEPAGE</h1>
    </div>
  );
}

export default Index;