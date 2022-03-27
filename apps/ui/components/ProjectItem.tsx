import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, PINK, PLAIN_WHITE } from '../themes';
import { truncateAddress } from './WalletIndicator';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 260px;
  height: 400px;
  margin: 1rem;
  padding: 1rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW}

  :hover {
    cursor: pointer;
  }  
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const InfoWrapper = styled.div`
  flex: 1;
  font-family: 'Roboto Mono Bold', Serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h4`
  color: ${PINK};
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  color: ${PLAIN_WHITE};
  font-family: 'Nunito Sans', Sans-serif;
`;

interface ProjectItemTypes {
  title: string;
  author: string;
  address?: string;
  mintPrice: string;
  fundedAmount: number | string;
}

const ProjectItem = ({title, author, address, mintPrice, fundedAmount}: ProjectItemTypes) => {
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault()
    router.push(`projects/${address}`)
  }

  return (
    <Root onClick={handleClick}>
      <ImageWrapper>
        <Image src={'/Livi.png'} height={'100%'} width={'100%'} alt={'Project Image'}/>
      </ImageWrapper>
      <InfoWrapper>
        <Title>{title}</Title>
        <Flex>
          <Label>Author</Label>
          <div>{truncateAddress(author)}</div>
        </Flex>
        <Flex>
          <Label>Funded Amount</Label>
          <div>{mintPrice}</div>
        </Flex>
        <Flex>
          <Label>Mint Price</Label>
          <div>{fundedAmount}</div>
        </Flex>
      </InfoWrapper>
    </Root>
  )
}

export { ProjectItem };