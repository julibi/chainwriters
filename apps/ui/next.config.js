// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  images: {
    domains: [
      'ipfs.io',
      'moonpage-metadata-backend-dev.herokuapp.com',
      'moonpage-metadata-backend-prod.herokuapp.com',
    ],
  },
  env: {
    NEXT_PUBLIC_RPC_URL_POLYGON_MAINNET_INFURA:
      process.env.NX_PUBLIC_RPC_URL_POLYGON_MAINNET_INFURA,
    NEXT_PUBLIC_RPC_URL_POLYGON_MUMBAI_INFURA:
      process.env.NX_PUBLIC_RPC_URL_POLYGON_MUMBAI_INFURA,
    NEXT_PUBLIC_RPC_URL_POLYGON_MAINNET_ALCHEMY:
      process.env.NX_PUBLIC_RPC_URL_POLYGON_MAINNET_ALCHEMY,
    NEXT_PUBLIC_RPC_URL_POLYGON_MUMBAI_ALCHEMY:
      process.env.NX_PUBLIC_RPC_URL_POLYGON_MUMBAI_ALCHEMY,
    NX_PUBLIC_RPC_API_KEY_INFURA: process.env.NX_PUBLIC_RPC_API_KEY_INFURA,
    NEXT_PUBLIC_IPFS_INFURA_PROJECT_ID:
      process.env.NX_PUBLIC_IPFS_INFURA_PROJECT_ID,
    NEXT_PUBLIC_PINATA_API_URL: process.env.NX_PUBLIC_PINATA_API_URL,
    NEXT_PUBLIC_PINATA_UNPIN_API_URL:
      process.env.NX_PUBLIC_PINATA_UNPIN_API_URL,
    NEXT_PUBLIC_PINATA_API_KEY: process.env.NX_PUBLIC_PINATA_API_KEY,
    NEXT_PUBLIC_PINATA_API_SECRET: process.env.NX_PUBLIC_PINATA_API_SECRET,
    NEXT_PUBLIC_PINATA_JWT: process.env.NX_PUBLIC_PINATA_JWT,
    NEXT_PUBLIC_ENVIRONMENT: process.env.NX_PUBLIC_ENVIRONMENT,
    NEXT_PUBLIC_HOTJAR_ID: process.env.NX_PUBLIC_HOTJAR_ID,
    NEXT_PUBLIC_HOTJAR_SV: process.env.NX_PUBLIC_HOTJAR_SV,
    NEXT_SITE_URL: process.env.NX_PUBLIC_SITE_URL,
    NEXT_PUBLIC_MOONPAGE_METADATA_API:
      process.env.NX_PUBLIC_MOONPAGE_METADATA_API,
  },
};

module.exports = withNx(nextConfig);
