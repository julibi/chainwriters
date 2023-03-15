import { Address, BigInt } from '@graphprotocol/graph-ts';
import {
  BalanceDecreased,
  BalanceIncreased,
  BaseDataFrozen,
  Configured,
  ContributorAdded,
  Curated,
  NextEditionEnabled,
  PremintedByAuthor,
  ProjectCreated,
  ProjectDeleted,
  ProjectPaused,
  TextUpdated,
  TranslationUpdated,
  BlurbUpdated,
  GenreUpdated,
  SubtitleUpdated,
  LanguageUpdated,
  ImageUpdated,
  AnimationUpdated,
  TokenIdIncreased,
} from '../generated/MoonpageManager/MoonpageManager';
import { Minted } from '../generated/MoonpageCollection/MoonpageCollection';
import {
  AuctionsStarted,
  AuctionsEnded,
  ExpirationSet,
} from '../generated/AuctionsManager/AuctionsManager';
import { BallotCreated } from '../generated/BallotsFactory/BallotsFactory';
import {
  VoteStarted,
  Voted,
  VoteEnded,
} from '../generated/templates/Ballot/Ballot';
import { Ballot } from '../generated/templates';
import {
  Contributor,
  Edition,
  Mint,
  Project,
  Profile,
  Voting,
} from '../generated/schema';
import {
  ProfileConfigured,
  SocialsConfigured,
  DiscordConfigured,
  InstagramConfigured,
  ParagraphxyzConfigured,
  SubstackConfigured,
  TwitterConfigured,
  YoutubeConfigured,
  ProfileReset,
  VerificationSet,
} from '../generated/MoonpageProfiles/MoonpageProfiles';

export function handleProjectCreated(event: ProjectCreated): void {
  let project = new Project(event.params.projectId.toString());
  project.creator = event.params.creator;
  project.royaltiesSplitter = event.params.royaltiesSplitter;
  project.createdAt = event.block.timestamp;
  project.title = event.params.title;
  project.textIpfsHash = event.params.textIpfsHash;
  project.originalLanguage = event.params.originalLanguage;
  project.firstEditionAmount = event.params.firstEditionAmount;
  project.initialMintPrice = event.params.initialMintPrice;
  project.startId = event.params.startId;
  project.endId = event.params.endId;
  project.currentId = event.params.startId;
  project.balance = BigInt.fromString('0');
  project.premintedByAuthor = BigInt.fromString('0');
  project.isFrozen = false;
  project.isCurated = false;
  project.isPaused = false;
  project.auctionsStarted = false;
  project.auctionsEnded = false;
  project.mintCount = BigInt.fromString('0');
  project.save();

  let edition = new Edition(event.transaction.hash.toHexString() + '1');
  edition.project = project.id;
  edition.edition = BigInt.fromString('1');
  edition.startId = event.params.startId;
  edition.endId = event.params.currentEdLastId;
  edition.mintPrice = event.params.initialMintPrice;
  edition.save();
}

export function handleDeleted(event: ProjectDeleted): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.textIpfsHash = '';
  project.imgIpfsHash = '';
  project.animationIpfsHash = '';
  project.blurbIpfsHash = '';
  project.translationIpfsHash = '';
  project.isDeleted = true;
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

export function handleTextUpdated(event: TextUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.textIpfsHash = event.params.newIpfsHash;
  project.save();
}

export function handleTranslationUpdated(event: TranslationUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.translationIpfsHash = event.params.newIpfsHash;
  project.save();
}

export function handleBlurbUpdated(event: BlurbUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.blurbIpfsHash = event.params.newIpfsHash;
  project.save();
}

export function handleGenreUpdated(event: GenreUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.genre = event.params.newGenre;
  project.save();
}

export function handleSubtitleUpdated(event: SubtitleUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.subtitle = event.params.newSubtitle;
  project.save();
}

export function handleLanguageUpdated(event: LanguageUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.originalLanguage = event.params.newLanguage;
  project.save();
}

export function handleImageUpdated(event: ImageUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.imgIpfsHash = event.params.newIpfsHash;
  project.save();
}

export function handleAnimationUpdated(event: AnimationUpdated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.animationIpfsHash = event.params.newIpfsHash;
  project.save();
}

export function handleMint(event: Minted): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.mintCount = project.mintCount.plus(BigInt.fromString('1'));
  project.save();

  let mint = new Mint(
    event.transaction.hash.toHexString() + '-' + event.logIndex.toHexString()
  );
  mint.project = project.id;
  mint.edition = event.params.edition;
  mint.receiver = event.params.account;
  mint.tokenId = event.params.tokenId;
  mint.save();
}

export function handleTokenIdIncreased(event: TokenIdIncreased): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.currentId = project.currentId.plus(event.params.amount);
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

export function handleAuctionsStarted(event: AuctionsStarted): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.auctionsStarted = true;
  project.save();
}

export function handleAuctionsEnded(event: AuctionsEnded): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.auctionsEnded = true;
  project.save();
}

