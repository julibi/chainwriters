import React from 'react';
import styled from 'styled-components';
import Title from '../components/Title';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-block-start: 3rem;
  padding: 3rem;

  @media (max-width: 900px) {
    padding: 0;
  }
`;

const Text = styled.p`
  max-width: 1000px;
  display: inline-block;
  font-size: 18px;
  line-height: 24px;

  :after {
    content: '';
    width: 100%;
    height: 1em;
    display: inline-block;
  }
`;

const TermsConditions = () => {
  return (
    <Root>
      <Title>Terms of Service</Title>
      <Title size="m">When minting</Title>
      <Text>
        Moonpage is not liable for the content of the NFTs on this platform. I
        am aware that I am solely responsible for this purchase and that the
        content being represented by the NFT can be changed by the creating
        wallet address or that the project can be paused or frozen by Moonpage.
        I assure that I have done my own research and thus want to mint this
        NFT. Neither Moonpage, nor me as prospective NFT owner hold any
        copyright. The copyright remains with the author. I am in particular
        aware that the creator may further publish the content of this project.
      </Text>
      <Title size="m">When creating</Title>
      <Text>Text coming soon</Text>
      {/* <Text>
        By checking this box, I confirm that this work to be published
        (including the cover image) does not contain any hateful content,
        potential copyright issue, plagiarism, illegal or illegitimate content
        (hereafter defined as "harmful content"). Moonpage can freeze the
        project if it detects any harmful content, which will disable the
        distribution of any funds and will also disable further minting of the
        infringing project. In the event of doubt, Moonpage may at its
        discretion denylist any involved wallet address. Being denylisted
        prevents this wallet address from any further action on this platform.
        Neither Moonpage, nor the NFT owners of a project hold any copyright.
        The copyright remains with the author.
      </Text> */}
    </Root>
  );
};

// By connecting your wallet and using the Polychain Monsters
// website, you agree to our

export default TermsConditions;
