import { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { GET_ONE_PROJECT } from '../state/projects/hooks';

import useProjectBalanceOfUser from './useProjectBalanceOfUser';
import client from '../apolloclient';

export interface ReadData {
  creator: string;
  title: string;
  subtitle?: string;
  genre?: string;
  textIpfsHash: string;
  createdAt: string;
}

const useShowText = (projectId: string) => {
  const { account } = useWeb3React();
  const { tokensOfProject } = useProjectBalanceOfUser(projectId);
  const allowedToRead = tokensOfProject.length > 0;
  const [readingData, setReadingData] = useState<ReadData | null>(null);
  const [text, setText] = useState<string | null>(null);

  const fetchTextData = useCallback(async () => {
    if (!projectId || !account) {
      return null;
    }

    if (allowedToRead) {
      const {
        data: { project },
      } = await client.query({
        query: GET_ONE_PROJECT,
        variables: { id: projectId },
      });
      if (project) {
        try {
          // const response = await fetch(
          //   `https://ipfs.io/ipfs/${project.textIpfsHash}`
          // );
          // if (response.ok) {
          //   const fetchedText = await response.text();
          //   setText(fetchedText);
          // }
          setReadingData({
            creator: project.creator,
            title: project.title,
            subtitle: project.subtitle,
            genre: project.genre,
            textIpfsHash: project.textIpfshash,
            createdAt: project.createdAt,
          });
        } catch (e: unknown) {
          console.log({ e });
        }
      }
    }
  }, [projectId, account, allowedToRead]);

  useEffect(() => {
    if (account) {
      fetchTextData();
    }
  }, [account, fetchTextData]);

  return { allowedToRead, readingData, text };
};

export default useShowText;
