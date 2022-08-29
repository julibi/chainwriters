import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { useWeb3React } from '@web3-react/core';
import { create } from 'ipfs-http-client';
import {
  PLAIN_WHITE,
  BASE_BORDER_RADIUS,
  BASE_BOX_SHADOW,
  BG_NORMAL,
  DISABLED_WHITE,
  INSET_BASE_BOX_SHADOW,
  BaseButton,
  PINK,
  INTER_BOLD,
} from '../../themes';

import { SectionTitle } from '../HomePage/ProjectSection';
import Emoji from '../Emojis';
import Checkmark from '../Checkmark';
import Loading from '../Loading';
import MoreDetails from '../MoreDetails';
import { ProjectData } from '../../state/projects/hooks';
import ProgressBar from '../ProgressBar';
import ConfigureModal from './ConfigureModal';
import ToastLink from '../ToastLink';
import ContributorsModal, { Contributor } from './ContributorsModal';
import BaseModal from '../BaseModal';
import InputField from '../InputField';
import {
  ContentWrapper,
  ModalHeader,
  ModalText,
  CTAWrapper,
  MintButton,
} from '../../pages/projects/[projectId]';
import { BLURB_FETCH_ERROR } from '../../constants';
import useMoonpageCollection from '../../hooks/useMoonpageCollection';

const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  color: ${PLAIN_WHITE};
  margin-block-end: 2rem;
  padding: 2rem;
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${BASE_BOX_SHADOW};
`;

const Title = styled(SectionTitle)`
  text-align: center;
  margin-block-end: 2rem;
  display: flex;
  flex-direction: column;
`;

interface TriggerButtonTypes {
  disabled: boolean;
}

const TriggerButton = styled(BaseButton)<TriggerButtonTypes>`
  background-color: ${BG_NORMAL};
  color: ${({ disabled }) => (disabled ? DISABLED_WHITE : PINK)};
  font-family: ${INTER_BOLD};
  width: 230px;
  margin: 1rem 1rem 0 0;
  padding: 1rem;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  margin-block-end: 2rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
`;

const ProgressBarIndicator = styled.span`
  display: inline-block;
  margin-inline-end: 1rem;
  margin-block-start: 0.5rem;
`;

const ActionItems = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DoneAction = styled.div`
  background-color: ${BG_NORMAL};
  color: ${DISABLED_WHITE};
  border-radius: ${BASE_BORDER_RADIUS};
  box-shadow: ${INSET_BASE_BOX_SHADOW};
  font-family: ${INTER_BOLD};
  font-size: 13px;
  text-align: center;
  margin-block-start: 1rem;
  padding: 1rem;
  width: 230px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

interface AuthorSectionProps {
  blurb: string;
  projectData: ProjectData;
  onConfigure: (
    genre: string,
    subtitle: string,
    imgHash: string,
    blurbHash: string
  ) => void;
  onAddContributors: (contribs: Contributor[]) => void;
  projectId: string;
  refetch: VoidFunction;
}

