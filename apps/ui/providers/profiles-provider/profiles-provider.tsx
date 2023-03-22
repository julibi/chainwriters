import { createContext, useCallback, useMemo, useState } from 'react';
import {
  ConfigureProfileArgs,
  ConfigureSocialsArgs,
  ProfilesApi,
  ProfilesProviderProps,
  ResetProfileArgs,
  ConfigureDiscordArgs,
  ConfigureInstagramArgs,
  ConfigureParagraphxyzArgs,
  ConfigureSubstackArgs,
  ConfigureTwitterArgs,
  ConfigureYoutubeArgs,
} from './profiles-provider.types';
import { toast } from 'react-toastify';
import ToastLink from '../../components/ToastLink';
import { WriteActionStatus } from '../manager-provider/manager-provider.types';

import { getGasMargin } from '../../utils/getGasMargin';
import useProfilesContract from '../../hooks/useProfilesContract';
import pinProfileToPinata from '../../utils/pinProfileToPinata';
import unpinFromPinata from '../../utils/unpinFromPinata';

const defaultContext: ProfilesApi = {
  configureProfile: async () => undefined,
  configureProfileStatus: 'idle',
};

export const ProfilesContext = createContext(defaultContext);

export function ProfilesProvider({ children }: ProfilesProviderProps) {
  const Profiles = useProfilesContract();
  const [configureProfileStatus, setConfigureProfileStatus] =
    useState<WriteActionStatus>();
  const [configureSocialsStatus, setConfigureSocialsStatus] =
    useState<WriteActionStatus>();
  const [resetProfileStatus, setResetProfileStatus] =
    useState<WriteActionStatus>();
  const [configureDiscordStatus, setConfigureDiscordStatus] =
    useState<WriteActionStatus>();
  const [configureInstagramStatus, setConfigureInstagramStatus] =
    useState<WriteActionStatus>();
  const [configureParagraphxyzStatus, setConfigureParagraphxyzStatus] =
    useState<WriteActionStatus>();
  const [configureSubstackStatus, setConfigureSubstackStatus] =
    useState<WriteActionStatus>();
  const [configureTwitterStatus, setConfigureTwitterStatus] =
    useState<WriteActionStatus>();
  const [configureYoutubeStatus, setConfigureYoutubeStatus] =
    useState<WriteActionStatus>();

  const configureProfile = useCallback(
    async ({
      account,
      name,
      imageIPFSHash,
      descriptionIPFSHash,
      hasNewDescriptionHash,
      hasNewImageHash,
      website,
      onSuccess,
      onError,
    }: ConfigureProfileArgs) => {
      try {
        setConfigureProfileStatus('confirming');
        const {
          descriptionIPFSHash: oldDescriptionCID,
          imageIPFSHash: oldImageCID,
        } = await Profiles.profiles(account);
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureProfile(
          name,
          imageIPFSHash,
          descriptionIPFSHash,
          website,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setConfigureProfileStatus('waiting');
        toast.info(<ToastLink message={'Configuring profile...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();

          // pin new metadata to IPFS & unpin if needed
          if (hasNewImageHash) {
            await pinProfileToPinata(imageIPFSHash, account, 'image');

            oldImageCID && (await unpinFromPinata(oldImageCID));
          }

          if (hasNewDescriptionHash) {
            await pinProfileToPinata(
              descriptionIPFSHash,
              account,
              'description'
            );

            oldDescriptionCID && (await unpinFromPinata(oldDescriptionCID));
          }

          setConfigureProfileStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        setConfigureProfileStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const configureSocials = useCallback(
    async ({
      discord,
      instagram,
      paragraphxyz,
      substack,
      twitter,
      youtube,
      onSuccess,
      onError,
    }: ConfigureSocialsArgs) => {
      try {
        setConfigureProfileStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureSocials(
          discord,
          instagram,
          paragraphxyz,
          substack,
          twitter,
          youtube,
          { maxFeePerGas, maxPriorityFeePerGas }
        );
        const { hash } = Tx;
        setConfigureSocialsStatus('waiting');
        toast.info(<ToastLink message={'Configuring socials...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();
          setConfigureSocialsStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setConfigureSocialsStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const resetProfile = useCallback(
    async ({ account, onSuccess, onError }: ResetProfileArgs) => {
      try {
        setResetProfileStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const profileData = await Profiles.profile(account);
        const Tx = await Profiles.resetProfile({
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setResetProfileStatus('waiting');
        toast.info(<ToastLink message={'Resetting socials...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();

          // unpin metadata from IPFS
          await unpinFromPinata(profileData.imageIPFSHash);
          await unpinFromPinata(profileData.descriptionIPFSHash);

          setResetProfileStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setResetProfileStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const configureDiscord = useCallback(
    async ({ discord, onSuccess, onError }: ConfigureDiscordArgs) => {
      try {
        setConfigureDiscordStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureDiscord(discord, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setConfigureDiscordStatus('waiting');
        toast.info(<ToastLink message={'Setting Discord...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();
          setConfigureDiscordStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setConfigureDiscordStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const configureInstagram = useCallback(
    async ({ instagram, onSuccess, onError }: ConfigureInstagramArgs) => {
      try {
        setConfigureInstagramStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureInstagram(instagram, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setConfigureInstagramStatus('waiting');
        toast.info(<ToastLink message={'Setting Instagram...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();
          setConfigureInstagramStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setConfigureInstagramStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const configureParagraphxyz = useCallback(
    async ({ paragraphxyz, onSuccess, onError }: ConfigureParagraphxyzArgs) => {
      try {
        setConfigureParagraphxyzStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureParagraphxyz(paragraphxyz, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setConfigureParagraphxyzStatus('waiting');
        toast.info(<ToastLink message={'Setting Paragraph.xyz...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();
          setConfigureParagraphxyzStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setConfigureParagraphxyzStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const configureSubstack = useCallback(
    async ({ substack, onSuccess, onError }: ConfigureSubstackArgs) => {
      try {
        setConfigureSubstackStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureSubstack(substack, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setConfigureSubstackStatus('waiting');
        toast.info(<ToastLink message={'Setting Substack...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();
          setConfigureSubstackStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setConfigureSubstackStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const configureTwitter = useCallback(
    async ({ twitter, onSuccess, onError }: ConfigureTwitterArgs) => {
      try {
        setConfigureTwitterStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureTwitter(twitter, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setConfigureTwitterStatus('waiting');
        toast.info(<ToastLink message={'Setting Twitter...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();
          setConfigureTwitterStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setConfigureTwitterStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const configureYoutube = useCallback(
    async ({ youtube, onSuccess, onError }: ConfigureYoutubeArgs) => {
      try {
        setConfigureYoutubeStatus('confirming');
        const { maxFeePerGas, maxPriorityFeePerGas } = await getGasMargin();
        const Tx = await Profiles.configureYoutube(youtube, {
          maxFeePerGas,
          maxPriorityFeePerGas,
        });
        const { hash } = Tx;
        setConfigureYoutubeStatus('waiting');
        toast.info(<ToastLink message={'Setting Youtube...'} />);
        Profiles.provider.once(hash, async (transaction) => {
          await Tx.wait();
          setConfigureYoutubeStatus('success');
          toast.info(<ToastLink message={'Success!'} />);
          onSuccess?.();
        });
      } catch (e) {
        console.log({ e });
        setConfigureYoutubeStatus('error');
        toast.error(<ToastLink message={'Something went wrong!'} />);
        onError?.(e);
      }
    },
    [Profiles]
  );

  const api = useMemo(
    () => ({
      configureProfile,
      configureProfileStatus,
      configureSocials,
      configureSocialsStatus,
      resetProfile,
      resetProfileStatus,
      configureDiscord,
      configureDiscordStatus,
      configureInstagram,
      configureInstagramStatus,
      configureParagraphxyz,
      configureParagraphxyzStatus,
      configureSubstack,
      configureSubstackStatus,
      configureTwitter,
      configureTwitterStatus,
      configureYoutube,
      configureYoutubeStatus,
    }),
    [
      configureProfile,
      configureProfileStatus,
      configureSocials,
      configureSocialsStatus,
      resetProfile,
      resetProfileStatus,
      configureDiscord,
      configureDiscordStatus,
      configureInstagram,
      configureInstagramStatus,
      configureParagraphxyz,
      configureParagraphxyzStatus,
      configureSubstack,
      configureSubstackStatus,
      configureTwitter,
      configureTwitterStatus,
      configureYoutube,
      configureYoutubeStatus,
    ]
  );

  return (
    <ProfilesContext.Provider value={api}>{children}</ProfilesContext.Provider>
  );
}
