import { gql, useQuery } from '@apollo/client'
import { Multicall } from 'ethereum-multicall'
import client from '../../apolloclient'
import { JsonRpcProvider } from '@ethersproject/providers'
import { RPC_URLS } from '../../connectors'
import PROJECT_ABI from '../../abis/project.json'

const provider = new JsonRpcProvider(
  RPC_URLS[80001],
  80001
);
const multicall = new Multicall({
  ethersProvider: provider,
  tryAggregate: false
});

// TODO: filter out if fundingEnded and places to invest are still free

export const GET_TOP_DAOS = gql`
  query topDaosQuery {
    daos(first: 5) {
      id
      author
      address
      createdAt
      title
      # fundedAmount
      # firstEditionMax
      # mintPrice
    }
  }
`;

export const GET_ALL_DAOS = gql`
  query allDaosQuery {
    daos(orderBy: fundedAmount) {
      id
      author
      address
      createdAt
      title
      fundedAmount
      firstEditionMax
      mintPrice
    }
  }
`;

export const GET_ONE_DAO = gql`
  query oneDaoQuery($address: String!) {
    dao(id: $address) {
      title
      author
      address
      genre
      subtitle
      createdAt
      fundedAmount
      firstEditionMax
      mintPrice
    }
  }
`;

export const GET_SEARCHED_DAO = gql`
  query searchDaoQuery($searchTerm: String!) {
    daos(where: { title: $searchTerm }) {
      id
      author
      address
      createdAt
      title
      fundedAmount
      firstEditionMax
      mintPrice
    }
  }
`;

export const useFetchAllProject = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_DAOS);
  return { loading, error, data, refetch };
};

export const useFetchTopProjects = () => {
  const { loading, error, data, refetch } = useQuery(GET_TOP_DAOS);
  return { loading, error, data, refetch };
};

export const useGetProjectDetails = () => {  
  return async(address: string) => {
    if (!address) {
      return null;
    }
    const contributorsMulticallContext = {
      reference: "PROJECT_CONTRIBS",
      contractAddress: address,
      abi: PROJECT_ABI,
      calls: [
        {
          reference: "contributor1",
          methodName: "contributors",
          methodParameters: [0]
        },
        {
          reference: "contributor2",
          methodName: "contributors",
          methodParameters: [1]
        }
      ]
    };

    const auctionsMulticallContext = {
      reference: 'PROJECT_AUCTIONS',
      contractAddress: address,
      abi: PROJECT_ABI,
      calls: [
        {
          reference: 'auctionStarted',
          methodName: 'auctionStarted',
          methodParameters: [],
        },
        {
          reference: 'auctionPhaseFinished',
          methodName: 'auctionPhaseFinished',
          methodParameters: [],
        },
        {
          reference: 'expiresAt',
          methodName: 'expiresAt',
          methodParameters: [],
        },
        {
          reference: 'genEdTotalSupply',
          methodName: 'totalSupply',
          methodParameters: [1],
        },
        {
          reference: 'currentEditionMax',
          methodName: 'currentEditionMax',
          methodParameters: [],
        },
        {
          reference: 'initialMintPrice',
          methodName: 'INITIAL_MINT_PRICE',
          methodParameters: [],
        },
      ],
    };
    const contribs = await multicall.call(contributorsMulticallContext);
    const auctions = await multicall.call(auctionsMulticallContext);
    const addressLow = address.toLowerCase();
    // not using useQuery here, because we have to wait for the the var `address`,
    // and int main body or custom hook it cannot be present from the start
    // const {
    //   data: { dao }
    // } = await client.query({
    //   query: GET_ONE_DAO,
    //   variables: { address: addressLow }
    // });
    // TODO - also fetch all contributors of that project
    return { contribs, auctions };
  };
};
