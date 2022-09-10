import { create } from 'ipfs-http-client';

export const useIpfsClient = () => {
  const projectId = process.env.NX_PUBLIC_IPFS_INFURA_PROJECT_ID;
  const projectSecret = process.env.NX_PUBLIC_IPFS_INFURA_SECRET;
  const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      authorization: auth,
    }
  });

  return client;
}