const AuthorSection = ({
  blurb,
  projectData,
  onConfigure,
  onAddContributors,
  projectId,
  refetch,
}: AuthorSectionProps) => {
  const { account, chainId } = useWeb3React();
  // @ts-ignore
  const client = create('https://ipfs.infura.io:5001/api/v0');
  const Collection = useMoonpageCollection();
  const [showConfigureModal, setShowConfigureModal] = useState<boolean>(false);
  const [configurePending, setConfigurePending] = useState<boolean>(false);
  const [showContributorsModal, setShowContributorsModal] =
    useState<boolean>(false);
  const [contributorsPending, setContributorsPending] =
    useState<boolean>(false);
  const [showAuthorMintModal, setShowAuthorMintModal] =
    useState<boolean>(false);
  const [authorMintInput, setAuthorMintInput] = useState<string>('');
  const [authorMintPending, setAuthorMintPending] = useState<boolean>(false);
  const [triggerPending, setTriggerPending] = useState(false);
  const [showUnlockEditionModal, setShowUnlockEditionModal] = useState(false);
  const [nextEditionMaxAmount, setNextEditionMaxAmount] = useState<number>(0);
  const [nextEditionMintPrice, setMextEditionMintPrice] = useState<string>('0');
  const [unlockEditionPending, setUnlockEditionPending] =
    useState<boolean>(false);

  const configure = useCallback(
    async (
      imgHash: string,
      blurbHash: string,
      genre: string,
      subtitle: string
    ) => {
      try {
        setConfigurePending(true);
        const Tx = await Collection.configureProjectDetails(
          imgHash,
          blurbHash,
          genre,
          subtitle
        );
        const { hash } = Tx;
        toast.info(
          <ToastLink hash={hash} chainId={chainId} message={'Configuring...'} />
        );
        Collection.provider.once(hash, async (transaction) => {
          setConfigurePending(false);
          setShowConfigureModal(false);
          onConfigure(genre, subtitle, imgHash, blurbHash);
        });
      } catch (e: unknown) {
        // @ts-ignore
        toast.error(e.reason ?? 'Something went wrong.');
        setConfigurePending(false);
        setShowConfigureModal(false);
      }
    },
    [Collection, chainId, onConfigure]
  );

  const authorMint = useCallback(async () => {
    setAuthorMintPending(true);

    // TODO: enable more differentiated metadata with EDITION trait
    // and have this kind of URI ipfs://cidhash/{id} be setting dynamically on every next edition being enabled
    // BE needed...
    // const betterMetadataObjectExample = {
    //   name: projectData.title,
    //   description: blurb ?? '',
    //   attributes: [
    //     {
    //       trait_type: "edition",
    //       value: projectData.currentEdition
    //     }
    //   ],
    //   image: projectData?.imgIpfsHash ? `ipfs://${projectData.imgIpfsHash}` : '',
    // };

    const metadataObject = {
      name: projectData.title,
      description:
        blurb && blurb !== BLURB_FETCH_ERROR
          ? `${blurb} (Created with Moonpage)`
          : 'Created with Moonpage',
      image: projectData?.imgIpfsHash
        ? `ipfs://${projectData.imgIpfsHash}`
        : '',
    };
    const metadata = JSON.stringify(metadataObject, null, 2);

    try {
      const uploadedMeta = await client.add(metadata);
      const Tx = await Collection.authorMint(
        authorMintInput,
        `ipfs://${uploadedMeta.path}`
      );
      const { hash } = Tx;
      toast.info(
        <ToastLink
          hash={hash}
          chainId={chainId}
          message={'Author Mint pending...'}
        />
      );
      Collection.provider.once(hash, (transaction) => {
        refetch();
        setAuthorMintPending(false);
        toast.success('Minted!');
        setShowAuthorMintModal(false);
      });
    } catch (e: unknown) {
      // @ts-ignore
      toast.error(e.reason ?? 'Something went wrong.');
      setAuthorMintPending(false);
      setShowAuthorMintModal(false);
    }
  }, [
    projectData.title,
    projectData.imgIpfsHash,
    blurb,
    client,
    Collection,
    authorMintInput,
    chainId,
    refetch,
  ]);

  const triggerFirstAuction = useCallback(async () => {
    if (
      projectData &&
      projectData.creator &&
      projectData.editions[0] &&
      account &&
      account.toLowerCase() === projectData.creator.toLowerCase()
    ) {
      try {
        setTriggerPending(true);
        // @ts-ignore
        const discountRateBig = projectData.editions[0].mintPrice.div(
          60 * 60 * 24
        );
        const discountRate = parseInt(discountRateBig._hex, 16);
        const Tx = await Collection.triggerFirstAuction(discountRate);
        const { hash } = Tx;
        toast.info(
          <ToastLink
            hash={hash}
            chainId={chainId}
            message={'Triggering auctions...'}
          />
        );
        Collection.provider.once(hash, async (transaction) => {
          refetch();
          setTriggerPending(false);
          toast.success('Auctions have started!');
        });
      } catch (e: unknown) {
        // @ts-ignore
        toast.error(e.reason ?? 'Something went wrong.');
        console.log({ e });
        setTriggerPending(false);
      }
    }
  }, [projectData, account, Collection, chainId, refetch]);

  const unlockNextEdition = useCallback(
    async (amount: number, price: string) => {
      const formattedPrice = BigNumber.from((Number(price) * 1e18).toString());

      try {
        setUnlockEditionPending(true);
        const Tx = await Collection.enableNextEdition(amount, formattedPrice);
        const { hash } = Tx;
        toast.info(
          <ToastLink
            hash={hash}
            chainId={chainId}
            message={'Unlocking next edition...'}
          />
        );
        Collection.provider.once(hash, (transaction) => {
          refetch();
          setUnlockEditionPending(false);
          setShowUnlockEditionModal(false);
          toast.success('New Edition unlocked!');
        });
      } catch (e: unknown) {
        // @ts-ignore
        toast.error(e.reason ?? 'Something went wrong.');
        setUnlockEditionPending(false);
        setShowUnlockEditionModal(false);
      }
    },
    [Collection, chainId, refetch]
  );

  const configured = useMemo(() => {
    let hasConfigured = false;
    if (projectData) {
      if (
        projectData.blurbIpfsHash ||
        projectData.imgIpfsHash ||
        projectData.genre ||
        projectData.subtitle
      ) {
        hasConfigured = true;
      }
    }
    return hasConfigured;
  }, [projectData]);

  const canTriggerNextEdition = useMemo(() => {
    const canTrigger = false;
    // TODO
    // if (
    //   projectData &&
    //   projectData.currentEditionMaxSupply ===
    //     projectData.currentEditionTotalSupply
    // ) {
    //   canTrigger = true;
    // }
    return canTrigger;
  }, [projectData]);

  const calculatedProgress = useMemo((): number => {
    let percentage = 0;
    if (!projectData) return percentage;
    if (configured) {
      percentage = 33;
    }
    if (projectData.premintedByAuthor > 0) {
      percentage = 66;
    }
    if (projectData.auctionsStarted) {
      percentage = 100;
    }
    return percentage;
  }, [projectData, configured]);

  const calculatedProgressIndicationText = useMemo((): string => {
    let text = 'Next: Configure';

    switch (calculatedProgress) {
      case 33:
        text = 'Next: Premint';
        break;
      case 66:
        text = 'Next: Start Auctions';
        break;
      case 100:
        text = 'Done!';
        break;
      default:
        break;
    }

    return text;
  }, [calculatedProgress]);

  return (
    <Root>
      <Title style={{ maxWidth: '300px' }}>Control Settings for Author</Title>
      <Title>
        Launching <Emoji symbol="🚀" label="Rocket" />
      </Title>
      <ProgressBarWrapper>
        <ProgressBar completed={calculatedProgress} />
        <ProgressBarIndicator>
          {calculatedProgressIndicationText}
        </ProgressBarIndicator>
      </ProgressBarWrapper>
      <ActionItems>
        <MoreDetails
          title={
            configured || projectData.auctionsStarted ? (
              <Flex>
                <span>{'1) Configure Project'}</span>
                <Checkmark />
              </Flex>
            ) : (
              '1) Configure Project'
            )
          }
          styles={{ marginBlockEnd: '1rem' }}
        >
          <>
            <p>
              Save more information about this work in the contract, to make
              your project more appealing and trustworthy. This action can only
              be done before triggering the auctions.
            </p>
            {configured || projectData.auctionsStarted ? (
              <DoneAction>{'Configure Project'}</DoneAction>
            ) : (
              <TriggerButton
                onClick={() => setShowConfigureModal(true)}
                disabled={configurePending}
              >
                {configurePending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'Configure Your Project'
                )}
              </TriggerButton>
            )}
          </>
        </MoreDetails>
        <MoreDetails
          title={
            projectData.auctionsStarted ||
            projectData.contributors?.length > 0 ? (
              <Flex>
                <span>{'2) Add Contributors'}</span>
                <Checkmark />
              </Flex>
            ) : (
              '2) Add Contributors'
            )
          }
          styles={{ marginBlockEnd: '1rem' }}
        >
          <>
            <p>
              This is optional. You can specify what share of the fund
              contributors to your project will receive. This action can only be
              done before triggering the auctions.
            </p>
            {projectData.auctionsStarted ||
            projectData.contributors?.length > 0 ? (
              <DoneAction>{'Add Contributors'}</DoneAction>
            ) : (
              <TriggerButton
                onClick={() => {
                  setShowContributorsModal(true);
                }}
                disabled={contributorsPending}
              >
                {contributorsPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'Add Contributors'
                )}
              </TriggerButton>
            )}
          </>
        </MoreDetails>
        <MoreDetails
          open={
            projectData.premintedByAuthor === 0 &&
            (configured || projectData.contributors?.length > 0)
          }
          title={
            projectData.premintedByAuthor > 0 ? (
              <Flex>
                <span>{`3) Minted Your ${projectData.premintedByAuthor} ${
                  projectData.premintedByAuthor === 1 ? 'Copy' : 'Copies'
                }`}</span>
                <Checkmark />
              </Flex>
            ) : (
              '3) Mint Your Copies'
            )
          }
          styles={{ marginBlockEnd: '1rem' }}
        >
          <>
            <p>
              Make sure to claim some NFTs for yourself :) This is mandatory for
              triggering the auction in the next.
            </p>
            {projectData.premintedByAuthor > 0 ? (
              <DoneAction>{'Mint Your Copies'}</DoneAction>
            ) : (
              <TriggerButton
                onClick={() => setShowAuthorMintModal(true)}
                disabled={authorMintPending}
              >
                {authorMintPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'Mint Your Copies'
                )}
              </TriggerButton>
            )}
          </>
        </MoreDetails>
        <MoreDetails
          open={
            projectData.premintedByAuthor > 0 && !projectData.auctionsStarted
          }
          title={
            projectData.auctionsStarted ? (
              <Flex>
                <span>{'4) Trigger Auctions'}</span>
                <Checkmark />
              </Flex>
            ) : (
              '4) Trigger Auctions'
            )
          }
          styles={{ marginBlockEnd: '1rem' }}
        >
          <>
            <p>
              Start the auctions for your Genesis Edition. Once you do that, you
              will not be able to configure or add contributors anymore. You
              need to claim your NFTs before you can trigger it.
            </p>
            {projectData.premintedByAuthor > 0 &&
            !projectData.auctionsStarted ? (
              <TriggerButton
                onClick={triggerFirstAuction}
                disabled={triggerPending}
              >
                {triggerPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'Trigger Auctions'
                )}
              </TriggerButton>
            ) : (
              <DoneAction>{'Trigger Auctions'}</DoneAction>
            )}
          </>
        </MoreDetails>
      </ActionItems>
      <Title style={{ marginBlockStart: '1rem' }}>Others</Title>
      <ActionItems>
        <MoreDetails
          open={canTriggerNextEdition}
          title={'Unlock Next Edition'}
          styles={{ marginBlockEnd: '1rem' }}
        >
          <>
            <p>
              When all NFTs of the last editions have sold out, you can start
              the next one!
            </p>
            {!canTriggerNextEdition ? (
              <DoneAction>{'Unlock Next Edition'}</DoneAction>
            ) : (
              <TriggerButton
                onClick={() => setShowUnlockEditionModal(true)}
                disabled={unlockEditionPending}
              >
                {unlockEditionPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'Unlock'
                )}
              </TriggerButton>
            )}
          </>
        </MoreDetails>
      </ActionItems>
      {showConfigureModal && (
        <ConfigureModal
          onClose={() => setShowConfigureModal(false)}
          onConfigure={configure}
          pending={configurePending}
        />
      )}
      {showContributorsModal && (
        <ContributorsModal
          projectId={projectId}
          onClose={() => setShowContributorsModal(false)}
          onFailure={() => setContributorsPending(false)}
          onPending={() => setContributorsPending(true)}
          onSuccess={(contributorList: Contributor[]) => {
            setContributorsPending(false);
            onAddContributors(contributorList);
          }}
        />
      )}
      {showAuthorMintModal && (
        <BaseModal onClose={() => setShowAuthorMintModal(false)}>
          <ContentWrapper>
            <ModalHeader>Claim Your Copies</ModalHeader>
            <ModalText>
              {`You as an author can mint an amount of your project's Genesis
              Edition NFTs for yourself. Only after minting this amount, can you
              trigger the public auctions for your first edition. MAX: ${projectData.currentEditionMaxSupply}`}
            </ModalText>
            <CTAWrapper>
              <InputField
                value={authorMintInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const onlyNumbers = /^[0-9\b]+$/;
                  if (
                    e.target.value === '' ||
                    onlyNumbers.test(e.target.value)
                  ) {
                    setAuthorMintInput(e.target.value);
                  }
                }}
                error={
                  (Number(authorMintInput) < 1 ||
                    Number(authorMintInput) >
                      projectData.currentEditionMaxSupply) &&
                  'Incorrect amount.'
                }
              />
              <MintButton
                disabled={
                  authorMintPending ||
                  Number(authorMintInput) < 1 ||
                  Number(authorMintInput) > projectData.currentEditionMaxSupply
                }
                onClick={authorMint}
              >
                {authorMintPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'MINT'
                )}
              </MintButton>
            </CTAWrapper>
          </ContentWrapper>
        </BaseModal>
      )}
      {showUnlockEditionModal && (
        <BaseModal onClose={() => setShowUnlockEditionModal(false)}>
          <ContentWrapper>
            <ModalHeader>{'Unlock Next Edition'}</ModalHeader>
            <ModalText>Specify the max amount and price per mint.</ModalText>
            <CTAWrapper>
              <InputField
                label={'Max Amount'}
                value={nextEditionMaxAmount}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const onlyNumbers = /^[0-9\b]+$/;
                  if (
                    e.target.value === '' ||
                    onlyNumbers.test(e.target.value)
                  ) {
                    setNextEditionMaxAmount(Number(e.target.value));
                  }
                }}
                error={
                  (Number(nextEditionMaxAmount) < 1 ||
                    Number(nextEditionMaxAmount) > 10000) &&
                  'Must be between 1 and 10000.'
                }
              />
              {/* <InputField
                label={'Mint Price'}
                value={nextEditionMintPrice}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMextEditionMintPrice(Number(e.target.value));
                }}
                // TODO: increase after development
                error={nextEditionMintPrice < 1 && 'Price too low.'}
              />
              <MintButton
                disabled={
                  unlockEditionPending ||
                  nextEditionMaxAmount < 1 ||
                  nextEditionMaxAmount > 10000 ||
                  nextEditionMintPrice < 1
                }
                onClick={async () =>
                  await unlockNextEdition(
                    nextEditionMaxAmount,
                    nextEditionMintPrice
                  )
                }
              >
                {unlockEditionPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'UNLOCK'
                )}
              </MintButton> */}
              <InputField
                label={'Mint Price'}
                value={nextEditionMintPrice}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setMextEditionMintPrice(e.target.value);
                }}
                error={Number(nextEditionMintPrice) < 0.01 && 'Price too low.'}
              />
              <MintButton
                disabled={
                  unlockEditionPending ||
                  Number(nextEditionMaxAmount) < 1 ||
                  Number(nextEditionMaxAmount) > 10000 ||
                  Number(nextEditionMintPrice) < 0.01
                }
                onClick={async () =>
                  await unlockNextEdition(
                    nextEditionMaxAmount,
                    nextEditionMintPrice
                  )
                }
              >
                {unlockEditionPending ? (
                  <Loading height={20} dotHeight={20} />
                ) : (
                  'UNLOCK'
                )}
              </MintButton>
            </CTAWrapper>
          </ContentWrapper>
        </BaseModal>
      )}
    </Root>
  );
};

export default AuthorSection;
