import { gql, useQuery } from '@apollo/client'
import { BigNumber } from '@ethersproject/bignumber'
import { Multicall } from 'ethereum-multicall'
import client from '../../apolloclient'
import { JsonRpcProvider } from '@ethersproject/providers'
import { RPC_URLS } from '../../connectors'
import PROJECT_ABI from '../../abis/project.json'
import useProjectContract from '../../hooks/useProjectContract'
import { useCallback } from 'react'

interface Contribution {
  id: string;
  address: string;
  share: number;
  role: string;
  dao: string;
}

export interface Edition {
  id: string;
  maxSupply: number;
  mintPrice: BigNumber;
  dao: string;
}

export interface ProjectData {
  // coming from subgraph
  id: string;
  address?: string;
  author: string;
  createdAt: number;
  title: string;
  subtitle: string | null;
  genre: string | null;
  textIpfsHash: string | null;
  imgIpfsHash: string | null; 
  blurbIpfsHash: string | null; 
  contributions: Contribution[] | null;
  editions: Edition[];
  metadataCID: string | null;
  // coming from Contract directly
  currentEditionMaxSupply: number;
  // coming from multicall
  auctionsStarted: boolean;
  auctionsEnded: boolean;
  currentEdition: number;
  currentEditionTotalSupply: number;
  currentEditionMintPrice: BigNumber;
  premintedByAuthor: number;
  totalSupplyGenEd: number;
  expiresAt: number;
  mintPrice: BigInt;
  paused: boolean;
  factory: string;
}

const provider = new JsonRpcProvider(
  RPC_URLS[80001],
  80001
);
const multicall = new Multicall({
  ethersProvider: provider,
  tryAggregate: false
});

export const GET_TOP_DAOS = gql`
  query topDaosQuery {
    daos(first: 5) {
      id
      author
      address
      createdAt
      title
      textIpfsHash
      imgIpfsHash
      blurbIpfsHash
      subtitle
      genre
      auctionsStarted
      auctionsEnded
    }
  }
`;

export const GET_ALL_DAOS_DESC = gql`
  query allDaosQuery {
    daos(orderBy: createdAt, orderDirection: desc) {
      id
      author
      address
      createdAt
      title
      imgIpfsHash
      subtitle
      genre
      auctionsStarted
      auctionsEnded
    }
  }
`;

export const GET_ALL_DAOS_ASC = gql`
  query allDaosQuery {
    daos(orderBy: createdAt, orderDirection: asc) {
      id
      author
      address
      createdAt
      title
      imgIpfsHash
      subtitle
      genre
      auctionsStarted
      auctionsEnded
    }
  }
`;

export const GET_ONLY_AUCTIONS = gql`
  query allDaosQuery {
    daos(orderBy: createdAt, orderDirection: desc, where: { auctionsStarted: true, auctionsEnded: false }) {
      id
      author
      address
      createdAt
      title
      imgIpfsHash
      subtitle
      genre
      auctionsStarted
      auctionsEnded
    }
  }
`;

export const GET_ONE_DAO = gql`
  query oneDaoQuery($address: String!) {
    dao(id: $address) {
      id
      author
      address
      createdAt
      title
      subtitle
      genre
      textIpfsHash
      imgIpfsHash
      blurbIpfsHash
      metadataCID
      # auctionsStarted
      # auctionsEnded
      contributions {
        id
        address
        share
        role
      }
      editions {
        id
        maxSupply
        mintPrice
      }
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
    }
  }
`;

export const useFetchAllProjectsDesc = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_DAOS_DESC);
  return () => ({ loading, error, data, refetch });
};

export const useFetchAllProjectsOldAsc = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_DAOS_ASC);
  return () => ({
    loading, error, data, refetch
  });
};

export const useFetchAllAuctions = () => {
  const { loading, error, data, refetch } = useQuery(GET_ONLY_AUCTIONS);
  return () => ({
    loading, error, data, refetch
  });
};

export const useFetchTopProjects = () => {
  const { loading, error, data, refetch } = useQuery(GET_TOP_DAOS);
  return { loading, error, data, refetch };
};

const convertToRegularNumber = (bigInt, BigIntFromMulticall) => {
  if(BigIntFromMulticall) {
    return parseInt(bigInt.hex, 16)
  }
  return parseInt(bigInt._hex, 16)
};

