import { DaoCreated } from "../generated/ProjectFactory/ProjectFactory"
import { AuctionsEnded, AuctionsStarted, ContributorAdded, TextSet, Configured } from "../generated/templates/ProjectDao/ProjectDao";
import { Contribution, Dao } from "../generated/schema"
import { ProjectDao as ProjectDaoTemplate } from '../generated/templates'
import { log } from "@graphprotocol/graph-ts"

export function handleDaoCreated(event: DaoCreated): void {
  let dao = new Dao(event.params.dao.toHexString())
  ProjectDaoTemplate.create(event.params.dao)
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

// TODO paused && unpaused