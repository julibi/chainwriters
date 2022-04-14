import { Random } from "../generated/MoonlitFactory/MoonlitFactory"
import { DaoCreated, Deposited, FundingEnded, GenreSet, SubtitleSet, ImgSet, BlurbSet, TextSet, ContributorAdded } from "../generated/templates/MoonlitDao/MoonlitDao"
import { Contribution, Dao, Test } from "../generated/schema"

export function handleRandom(event: Random): void {
  console.log('handleRandom')
  console.log(event.params.caller.toHex())
  let test = new Test(event.params.caller.toHex())
  test.save()
}

export function handleDaoCreated(event: DaoCreated): void {
  console.log('handleDaoCreated')
  console.log(event.params.dao.toHex())
  let dao = new Dao(event.params.dao.toHex())
  dao.author = event.params.caller
  dao.address = event.params.dao
  dao.createdAt = event.block.timestamp
  dao.title = event.params.title
  dao.textIpfsHash = event.params.textIpfsHash
  dao.firstEditionMax = event.params.firstEditionAmount
  dao.mintPrice = event.params.initialMintPrice
  dao.fundingEnded = false
  dao.save()
}

export function handleDeposited(event: Deposited):void {
  console.log('handleDeposited')
  console.log(event.address.toHexString())
  let dao = Dao.load(event.address.toHexString())
  console.log(event.address.toHexString())
  console.log(event.params.fundedAmount.toHex())
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

export function handleImgHashSet(event: ImgSet): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.imgIpfsHash = event.params.imgHash
  dao.save()
}

export function handleBlurbHashSet(event: BlurbSet): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.blurbIpfsHash = event.params.blurbHash
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

export function handleTextSet(event: TextSet): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  dao.textIpfsHash = event.params.textHash
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
