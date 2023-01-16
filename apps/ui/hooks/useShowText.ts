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
      contributors {
        address
      }
      createdAt
      creator
      genre
      id
      isDeleted
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
  const [text, setText] = useState<Node[]>();
  const [translation, setTranslation] = useState<Node[]>();
  const [pending, setPending] = useState<boolean>(false);
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

  const isContributor = useMemo(() => {
    const contributors =
      data?.project?.contributors?.map((ctrib) =>
        ctrib.address.toLowerCase()
      ) || [];
    return contributors.includes(account?.toLowerCase());
  }, [account, data]);

  const isAuthor = useMemo(() => {
    if (account?.toLowerCase() === project?.creator?.toLowerCase()) {
      return true;
    }
    return false;
  }, [account, project?.creator]);

  const allowedToRead = useMemo(
    () =>
      isAuthor ||
      isContributor ||
      !!detailedNfts?.find((nft) => nft.projectId === Number(projectId)),
    [detailedNfts, isAuthor, isContributor, projectId]
  );

  const fetchTextData = useCallback(async () => {
    setPending(true);
    if (!project || !account || error) {
      return null;
    }
    let fetchedText;
    try {
      const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/${projectId}`;
      const metadataResponse = await fetch(metadataUrl);
      const metadata = await metadataResponse.json();
      fetchedText = metadata.text;
      setText(fetchedText);
      setPending(false);
    } catch (e) {
      setPending(false);
      // do nothing
    }

    // if text cannot be fetched from BE, fetch from IPFS directly
    if (!fetchedText) {
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
        setPending(false);
      }
    }
  }, [project, account, error, projectId]);

  const fetchTranslation = useCallback(async () => {
    setPending(true);
    if (!project?.translationIpfsHash || !account || error) {
      return null;
    }

    let fetchedTranslation;
    try {
      const metadataUrl = `${process.env.NX_PUBLIC_MOONPAGE_METADATA_API}/projects/${projectId}`;
      const metadataResponse = await fetch(metadataUrl);
      const metadata = await metadataResponse.json();
      fetchedTranslation = metadata.translation;
      setTranslation(fetchedTranslation);
      setPending(false);
    } catch (e) {
      setPending(false);
      // do nothing
    }
    if (!fetchedTranslation) {
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
        setPending(false);
      }
    }
  }, [account, error, project?.translationIpfsHash, projectId]);

  const hasTranslation = useMemo(
    () => project?.translationIpfsHash?.length > 0,
    [project]
  );

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
      isAuthor,
      isContributor,
      isDeleted: project?.isDeleted,
      pending: pending || isLoading,
      project,
      text,
      translation,
      hasTranslation,
      fetchTranslation,
      textIpfsHash: project?.textIpfsHash,
    }),
    [
      allowedToRead,
      isAuthor,
      isContributor,
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
