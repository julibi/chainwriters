import { useWeb3React } from '@web3-react/core';
import { useEagerConnect } from '../hooks/useEagerConnect';
import WalletConnection from '../components/WalletConnection';
import styled from 'styled-components';


export function Index() {
  const {account} = useWeb3React();
  const hasTried = useEagerConnect();
  return (
    <div>
      <span>MAIN PAGE</span>
      {!account && <WalletConnection onSuccessfulConnection={() => alert("YAS, connected")}/>}
      {account && <span>{account}</span>}
    </div>
  );
}

export default Index;
