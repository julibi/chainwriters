import { useWeb3React } from '@web3-react/core';
import client from '../../../apolloclient';
import { BigNumber } from 'ethers';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import useProjectContract from '../../../hooks/useProjectContract';
import { GET_ONE_DAO } from '../../../state/projects/hooks';

interface ReadData {
  author: string;
  title: string;
  subtitle?: string;
  genre?: string;
  textIpfsHash: string;
  createdAt: string;
}

const Read = () => {
  const { account, chainId, library } = useWeb3React();
  const router = useRouter();
  let projectAddress = router.query.projectAddress;
  projectAddress = Array.isArray(projectAddress) ? projectAddress[0] : projectAddress;
  const ProjectContract = useProjectContract(projectAddress as string);
  const [allowed, setAllowed] = useState<boolean>(false);
  const [readingData, setReadingData] = useState<ReadData | null>(null);
  const [text, setText] = useState<string | null>(null);

  const fetchAllowed = useCallback(async() => {
    if (account && ProjectContract) {
      const balancesOfUser = [];
      try {
        const currentEditionBigInt = await ProjectContract.currentEdition();
        const currentEdition = parseInt(currentEditionBigInt._hex, 16);
        for (let i = 1; i < currentEdition + 1; i++) {
          const balanceOfBig = await ProjectContract.balanceOf(account, i);
          const balance = parseInt(balanceOfBig._hex, 16);
          balancesOfUser.push({ id: i, balance });
        }
        const hasAtLeastOne = !!balancesOfUser.find(x => x.balance > 0);
        setAllowed(hasAtLeastOne);
      } catch(e: unknown) {
        console.log({ e });
      }
    }
  }, [account, ProjectContract]);

  const fetchMetadata = useCallback(async() => {
    if (ProjectContract) {
      const {
        data: { dao },
      } = await client.query({
        query: GET_ONE_DAO,
        // @ts-ignore
        variables: { address: projectAddress.toLowerCase() },
      });
      if (dao) {
        setReadingData({
          author: dao.author,
          title: dao.title,
          subtitle: dao.subtitle,
          genre: dao.genre,
          textIpfsHash: dao.textIpfshash,
          createdAt: dao.createdAt
        });
      }
    }
  }, [ProjectContract, projectAddress]);

  const fetchText = useCallback(async() => {
    if (readingData) {
      try {
        const response = await fetch(`https://ipfs.io/ipfs/${readingData.textIpfsHash}`);
        if(response.ok) {
          const fetchedText = await response.text();
          console.log({ fetchedText });
          setText(fetchedText);
        }
      } catch(e: unknown) {
        console.log({ e });
      }
    }
  }, [readingData]);

  useEffect(() => {
    fetchAllowed();
  }, [account, ProjectContract, fetchAllowed]);

  useEffect(() => {
    if (allowed) {
      fetchMetadata();
    }
  }, [allowed, fetchMetadata]);

  useEffect(() => {
    if (readingData) {
      fetchText();
    }
  }, [readingData, fetchText]);
  console.log({allowed, readingData})
  return (
    <div>read</div>
  )
}

export default Read