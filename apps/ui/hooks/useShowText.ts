import { useCallback, useEffect, useMemo, useState } from 'react';
import { Node } from 'slate';
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
      originalLanguage
      subtitle
      textIpfsHash
      translationIpfsHash
      title
    }
  }
`;

const useShowText = (projectId: string) => {
  const { account } = useWeb3React();
  const { detailedNfts } = useUser();
  const allowedToRead = useMemo(
    () => !!detailedNfts?.find((nft) => nft.projectId === Number(projectId)),
    [detailedNfts, projectId]
  );
  const [text, setText] = useState<Node[]>();
  const [translation, setTranslation] = useState<Node[]>();
  const [pending, setPending] = useState<boolean>(true);
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
    setPending(true);
    if (!project || !account || error) {
      return null;
    }

    try {
      const response = await fetch(
        `https://ipfs.io/ipfs/${project?.textIpfsHash}`
      );
      if (response.ok) {
        const fetchedText = await response.text();
        const formatted = JSON.parse(fetchedText);
        setText(formatted);
        setPending(false);
      }
    } catch (e: unknown) {
      console.log({ e });
      setPending(false);
    }
  }, [project, account, error]);

  const fetchTranslation = useCallback(async () => {
    setPending(true);
    if (!project?.translationIpfsHash || !account || error) {
      return null;
    }

    try {
      const response = await fetch(
        `https://ipfs.io/ipfs/${project?.translationIpfsHash}`
      );
      if (response.ok) {
        const fetchedTranslation = await response.text();
        const formatted = JSON.parse(fetchedTranslation);
        setTranslation(formatted);
        setPending(false);
      }
    } catch (e: unknown) {
      console.log({ e });
      setPending(false);
    }
  }, [account, error, project]);

  const hasTranslation = useMemo(() => {
    return project?.translationIpfsHash?.length > 0;
  }, [project]);

  useEffect(() => {
    if (account && allowedToRead) {
      fetchTextData();
    }
  }, [account, allowedToRead, fetchTextData]);

  useEffect(() => {
    if (account && hasTranslation) {
      fetchTranslation();
    }
  }, [account, allowedToRead, fetchTextData, fetchTranslation, hasTranslation]);

  return useMemo(
    () => ({
      allowedToRead,
      pending: pending || isLoading,
      project,
      text,
      translation,
      hasTranslation,
      fetchTranslation,
    }),
    [
      allowedToRead,
      fetchTranslation,
      hasTranslation,
      isLoading,
      pending,
      project,
      text,
      translation,
    ]
  );
};

export default useShowText;
