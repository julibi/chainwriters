import { useCallback, useEffect, useMemo, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useWeb3React } from '@web3-react/core';
import {
  Project,
  ProjectVars,
} from '../providers/projects-provider/projects-provider.types';
import { useUser } from './user/useUser';

export const GET_PROJECT = gql`
  query oneProjectQuery($id: String!) {
    project(id: $id) {
      createdAt
      creator
      genre
      id
      subtitle
      textIpfsHash
      title
    }
  }
`;

const useShowText = (projectId: string) => {
  const { account } = useWeb3React();
  const { detailedNfts } = useUser();
  const allowedToRead = !!detailedNfts?.find(
    (nft) => nft.projectId === Number(projectId)
  );
  const [text, setText] = useState<string | null>(null);
  const {
    loading: isLoading,
    error,
    data,
  } = useQuery<{ project: Project }, ProjectVars>(GET_PROJECT, {
    variables: { id: projectId },
  });
  const project = useMemo(() => {
    return data?.project;
  }, [data]);
  const fetchTextData = useCallback(async () => {
    if (!project || !account || error || isLoading) {
      return null;
    }

    try {
      const response = await fetch(
        `https://ipfs.io/ipfs/${project?.textIpfsHash}`
      );
      if (response.ok) {
        const fetchedText = await response.text();
        setText(fetchedText);
      }
    } catch (e: unknown) {
      console.log({ e });
    }
  }, [project, account, error, isLoading]);

  useEffect(() => {
    if (account && allowedToRead) {
      fetchTextData();
    }
  }, [account, allowedToRead, fetchTextData]);

  return useMemo(
    () => ({ allowedToRead, isLoading, project, text }),
    [allowedToRead, isLoading, project, text]
  );
};

export default useShowText;
