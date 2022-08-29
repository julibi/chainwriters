import { log } from '@graphprotocol/graph-ts';
import { BigInt } from '@graphprotocol/graph-ts';
import {
  Paused,
  ProjectCreated,
  Received,
} from '../generated/MoonpageFactory/MoonpageFactory';
import {
  Configured,
  ContributorAdded,
  NextEditionEnabled,
  RangeSet,
  TextSet,
  TokenIdIncreased,
} from '../generated/MoonpageManager/MoonpageManager';
import { Contributor, Edition, Project } from '../generated/schema';

export function handlePaused(event: Paused): void {}

export function handleProjectCreated(event: ProjectCreated): void {
  let project = new Project(event.params.projectId.toString());
  project.creator = event.params.creator;
  project.royaltiesSplitter = event.params.royaltiesSplitter;
  project.createdAt = event.block.timestamp;
  project.title = event.params.title;
  project.textIpfsHash = event.params.textIpfsHash;
  project.firstEditionAmount = event.params.firstEditionAmount;
  project.initialMintPrice = event.params.initialMintPrice;
  project.currentTokenId = 0;
  project.claimableMaticTotal = 0;
  project.premintedByAuthor = 0;
  project.isPaused = false;
  project.isFrozen = false;
  project.auctionsStarted = false;
  project.auctionsEnded = false;
  project.save();
}

export function handleRangeSet(event: RangeSet): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.currentTokenId = event.params.startId;
  project.startId = event.params.startId;
  project.endId = event.params.endId;
  project.save();
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

export function handleTextSet(event: TextSet): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.textIpfsHash = event.params.textHash;
  project.save();
}

export function handleTokenIdIncreased(event: TokenIdIncreased): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  // continue here
}

export function handleReceived(event: Received): void {}
