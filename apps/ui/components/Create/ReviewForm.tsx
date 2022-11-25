import { capitalizeFirstLetter } from '../../utils/capitalizestring';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Node } from 'slate';
import {
  FadeIn,
  ReviewItemWrapper,
  ReviewItem,
  BlockSpan,
} from '../../pages/create';
import Checkbox from '../Checkbox';
import ActionButton from '../ActionButton';
import { serialize } from '../../utils/serializeMarkdown';
import Waiting from './Waiting';
import { useFactory } from '../../hooks/factory';

interface ReviewFormProps {
  agreedToTerm1: boolean;
  agreedToTerm2: boolean;
  createDao: () => void;
  onCheckTerm1: () => void;
  onCheckTerm2: () => void;
  firstEdMaxAmount: number;
  firstEdMintPrice: string;
  language: string;
  text: Node[];
  title: string;
  isPinPending: boolean;
}

const CheckboxWrapper = styled.div`
  margin: 0 0 2.5rem -1rem;
`;

const ReviewForm = ({
  agreedToTerm1,
  agreedToTerm2,
  createDao,
  language,
  title,
  text,
  firstEdMaxAmount,
  firstEdMintPrice,
  isPinPending,
  onCheckTerm1,
  onCheckTerm2,
}: ReviewFormProps) => {
  const { createProjectStatus } = useFactory();
  const creatingDao = useMemo(() => {
    return (
      createProjectStatus === 'confirming' || createProjectStatus === 'waiting'
    );
  }, [createProjectStatus]);

  if (creatingDao) {
    return <Waiting />;
  }
  return (
    <FadeIn>
      <>
        <ReviewItemWrapper>
          <BlockSpan>Title</BlockSpan>
          <ReviewItem>{title}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Text</BlockSpan>
          <ReviewItem>{`${serialize(text).substring(0, 100)}...`}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Language</BlockSpan>
          <ReviewItem>{capitalizeFirstLetter(language)}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Max Amount Genesis Edition</BlockSpan>
          <ReviewItem>{firstEdMaxAmount}</ReviewItem>
        </ReviewItemWrapper>
        <ReviewItemWrapper>
          <BlockSpan>Dutch Auction Starting Price (MATIC)</BlockSpan>
          <ReviewItem>{firstEdMintPrice}</ReviewItem>
        </ReviewItemWrapper>
        <CheckboxWrapper>
          <Checkbox onChange={onCheckTerm1} check={agreedToTerm1}>
            By checking this box, I confirm that this work to be published
            (including the cover image) does not contain any hateful content,
            potential copyright issue, plagiarism, illegal or illegitimate
            content (hereafter defined as "harmful content"). Moonpage can
            freeze the project if it detects any harmful content, which will
            disable the distribution of any funds and will also disable further
            minting of the infringing project. In the event of doubt, Moonpage
            may at its discretion denylist any involved wallet address. Being
            denylisted prevents this wallet address from any further action on
            this platform. Neither Moonpage, nor the NFT owners of a project
            hold any copyright. The copyright remains with the author.
          </Checkbox>
        </CheckboxWrapper>
        <CheckboxWrapper>
          <Checkbox onChange={onCheckTerm2} check={agreedToTerm2}>
            I am aware that I am making my text publicly available on IPFS, a
            peer-to-peer network for storing and sharing data, but that the text
            will be gated by an NFT on the Moonpage platform.
          </Checkbox>
        </CheckboxWrapper>
        <ActionButton
          disabled={!agreedToTerm1 || !agreedToTerm2 || isPinPending}
          onClick={createDao}
          loading={isPinPending}
          text="Create Project"
          web3Connectable
        />
      </>
    </FadeIn>
  );
};

export default ReviewForm;