export function handleExpirationSet(event: ExpirationSet): void {
  let projectId = event.params.projectId.toString();
  let expiration = event.params.expirationTime;
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }
  project.currentAuctionExpiresAt = expiration;
  project.save();
}

// ------------------
// Voting Related
// ------------------

export function handleBallotCreated(event: BallotCreated): void {
  let projectId = event.params.projectId.toString();
  let project = Project.load(projectId);
  if (!project) {
    throw new Error(`Could not find project with ID`);
  }

  project.ballotCreated = event.block.timestamp;
  project.ballotAddress = event.params.ballotAddress;
  project.save();

  Ballot.create(event.params.ballotAddress);
}

export function handleVoteStarted(event: VoteStarted): void {
  let projectId = event.params.projectId.toString();

  let voting = new Voting(projectId + '-' + event.params.votingId.toString());
  if (!voting) {
    throw new Error('Could not create voting for project');
  }
  voting.project = projectId;
  voting.proposal = event.params.proposal;
  voting.option1 = event.params.option1;
  voting.option2 = event.params.option2;
  voting.option3 = event.params.option3;
  voting.option1Count = BigInt.fromString('0');
  voting.option2Count = BigInt.fromString('0');
  voting.option3Count = BigInt.fromString('0');
  voting.totalCount = BigInt.fromString('0');
  voting.voteStarted = event.block.timestamp;
  voting.voteEnding = event.params.endTime;
  voting.isVoting = true;
  voting.save();
}

export function handleVoted(event: Voted): void {
  let projectId = event.params.projectId.toString();
  let voting = Voting.load(projectId + '-' + event.params.votingId.toString());

  if (!voting) {
    throw new Error(`Could not find voting with ID`);
  }

  let upvotedCount = event.params.counts;
  let upvotedOption = event.params.option;

  if (upvotedOption == BigInt.fromString('0')) {
    voting.option1Count = voting.option1Count.plus(upvotedCount);
  }
  if (upvotedOption == BigInt.fromString('1')) {
    voting.option2Count = voting.option2Count.plus(upvotedCount);
  }
  if (upvotedOption == BigInt.fromString('2')) {
    voting.option3Count = voting.option3Count.plus(upvotedCount);
  }
  voting.totalCount = voting.totalCount.plus(upvotedCount);
  voting.save();
}

export function handleVoteEnded(event: VoteEnded): void {
  let projectId = event.params.projectId.toString();
  let voting = Voting.load(projectId + '-' + event.params.votingId.toString());

  if (!voting) {
    throw new Error(`Could not find voting with ID`);
  }

  voting.voteEnding = event.block.timestamp;
  voting.isVoting = false;
  voting.save();
}

// ------------------
// Profiles Related
// ------------------

export function handleProfileConfigured(event: ProfileConfigured): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.name = event.params.name;
  profile.imageIPFSHash = event.params.imageIPFSHash;
  profile.descriptionIPFSHash = event.params.descriptionIPFSHash;
  profile.website = event.params.website;
  profile.isVerified = false;
  profile.save();
}

export function handleSocialsConfigured(event: SocialsConfigured): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.discord = event.params.discord;
  profile.instagram = event.params.instagram;
  profile.paragraphxyz = event.params.paragraphxyz;
  profile.substack = event.params.substack;
  profile.twitter = event.params.twitter;
  profile.youtube = event.params.youtube;
  profile.isVerified = false;
  profile.save();
}

export function handleDiscordConfigured(event: DiscordConfigured): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.discord = event.params.discord;
  profile.isVerified = false;
  profile.save();
}

export function handleInstagramConfigured(event: InstagramConfigured): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.instagram = event.params.instagram;
  profile.isVerified = false;
  profile.save();
}

export function handleParagraphxyzConfigured(
  event: ParagraphxyzConfigured
): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.paragraphxyz = event.params.paragraphxyz;
  profile.isVerified = false;
  profile.save();
}

export function handleSubstackConfigured(event: SubstackConfigured): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.substack = event.params.substack;
  profile.isVerified = false;
  profile.save();
}

export function handleTwitterConfigured(event: TwitterConfigured): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.twitter = event.params.twitter;
  profile.isVerified = false;
  profile.save();
}

export function handleYoutubeConfigured(event: YoutubeConfigured): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = event.params.userAddress;
  profile.youtube = event.params.youtube;
  profile.isVerified = false;
  profile.save();
}

export function handleProfileReset(event: ProfileReset): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }

  profile.address = Address.fromString(
    '0x0000000000000000000000000000000000000000'
  );
  profile.name = '';
  profile.imageIPFSHash = '';
  profile.descriptionIPFSHash = '';
  profile.website = '';
  profile.discord = '';
  profile.instagram = '';
  profile.paragraphxyz = '';
  profile.substack = '';
  profile.twitter = '';
  profile.youtube = '';
  profile.isVerified = false;
  profile.save();
}

export function handleVerificationSet(event: VerificationSet): void {
  let userAddress = event.params.userAddress.toString();
  let profile = Profile.load(userAddress);

  if (!profile) {
    profile = new Profile(event.params.userAddress.toString());
  }
  profile.isVerified = event.params.isVerified;
  profile.save();
}
