import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useWeb3React } from '@web3-react/core'
import gql from 'graphql-tag'
import styled from 'styled-components'
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
    toast.success("Hello I am toast!");
  }, []);

  return (
    <div>
      <h1>MOONLIT HOMEPAGE</h1>
    </div>
  );
}

export default Index;