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
    domains: ["ipfs.io"]
  },
  env: {
    NEXT_PUBLIC_MUMBAI_RPC: process.env.NX_PUBLIC_RPC_URL_POLYGON_MUMBAI,
    NEXT_PUBLIC_POLYGON_RPC: process.env.NX_PUBLIC_RPC_URL_POLYGON_MAINNET,
    NEXT_PUBLIC_RINKEBY_RPC: process.env.NX_PUBLIC_RPC_URL_ETH_RINKEBY,
    NEXT_PUBLIC_ETHEREUM_RPC: process.env.NX_PUBLIC_RPC_URL_ETH_MAINNET
  }
};

module.exports = withNx(nextConfig);
