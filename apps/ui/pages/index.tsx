import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import gql from 'graphql-tag';
// import { useQuery } from '@apollo/client';
import { useEagerConnect } from '../hooks/useEagerConnect';
import WalletConnection from '../components/WalletConnection';
import client from '../apolloclient';
import styled from 'styled-components';

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
  const {account} = useWeb3React();
  const hasTried = useEagerConnect();
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
      <span>MAIN PAGE</span>
      {!account && <WalletConnection onSuccessfulConnection={() => alert("YAS, connected")}/>}
      {account && <span>{account}</span>}
    </div>
  );
}

export default Index;
