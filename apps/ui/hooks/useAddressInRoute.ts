import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { utils } from 'ethers';

const useAddressInRoute = () => {
  const router = useRouter();
  return useMemo(() => {
    const routeParts = router?.asPath?.split('/');
    const routeEnding = routeParts[routeParts.length - 1];
    const hasRouteAddress = utils.isAddress(routeEnding);
    return hasRouteAddress ? routeEnding : undefined;
  }, [router?.asPath]);
};

export default useAddressInRoute;
