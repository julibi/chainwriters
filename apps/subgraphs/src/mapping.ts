import { DaoInstantiated } from "../generated/MoonlitFactory/MoonlitFactory"
import { Deposited, FundingEnded, GenreSet, SubtitleSet, URISet, ContributorAdded } from "../generated/templates/MoonlitDao/MoonlitDao"
import { Contribution, Dao } from "../generated/schema"

export function handleDaoInstantiated(event: DaoInstantiated): void {
  let dao = new Dao(event.params.dao.toHex())
  dao.author = event.params.caller
  dao.address = event.params.dao
  dao.createdAt = event.block.timestamp
  dao.title = event.params.title
  dao.ipfsLink = event.params.ipfsLink
  dao.firstEditionMax = event.params.firstEditionAmount
  dao.mintPrice = event.params.initialMintPrice
  dao.fundingEnded = false
  dao.save()
}

export function handleDeposited(event: Deposited):void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.fundedAmount = event.params.fundedAmount
  dao.save()
}


export function handleFundingEnded(event: FundingEnded): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.fundingEnded = true
  dao.save()
}

export function handleGenreSet(event: GenreSet): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.genre = event.params.newGenre
  dao.save()
}

export function handleSubtitleSet(event: SubtitleSet): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.subtitle = event.params.newSubtitle
  dao.save()
}

export function handleURISet(event: URISet): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.ipfsLink = event.params.ipfsHash
  dao.save()
}

export function handleContributorAdded(event: ContributorAdded): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  let contribution = new Contribution(event.params.contributor.toHex() + "-" + event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  contribution.address = event.params.contributor
  contribution.share = event.params.share
  contribution.role = ""
  contribution.dao = event.address
  contribution.save()
}
