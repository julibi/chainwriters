import { log } from '@graphprotocol/graph-ts';
import { BigInt } from '@graphprotocol/graph-ts';
import {
  Paused,
  ProjectCreated,
  Received,
} from '../generated/MoonpageFactory/MoonpageFactory';
import {
  Configured,
  NextEditionEnabled,
} from '../generated/MoonpageManager/MoonpageManager';
import { Edition, Project } from '../generated/schema';

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
  project.auctionsStarted = false;
  project.auctionsEnded = false;
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

export function handleReceived(event: Received): void {}
