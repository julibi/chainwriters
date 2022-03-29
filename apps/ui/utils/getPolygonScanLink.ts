function getPolygonScanLink(txnHash: string, chainId?: number) {
  let prefix = '';
  if (chainId === 80001) {
    prefix = 'mumbai.';
  }
  return `https://${prefix}polygonscan.com/tx/${txnHash}`;
}

export default getPolygonScanLink;