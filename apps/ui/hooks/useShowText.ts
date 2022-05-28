import { useCallback, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useProjectContract from './useProjectContract'
import { GET_ONE_DAO } from '../state/projects/hooks'
import client from '../apolloclient'

export interface ReadData {
  author: string;
  title: string;
  subtitle?: string;
  genre?: string;
  textIpfsHash: string;
  createdAt: string;
}

const useShowText = (projectAddress: string) => {
  const { account } = useWeb3React();
  const ProjectContract = useProjectContract(projectAddress);

  return useCallback(async (passedCurrentEdition?: number) => {
    if (!projectAddress || !account || !ProjectContract) {
      return null;
    }

    let allowed = false;
    let text = null;
    let readingData:ReadData;
    const balancesOfUser = [];
    let currentEdition: number;
    try {
      if (passedCurrentEdition) {
        currentEdition = passedCurrentEdition;
      } else {
        const currentEditionBigInt = await ProjectContract.currentEdition();
        currentEdition = parseInt(currentEditionBigInt._hex, 16);
      }
      for (let i = 1; i < currentEdition + 1; i++) {
        const balanceOfBig = await ProjectContract.balanceOf(account, i);
        const balance = parseInt(balanceOfBig._hex, 16);
        balancesOfUser.push({ id: i, balance });
      }
      const hasAtLeastOne = !!balancesOfUser.find((x) => x.balance > 0);
      allowed = hasAtLeastOne;
    } catch (e: unknown) {
      console.log({ e });
    }

    if (allowed) {
      const {
        data: { dao },
      } = await client.query({
        query: GET_ONE_DAO,
        // @ts-ignore
        variables: { address: projectAddress.toLowerCase() },
      });
      if (dao) {
        try {
          const response = await fetch(
            `https://ipfs.io/ipfs/${dao.textIpfsHash}`
          );
          if (response.ok) {
            const fetchedText = await response.text();
            text = fetchedText;
          }
          readingData = {
            author: dao.author,
            title: dao.title,
            subtitle: dao.subtitle,
            genre: dao.genre,
            textIpfsHash: dao.textIpfshash,
            createdAt: dao.createdAt,
          };
        } catch (e: unknown) {
          console.log({ e });
        }
      }
    }

    return { allowed, readingData, text }
  }, [projectAddress, account, ProjectContract]);
};

export default useShowText;