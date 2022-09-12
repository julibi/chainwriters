import { BigNumber } from "ethers";
import { ReactChild } from "react";
import { WriteActionStatus } from "../manager-provider/manager-provider.types";

export type CollectionApi = {
    startAuctions: (x: StartAuctionsArgs) => Promise<void>;
    startAuctionsStatus: WriteActionStatus;
};

export type CollectionProviderProps = {
    children: ReactChild;
};

export type StartAuctionsArgs = {
    projectId: string;
    amountForCreator: number;
    initialMintPrice: BigNumber;
    onSuccess?: () => void;
    onError?: (e: any) => void;
};