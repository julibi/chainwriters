import { ReactChild } from "react";
import { WriteActionStatus } from "../manager-provider/manager-provider.types";

export type CollectionApi = {
    startAuctions: () => Promise<void>;
    startAuctionsStatus: WriteActionStatus;
};

export type CollectionProviderProps = {
    children: ReactChild;
};

export type StartAuctionsArgs = {
    projectId: string;
    amountForCreator: number;
    discountRate: number;
    onSuccess?: () => void;
    onError?: (e: any) => void;
};