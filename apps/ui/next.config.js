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
    NX_PUBLIC_RPC_URL_POLYGON_MAINNET: process.env.NX_PUBLIC_RPC_URL_POLYGON_MAINNET,
    NX_PUBLIC_RPC_URL_ETH_MAINNET: process.env.NX_PUBLIC_RPC_URL_ETH_MAINNET,
    NX_PUBLIC_RPC_URL_POLYGON_MUMBAI: process.env.NX_PUBLIC_RPC_URL_POLYGON_MUMBAI,
    NX_PUBLIC_RPC_URL_ETH_RINKEBY: process.env.NX_PUBLIC_RPC_URL_ETH_RINKEBY
  }
};

module.exports = withNx(nextConfig);
