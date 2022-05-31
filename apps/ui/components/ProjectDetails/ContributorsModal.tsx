import React, { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import BaseModal from '../BaseModal'
import ContributorsForm from '../Create/ContributorsForm'
import { useCreateSetContributors } from '../../state/projects/create/hooks'
import useDaoContract from '../../state/useDaoContract'
import ToastLink from '../ToastLink'

const ContentWrapper = styled.div`
  margin: 2rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  height: 600px;
`;

export interface Contribution {
  address: string;
  share: number;
  role: string;
}

interface ContributorsModalProps {
  projectAddress: string;
  onClose: () => void;
  onFailure: () => void;
  onPending: () => void;
  onSuccess: (contributorList: Contribution[]) => void;
}

const ContributorsModal = ({ projectAddress, onClose, onFailure, onPending, onSuccess }: ContributorsModalProps) => {
  const getDaoContract = useDaoContract();
  const createSetContributors = useCreateSetContributors();
  const daoContract = useMemo(
    () => (projectAddress ? getDaoContract(projectAddress) : null),
    [projectAddress, getDaoContract]
  );
  const [pending, setPending] = useState<boolean>(false);
  const contribInitialState = {
    1: { address: '', share: 0, role: '' },
    2: { address: '', share: 0, role: '' },
    3: { address: '', share: 0, role: '' },
  };
  const [contributors, setContributors] = useState(contribInitialState);
  const contributorList = useMemo(() => {
    const contribsArray = [];
    Object.entries(contributors).map(contrib => {
      if (contrib[1].address.length > 0 && contrib[1].share > 0) {
        contribsArray.push(contrib[1]);
      }
    })
    return contribsArray;
  }, [contributors]);

  const handleAddContributors = useCallback(async () => {
    await createSetContributors(
      daoContract,
      contributorList,
      (loading) => setPending(loading),
      (x, y, z) => {
        toast.info(
          <ToastLink hash={x.toString()} chainId={Number(y)} message={z} />
        );
        onPending();
      },
      (x, y, z) => {
        toast.success(
          <ToastLink hash={x.toString()} chainId={Number(y)} message={z} />
        );
        onSuccess(contributorList);
        onClose();
      },
      (x, y, z) => {
        toast.error(
          <ToastLink hash={x.toString()} chainId={Number(y)} message={z} />
        );
        onFailure();
        onClose();
      }
    );
  }, [
    contributorList,
    createSetContributors,
    daoContract,
    onClose,
    onFailure,
    onPending,
    onSuccess,
  ]);

  return (
    <BaseModal onClose={onClose}>
      <ContentWrapper>
      <ContributorsForm
        contributors={contributors}
        contributorList={contributorList}
        loading={pending}
        onChange={(idx,key, val) => setContributors({
          ...contributors,
          [idx]: { ...contributors[idx], [key]: val },
        })}
        onSubmit={handleAddContributors}
      />
      </ContentWrapper>
    </BaseModal>
  );
}

export default ContributorsModal