export const useGetProjectDetails = (projectAddress: string) => { 
  const ProjectContract = useProjectContract(projectAddress); 
  return async (address: string): Promise<ProjectData> => {
    if (!address) {
      return null;
    }

    // multicall
    const addressLow = address.toLowerCase();
    const multicallContext = {
      reference: 'PROJECT_DETAILS',
      contractAddress: addressLow,
      abi: PROJECT_ABI,
      calls: [
        {
          reference: 'project',
          methodName: 'project',
          methodParameters: [],
        },
        {
          reference: 'currentEdition',
          methodName: 'currentEdition',
          methodParameters: [],
        },
        {
          reference: 'expiresAt',
          methodName: 'expiresAt',
          methodParameters: [],
        },
        {
          reference: 'totalSupplyGenEd',
          methodName: 'totalSupply',
          methodParameters: [1],
        },
        {
          reference: 'mintPrice',
          // it should be getPrice
          methodName: 'INITIAL_MINT_PRICE',
          methodParameters: [],
        },
        {
          reference: 'currentEditionMintPrice',
          methodName: 'currentEditionMintPrice',
          methodParameters: [],
        },
        {
          reference: 'currentEditionMax',
          methodName: 'currentEditionMax',
          methodParameters: [],
        },
        {
          reference: 'auctionsStarted',
          methodName: 'auctionStarted',
          methodParameters: [],
        },
        {
          reference: 'auctionsEnded',
          methodName: 'auctionPhaseFinished',
          methodParameters: [],
        },
        {
          reference: 'paused',
          methodName: 'paused',
          methodParameters: [],
        },
        {
          reference: 'factory',
          methodName: 'factory',
          methodParameters: [],
        },
      ],
    };
    const result = (await multicall.call(multicallContext)).results
      .PROJECT_DETAILS.callsReturnContext;
    let premintedByAuthor = result.find((x) => x.reference == 'project')
      .returnValues[7];
    let currentEdition = result.find((x) => x.reference == 'currentEdition')
      .returnValues[0];
    let totalSupplyGenEd = result.find((x) => x.reference == 'totalSupplyGenEd')
      .returnValues[0];
    // these could be fetched from subgraph,
    //but struggling with updating/refetch issue - hence using this solution for now
    const auctionsStarted = result.find((x) => x.reference == 'auctionsStarted')
      .returnValues[0];
    const auctionsEnded = result.find((x) => x.reference == 'auctionsEnded')
      .returnValues[0];
    const expiresAt = parseInt(
      result
        .find((x) => x.reference == 'expiresAt')
        .returnValues[0].hex.toString(),
      16
    );
    let mintPrice = result.find((x) => x.reference == 'mintPrice')
      .returnValues[0];
    let currentEditionMintPrice = result.find(
      (x) => x.reference == 'currentEditionMintPrice'
    ).returnValues[0];
    currentEditionMintPrice = BigNumber.from(parseInt(currentEditionMintPrice.hex, 16).toString());
    currentEdition = convertToRegularNumber(currentEdition, true);
    const currentEditionMax = result.find((x) => x.reference === 'currentEditionMax').returnValues[0];
    const currentEditionMaxSupply = parseInt(currentEditionMax.hex, 16);
    premintedByAuthor = convertToRegularNumber(premintedByAuthor, true);
    totalSupplyGenEd = convertToRegularNumber(totalSupplyGenEd, true);
    mintPrice = BigNumber.from(parseInt(mintPrice.hex, 16).toString());
    const paused = result.find((x) => x.reference === 'paused').returnValues[0];
    const factory = result.find((x) => x.reference === 'factory')
      .returnValues[0];
    // not using useQuery here, because we have to wait for the the var `address`,
    // and int main body or custom hook it cannot be present from the start
    const {
      data: { dao },
    } = await client.query({
      query: GET_ONE_DAO,
      variables: { address: addressLow },
    });

    // subgraph call
    const {
      id,
      author,
      createdAt,
      title,
      subtitle,
      genre,
      textIpfsHash,
      imgIpfsHash,
      blurbIpfsHash,
      metadataCID,
      //auctionsStarted,
      // auctionsEnded,
      contributions,
      editions,
    } = dao;
    const contributionsFormatted = contributions.map((contrib) => {
      return {
        ...contrib,
        share: Number(contrib.share),
      };
    });
    const editionsFormatted = editions.map((edition) => {
      return {
        ...edition,
        mintPrice: BigNumber.from(edition.mintPrice),
        maxSupply: Number(edition.maxSupply),
      };
    });

    const currentEdTotalSupplyBig = await ProjectContract.totalSupply(
      currentEdition
    );
    const currentEditionTotalSupply = parseInt(
      currentEdTotalSupplyBig._hex,
      16
    );

    return {
      id,
      author,
      createdAt,
      title,
      subtitle,
      genre,
      textIpfsHash,
      imgIpfsHash,
      blurbIpfsHash,
      metadataCID,
      currentEdition,
      currentEditionTotalSupply,
      currentEditionMaxSupply,
      currentEditionMintPrice,
      auctionsStarted,
      auctionsEnded,
      contributions: contributionsFormatted,
      editions: editionsFormatted,
      premintedByAuthor,
      totalSupplyGenEd,
      expiresAt,
      mintPrice,
      paused,
      factory,
    };
  };;
};
