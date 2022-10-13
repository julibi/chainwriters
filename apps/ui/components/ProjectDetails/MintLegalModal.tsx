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
import NextLink from '../NextLink';

const Wrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Inter';
`;

type MintLegalModalProps = {
  amount: number;
  price: BigNumber;
  handleClick: () => void;
  onClose: () => void;
  mintStatus: WriteActionStatus;
};

const MintLegalModal = ({
  amount,
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
        <Title color={PINK} size="s" padding="0 0 0 1rem">
          {`Total: ${formatNumber(price)} Matic (Amount: ${amount})`}
        </Title>
        <Checkbox onChange={toggleChecked} check={agreed} readonly={false}>
          <span>
            I have read and understood the
            <NextLink href="/termsofservice" name="terms of service" />
            and want to mint this NFT.
          </span>
        </Checkbox>
        <ActionButton
          disabled={
            mintStatus === 'confirming' || mintStatus === 'waiting' || !agreed
          }
          loading={mintStatus === 'confirming' || mintStatus === 'waiting'}
          onClick={handleClick}
          text="MINT"
          web3Connectable
        />
      </Wrapper>
    </BaseModal>
  );
};

export default MintLegalModal;
