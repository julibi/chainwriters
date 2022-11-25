import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { FadeIn, Wrapper, InputDescription } from '../../pages/create';
import ActionButton from '../ActionButton';
import Title from '../Title';
import {
  BASE_BORDER_RADIUS,
  POP,
  ElementThemeProps,
  FONT_SERIF_REGULAR,
} from '../../themes';
import { useTheme } from '../../hooks/theme';
import { useCollection } from '../../hooks/collection';
import StartAuctionsModal from '../ProjectDetails/StartAuctionsModal';

interface FinishedProps {
  projectId: string;
  onStartAuctions: (authorMintInput: number) => Promise<void>;
}

const OptionsWrapper = styled.div`
  display: flex;
  margin-block-end: 2rem;
  font-family: ${FONT_SERIF_REGULAR};

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Option = styled.div<ElementThemeProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.INSET_BASE_BOX_SHADOW};
  border-radius: ${BASE_BORDER_RADIUS};
`;

const OptionRight = styled(Option)`
  margin: 0 0 0 2rem;

  @media (max-width: 900px) {
    margin: 2rem 0 0 0;
  }
`;

const Text = styled.p`
  display: inline-block;
  margin-block-end: 1rem;
`;

const TextPink = styled(Text)`
  color: ${POP};
`;

const Finished = ({ projectId, onStartAuctions }: FinishedProps) => {
  const theme = useTheme();
  const { startAuctionsStatus } = useCollection();
  const router = useRouter();
  const [showStartAuctionsModal, setShowStartAuctionsModal] = useState(false);
  const pending = useMemo(
    () =>
      startAuctionsStatus === 'confirming' || startAuctionsStatus === 'waiting',
    [startAuctionsStatus]
  );

  useEffect(() => {
    if (startAuctionsStatus === 'success') {
      setShowStartAuctionsModal(false);
    }
  }, [projectId, router, startAuctionsStatus]);

  return (
    <FadeIn>
      <Wrapper>
        <Title size="m">Done</Title>
        <InputDescription>
          {`You have completed configuring your Project.`}
        </InputDescription>
        <OptionsWrapper>
          <Option theme={theme}>
            <Text>{`Wait with starting the auctions. Check the project first, and do some more marketing.`}</Text>
            <ActionButton
              onClick={() => router.push(`projects/${projectId}`)}
              disabled={false}
              loading={false}
              color="#fff"
              margin="1rem 0 0 0"
              text="See Project"
            />
          </Option>
          <OptionRight theme={theme}>
            <TextPink>{`Start the auctions now!`}</TextPink>
            <ActionButton
              onClick={() => {
                setShowStartAuctionsModal(true);
              }}
              disabled={pending}
              loading={pending}
              margin="1rem 0 0 0"
              text="Start Auctions"
              web3Connectable
            />
          </OptionRight>
        </OptionsWrapper>
        {showStartAuctionsModal && (
          <StartAuctionsModal
            onClose={() => setShowStartAuctionsModal(false)}
            onStartAuctions={onStartAuctions}
            pending={pending}
          />
        )}
      </Wrapper>
    </FadeIn>
  );
};

export default Finished;
