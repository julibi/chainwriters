import { BigInt } from '@graphprotocol/graph-ts'
import { DaoCreated } from "../generated/ProjectFactory/ProjectFactory"
import {
  AuctionsEnded,
  AuctionsStarted,
  AuthorMinted,
  ContributorAdded,
  Configured,
  ExpirationSet,
  Minted,
  NextEditionEnabled,
  TextSet,
} from '../generated/templates/ProjectDao/ProjectDao';
import { Contribution, Dao, Edition } from "../generated/schema"
import { ProjectDao as ProjectDaoTemplate } from '../generated/templates'
import { log } from "@graphprotocol/graph-ts"

export function handleDaoCreated(event: DaoCreated): void {
  let dao = new Dao(event.params.dao.toHexString())
  ProjectDaoTemplate.create(event.params.dao)
  dao.author = event.params.caller
  dao.address = event.params.dao
  dao.title = event.params.title
  dao.textIpfsHash = event.params.textIpfsHash
  dao.createdAt = event.block.timestamp
  dao.auctionsStarted = false
  dao.auctionsEnded = false
  dao.save()

  let edition = new Edition(event.params.dao.toHexString() + '1') 
  edition.dao = dao.id
  edition.totalSupply = BigInt.fromI32(0)
  edition.maxSupply = event.params.firstEditionAmount
  edition.mintPrice = event.params.initialMintPrice
  edition.save()
}

export function handleTextSet(event: TextSet): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.textIpfsHash = event.params.textHash
  dao.save()
}

export function handleConfigured(event: Configured): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.imgIpfsHash = event.params.imgHash
  dao.blurbIpfsHash = event.params.blurbHash
  dao.genre = event.params.newGenre
  dao.subtitle = event.params.newSubtitle
  dao.save()
}

export function handleAuctionsStarted(event: AuctionsStarted): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.auctionsStarted = true
  dao.save()
}

export function handleAuctionsEnded(event: AuctionsEnded): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.auctionsEnded = true
  dao.save()
}

export function handleContributorAdded(event: ContributorAdded): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  let contribution = new Contribution(event.params.contributor.toHex() + "-" + event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  contribution.address = event.params.contributor
  contribution.share = event.params.share
  contribution.role = event.params.role
  contribution.dao = dao.id
  contribution.save()
}

export function handleAuthorMinted(event: AuthorMinted): void {
  let edition = Edition.load(event.address.toHexString() + event.params.edition.toHexString()) 
  log.info("handleAuthorMinted", [event.address.toHexString(), event.params.edition.toHexString()])
  if (!edition) return
  log.info("there is an edition! handleAuthorMing", [edition.id])
  edition.premintedByAuthor = event.params.amount
  edition.save()
}

export function handleMinted(event: Minted): void {
  let edition = Edition.load(event.address.toHexString() + event.params.edition.toHexString())
  if (!edition) return
  edition.totalSupply = edition.totalSupply.plus(event.params.amount)
  edition.save()
}

export function handleExpirationSet(event: ExpirationSet): void {
  let edition = Edition.load(event.address.toHexString() + event.params.edition.toHexString())
  if (!edition) return
  edition.expiresAt = event.params.expirationTime
  edition.save()
}

export function handleNextEditionEnabled(event: NextEditionEnabled): void {
  let edition = new Edition(event.address.toHexString() + event.params.nextEdId.toHexString())
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  edition.dao = dao.id
  edition.totalSupply = BigInt.fromI32(0)
  edition.maxSupply = event.params.maxSupply
  edition.mintPrice = event.params.mintPrice
  edition.save()
}

// TODO paused && unpaused