import { BigNumber } from "ethers";
import { ReactChild } from "react";
import { WriteActionStatus } from "../manager-provider/manager-provider.types";

export type FactoryApi = {
    createProject: (x: CreateArgs) => Promise<void>;
    createProjectStatus: WriteActionStatus;
};

export type FactoryProviderProps = {
    children: ReactChild;
};

export type CreateArgs = {
    title: string;
    textIpfsHash: string;
    originalLanguage: string;
    initialMintPrice: BigNumber;
    firstEditionAmount: BigNumber;
    onSuccess?: (newProjectId: string) => void;
    onError?: (e: any) => void;
};
