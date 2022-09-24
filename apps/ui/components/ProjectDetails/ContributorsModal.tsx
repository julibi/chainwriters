import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import BaseModal from '../BaseModal';
import ContributorsForm from '../Create/ContributorsForm';
import { Contributor } from '../../providers/projects-provider/projects-provider.types';

const ContentWrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 600px;
`;

interface ContributorsModalProps {
  onClose: () => void;
  onSetContributors: (contributorsList: Contributor[]) => void;
  pending: boolean;
}

const ContributorsModal = ({
  onClose,
  onSetContributors,
  pending
}: ContributorsModalProps) => {  
  const contribInitialState = {
    1: { address: '', share: 0, role: '' },
    2: { address: '', share: 0, role: '' },
    3: { address: '', share: 0, role: '' },
  };
  const [contributors, setContributors] = useState(contribInitialState);

  const contributorsList = useMemo(() => {
    const contribsArray = Object.values(contributors).map((contrib) => (contrib)).filter(contrib => contrib.address.length && contrib.share)
    return contribsArray;
  }, [contributors]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
        <ContributorsForm
          contributors={contributors}
          contributorsList={contributorsList}
          loading={pending}
          onChange={(idx, key, val) =>
            setContributors({
              ...contributors,
              [idx]: { ...contributors[idx], [key]: val },
            })
          }
          onSubmit={(e) => {
            e.preventDefault();
            onSetContributors(contributorsList);
          }}
        />
      </ContentWrapper>
    </BaseModal>
  );
};

export default ContributorsModal;
