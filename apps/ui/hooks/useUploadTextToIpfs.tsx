import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { useIpfsClient } from './useIpfsClient';
import { Node } from 'slate';

const useUploadTextToIpfs = () => {
  const client = useIpfsClient();
  const uploadText = useCallback(
    async (content: Node[] | string) => {
      try {
        const uploadContent =
          typeof content === 'string' ? content : JSON.stringify(content);
        // upload to IPFS
        const added = await client.add(uploadContent);
        return added.path;
      } catch (e) {
        toast.error('Something went wrong while uploading your text to ipfs.');
      }
    },
    [client]
  );

  return { uploadText };
};

export default useUploadTextToIpfs;
