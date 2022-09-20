import { formatNumber } from '../../utils/formatNumber';
import React, { useState } from 'react';
import ActionButton from '../ActionButton';
import BaseModal from '../BaseModal';
import Checkbox from '../Checkbox';
import Title from '../Title';
import { BigNumber } from 'ethers';
import { PINK } from '../../themes';
import { WriteActionStatus } from '../../providers/manager-provider/manager-provider.types';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter';
`;

type MintLegalModalProps = {
  price: BigNumber;
  handleClick: () => void;
  onClose: () => void;
  mintStatus: WriteActionStatus;
};

const MintLegalModal = ({
  handleClick,
  onClose,
  mintStatus,
  price,
}: MintLegalModalProps) => {
  const [agreed, setAgreed] = useState<boolean>(false);
  const toggleChecked = () => {
    setAgreed(!agreed);
  };
  return (
    <BaseModal
      onClose={() => {
        onClose();
        setAgreed(false);
      }}
    >
      <Wrapper>
        <Title color={PINK} size="m" padding="0 0 0 1rem">
          {`Total: ${formatNumber(price)} Matic`}
        </Title>
        <Checkbox
          onChange={toggleChecked}
          check={agreed}
          readonly={false}
          label={`
          By checking this box, I confirm that Moonpage is not liable for the content of the NFTs on this platform.
          I am aware that I am solely responsible for this purchase and that the content being represented by the NFT
          can be changed by the creating wallet address or that the project can be paused or frozen by Moonpage.
          I assure that I have done my own research and thus want to mint this NFT.
          Neither Moonpage, nor me as prospective NFT owner hold any copyright. The copyright remains with the author.
          I am in particular aware that the creator may further publish the content of this project.
        `}
        />
        <ActionButton
          disabled={
            mintStatus === 'confirming' || mintStatus === 'waiting' || !agreed
          }
          loading={mintStatus === 'confirming' || mintStatus === 'waiting'}
          onClick={handleClick}
          text="MINT"
        />
      </Wrapper>
    </BaseModal>
  );
};

export default MintLegalModal;
