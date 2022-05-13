import { DaoCreated } from "../generated/ProjectFactory/factory"
import { AuctionsEnded, AuctionsStarted, ContributorAdded, TextSet, Configured } from "../generated/templates/ProjectDao/project";
import { Contribution, Dao } from "../generated/schema"
import { log } from "@graphprotocol/graph-ts"

export function handleDaoCreated(event: DaoCreated): void {
  log.info('handleDaoCreated', [event.params.dao.toHex()])
  log.debug('handleDaoCreated', [event.params.dao.toHex()])
  let dao = new Dao(event.params.dao.toHex())
  dao.author = event.params.caller
  dao.address = event.params.dao
  dao.title = event.params.title
  dao.textIpfsHash = event.params.textIpfsHash
  dao.firstEditionMax = event.params.firstEditionAmount
  dao.mintPrice = event.params.initialMintPrice
  dao.createdAt = event.block.timestamp
  dao.auctionsStarted = false
  dao.auctionsEnded = false
  dao.save()
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
  contribution.dao = dao
  contribution.save()
}

// TODO paused && unpaused