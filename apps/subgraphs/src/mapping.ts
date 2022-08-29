import { log } from '@graphprotocol/graph-ts';
import { BigInt } from '@graphprotocol/graph-ts';
import { ProjectCreated } from '../generated/MoonpageFactory/MoonpageFactory';
import {
  BalanceDecreased,
  BalanceIncreased,
  BaseDataFrozen,
  Configured,
  ContributorAdded,
  Curated,
  NextEditionEnabled,
  PremintedByAuthor,
  ProjectPaused,
  RangeSet,
  TextSet,
  TokenIdIncreased,
} from '../generated/MoonpageManager/MoonpageManager';
import { Minted } from '../generated/MoonpageCollection/MoonpageCollection';
import { Contributor, Edition, Project } from '../generated/schema';

export function handleProjectCreated(event: ProjectCreated): void {
  let project = new Project(event.params.projectId.toString());
  project.creator = event.params.creator;
  project.royaltiesSplitter = event.params.royaltiesSplitter;
  project.createdAt = event.block.timestamp;
  project.title = event.params.title;
  project.textIpfsHash = event.params.textIpfsHash;
  project.firstEditionAmount = event.params.firstEditionAmount;
  project.initialMintPrice = event.params.initialMintPrice;
  // Continue here - get the correct tokenID!
  // project.currentTokenId = BigInt.fromString(event.params.projectId.times());
  project.balance = BigInt.fromString('0');
  project.premintedByAuthor = BigInt.fromString('0');
  project.isPaused = false;
  project.isFrozen = false;
  project.auctionsStarted = false;
  project.auctionsEnded = false;
  project.mintCount = BigInt.fromString('0');
  project.save();
}

// export function handleRangeSet(event: RangeSet): void {
//   let projectId = event.params.projectId.toString();
//   let project = Project.load(projectId);
//   if (!project) {
//     throw new Error(`Could not find project with ID`);
//   }
//   project.currentTokenId = event.params.startId;
//   project.startId = event.params.startId;
//   project.endId = event.params.endId;
//   project.save();
// }

export function handleNextEditionEnabled(event: NextEditionEnabled): void {
  let edition = new Edition(
    event.transaction.hash.toHexString() + event.params.editionId.toHexString()
  );
  if (!edition) {
    throw new Error('Could not create edition for project');
  }
  edition.project = event.params.projectId.toString();
  edition.edition = event.params.editionId;
  edition.startId = event.params.startId;
  edition.endId = event.params.endId;
  edition.mintPrice = event.params.mintPrice;
  edition.save();
}

export function handleProjectConfigured(event: Configured): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.imgIpfsHash = event.params.imgHash;
  project.animationIpfsHash = event.params.animationHash;
  project.blurbIpfsHash = event.params.blurbHash;
  project.genre = event.params.newGenre;
  project.subtitle = event.params.newSubtitle;
  project.save();
}

export function handleContributorAdded(event: ContributorAdded): void {
  let contributor = new Contributor(
    event.transaction.hash.toHexString() +
      event.params.contributor.toHexString()
  );

  if (!contributor) {
    throw new Error('Could not create contributor');
  }
  contributor.project = event.params.projectId.toString();
  contributor.address = event.params.contributor;
  contributor.role = event.params.role;
  contributor.sharePercentage = event.params.share;
  contributor.save();
}

export function handleBaseDataFrozen(event: BaseDataFrozen): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.isFrozen = event.params.frozen;
  project.save();
}

export function handlePremintedByAuthor(event: PremintedByAuthor): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.premintedByAuthor = event.params.amount;
  project.save();
}

export function handleTextSet(event: TextSet): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.textIpfsHash = event.params.textHash;
  project.save();
}

export function handleMint(event: Minted): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  // TODO save the whole mint in the the MINT entity
  project.mintCount = project.mintCount.plus(BigInt.fromString('1'));
  project.save();
}

export function handleTokenIdIncreased(event: TokenIdIncreased): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.currentTokenId = project.currentTokenId.plus(event.params.amount);
  project.save();
}

export function handleBalanceIncreased(event: BalanceIncreased): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.balance = project.balance.plus(event.params.amount);
  project.save();
}

export function handleBalanceDecreased(event: BalanceDecreased): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.balance = project.balance.minus(event.params.amount);
  project.save();
}

export function handlePaused(event: ProjectPaused): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.isPaused = event.params.isPaused;
  project.save();
}

export function handleCurated(event: Curated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.isCurated = event.params.isCurated;
  project.save();
}
