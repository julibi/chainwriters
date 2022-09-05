export type NftWithTechData = {
  projectId: number;
  editions: number;
  tokenId: number;
  title: string;
  creator: string;
};

export type OwnedUserNft = {
  tokenId?: number;
  projectId: number;
  edition?: number;
  title: string;
  creator?: string;
};

export type GetAccountProjectsVars = {
  account: string;
};
