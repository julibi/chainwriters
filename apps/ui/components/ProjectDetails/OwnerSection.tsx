import { useGetOwners } from '../../hooks/useGetOwners';
import React from 'react';
import styled from 'styled-components';
import ProfileLink from '../ProfileLink';

const Root = styled.div`
  height: 100%;
  padding: 1rem !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Owners = styled.div`
  display: flex;
`;

const Dots = styled.div`
  margin-inline-start: 0.5rem;
`;

type OwnerSectionProps = {
  projectId: string;
};
const OwnerSection = ({ projectId }: OwnerSectionProps) => {
  const owners = useGetOwners(projectId);
  const ownersToShow = owners?.length > 10 ? owners?.slice(0, 9) : owners;
  return (
    <Root>
      <div>Collectors</div>
      <Owners>
        {ownersToShow?.map((owner) => (
          <ProfileLink key={owner} account={owner} isImageOnly />
        ))}
        {owners?.length > ownersToShow?.length && <Dots>{'...'}</Dots>}
      </Owners>
    </Root>
  );
};

export default OwnerSection;
