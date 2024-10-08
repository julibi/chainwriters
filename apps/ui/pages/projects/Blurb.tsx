import { BASE_BORDER_RADIUS, ElementThemeProps } from '../../themes';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Node } from 'slate';
import { isJson } from '../../utils/isJson';
import Title from '../../components/Title';
import EditButton from '../../components/EditButton';
import { BLURB_FETCH_ERROR } from '../../constants';
import RichTextRead from '../../components/RichTextRead';
import Loading from '../../components/Loading';
import RichText from '../../components/Create/RichText';
import ActionButton from '../../components/ActionButton';
import { useManager } from '../../hooks/manager';
import useUploadTextToIpfs from '../../hooks/useUploadTextToIpfs';
import { useTheme } from '../../hooks/theme';
import { serializeToMarkdown } from '../../utils/serializeMarkdown';

const DescriptionSection = styled.section<ElementThemeProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  line-break: anywhere;
  max-width: 1200px;
  color: ${({ theme }) => theme.MAIN_TEXT_COLOR};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${({ theme }) => theme.BASE_BOX_SHADOW};

  animation: fadein 2s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Description = styled.p`
  display: inline-block;

  font-size: 14px;
  line-height: 170%;
`;

const RichTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`;

const Blurb = ({ blurbIpfsHash, projectId, isAllowedToEdit }) => {
  const theme = useTheme();
  const { uploadText } = useUploadTextToIpfs();
  const [originalBlurb, setOriginalBlurb] = useState<
    Node[] | string | undefined
  >();
  const [shouldResetToOriginal, setShouldResetToOriginal] =
    useState<boolean>(true);
  const [blurb, setBlurb] = useState<Node[] | string | undefined>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isBlurbFetching, setIsBlurbFetching] = useState<boolean>(false);
  const { updateBlurb, updateBlurbStatus } = useManager();

  const handleClickEditButton = useCallback(() => {
    if (isEditing && shouldResetToOriginal) {
      setBlurb(originalBlurb);
    }
    setIsEditing(!isEditing);
  }, [isEditing, originalBlurb, shouldResetToOriginal]);

  const fetchBlurb = useCallback(async () => {
    if (blurbIpfsHash) {
      setIsBlurbFetching(true);
      // todo: cleanup, blurb will always be array of nodes in future
      // try fetching from Metadata BE
      try {
        const metadataUrl = `${process.env.NEXT_PUBLIC_MOONPAGE_METADATA_API}/projects/${projectId}`;
        const metadataResponse = await fetch(metadataUrl);
        if (metadataResponse.ok) {
          const fetchedMetadata = await metadataResponse.json();
          const fetchedBlurb = fetchedMetadata.blurb.length
            ? fetchedMetadata.blurb
            : [
                {
                  type: 'paragraph',
                  children: [{ text: 'No blurb specified.' }],
                },
              ];

          setBlurb(fetchedBlurb);
          setOriginalBlurb(fetchedBlurb);
          setIsBlurbFetching(false);
        } else {
          // alternatively fetch directly from IPFS
          const responseIpfs = await fetch(
            `https://ipfs.io/ipfs/${blurbIpfsHash}`
          );
          if (responseIpfs.ok) {
            let fetchedBlurb = await responseIpfs.text();
            fetchedBlurb = isJson(fetchedBlurb)
              ? JSON.parse(fetchedBlurb)
              : fetchedBlurb;

            setBlurb(fetchedBlurb);
            setOriginalBlurb(fetchedBlurb);
            setIsBlurbFetching(false);
          } else {
            setBlurb(BLURB_FETCH_ERROR);
            setOriginalBlurb(BLURB_FETCH_ERROR);
            setIsBlurbFetching(false);
          }
        }
      } catch (e) {
        // do nothing
      }
    } else {
      const placeholder = serializeToMarkdown('No Blurb was specified.');
      setBlurb(placeholder);
      setOriginalBlurb(placeholder);
      setIsBlurbFetching(false);
    }
  }, [blurbIpfsHash, projectId]);

  useEffect(() => {
    fetchBlurb();
  }, [fetchBlurb]);

  const handleUpdateBlurb = useCallback(async () => {
    if (!blurb || !projectId) return null;
    const hash = await uploadText(blurb);
    await updateBlurb({
      projectId,
      blurb,
      blurbIpfsHash: hash,
      oldBlurbIpfsHash: blurbIpfsHash,
      onSuccess: () => {
        setShouldResetToOriginal(false);
        setIsEditing(false);
      },
      onError: undefined,
    });
  }, [blurb, blurbIpfsHash, projectId, updateBlurb, uploadText]);

  const correctBlurb = useCallback(() => {
    if (!blurb) {
      return null;
      // TODO format the first two - they are strings
    } else if (typeof blurb === 'string') {
      return <Description>{blurb}</Description>;
    } else {
      if (isEditing && isAllowedToEdit) {
        return (
          <RichTextWrapper>
            <RichText
              onKeyDown={(val: Node[]) => setBlurb(val)}
              text={blurb as Node[]}
              isDisabled={['confirming', 'waiting'].includes(updateBlurbStatus)}
            />
            <ActionButton
              onClick={handleUpdateBlurb}
              text="Update"
              loading={['confirming', 'waiting'].includes(updateBlurbStatus)}
              disabled={['confirming', 'waiting'].includes(updateBlurbStatus)}
              margin="1rem 0 0 0"
            />
          </RichTextWrapper>
        );
      } else {
        return <RichTextRead text={blurb as Node[]} />;
      }
    }
  }, [blurb, handleUpdateBlurb, isAllowedToEdit, isEditing, updateBlurbStatus]);

  return (
    <DescriptionSection theme={theme}>
      <Title>Blurb</Title>
      {isAllowedToEdit && (
        <EditButton
          disabled={isBlurbFetching || typeof blurb === 'string'}
          onClick={handleClickEditButton}
          isEditing={isEditing}
        />
      )}
      {isBlurbFetching ? (
        <Description>
          <Loading height={20} dotHeight={20} />
        </Description>
      ) : (
        correctBlurb()
      )}
    </DescriptionSection>
  );
};

export default Blurb;
