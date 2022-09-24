import { BigNumber } from "ethers";
import { ReactChild } from "react";
import { WriteActionStatus } from "../manager-provider/manager-provider.types";

export type CollectionApi = {
    startAuctions: (x: StartAuctionsArgs) => Promise<void>;
    startAuctionsStatus: WriteActionStatus;
    buy: (x: BuyArgs) => Promise<void>;
    buyStatus: WriteActionStatus;
    mint: (x: MintArgs) => Promise<void>;
    mintStatus: WriteActionStatus;
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

export type BuyArgs = {
    projectId: string;
    initialMintPrice: BigNumber;
    onSuccess?: () => void;
    onError?: (e: any) => void;
};

export type MintArgs = {
    projectId: string;
    amount: number;
    price: BigNumber;
    onSuccess?: () => void;
    onError?: (e: any) => void;

};