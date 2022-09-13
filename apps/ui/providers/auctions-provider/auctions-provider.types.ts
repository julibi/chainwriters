import { ReactChild } from "react";
import { WriteActionStatus } from "../manager-provider/manager-provider.types";

export type AuctionsApi = {
    retriggerAuction: (x: RetriggerAuctionArgs) => Promise<void>;
    retriggerAuctionStatus: WriteActionStatus;
};

export type AuctionsProviderProps = {
    children: ReactChild;
};

export type RetriggerAuctionArgs = {
    projectId: string;
    onSuccess?: () => void;
    onError?: (e: any) => void;
};