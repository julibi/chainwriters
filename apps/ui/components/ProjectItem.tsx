import React from 'react'
import styled from 'styled-components'
import { BASE_BORDER_RADIUS, BASE_BOX_SHADOW, PINK } from '../themes';

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-block: 1rem;
  padding: 1rem;

  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW}
`;

const Title = styled.div`
  flex: 3;
  margin-inline-end: 1rem;
`;
const Author = styled.div`
  flex: 3;
  margin-inline-end: 1rem;
`;
const MintPrice = styled.div`
  flex: 2;
  margin-inline-end: 1rem;
`;
const FundedAmount = styled.div`
  flex: 2;
  margin-inline-end: 1rem;
`;

const RootHeader = styled(Root)`
  color: ${PINK};
  font-family: 'Roboto Mono Bold';
  text-transform: uppercase;  
`;

const HeaderTitle = styled(Title)`

`;

interface ProjectItemTypes {
  title: string;
  author: string;
  mintPrice: string;
  fundedAmount: number | string;
}

const ProjectItem = ({title, author, mintPrice, fundedAmount}: ProjectItemTypes) => {
  return (
    <Root>
      <Title>{title}</Title>
      <Author>{author}</Author>
      <MintPrice>{mintPrice}</MintPrice>
      <FundedAmount>{fundedAmount}</FundedAmount>
    </Root>
  )
}

const ProjectHeader = ({title, author, mintPrice, fundedAmount}: ProjectItemTypes) => {
  console.log('ProjectHeader');
  return (
    <RootHeader>
      <Title>{title}</Title>
      <Author>{author}</Author>
      <MintPrice>{mintPrice}</MintPrice>
      <FundedAmount>{fundedAmount}</FundedAmount>
    </RootHeader>
  );
};

export { ProjectHeader, ProjectItem };