import { DaoCreated } from "../generated/ProjectFactory/factory"
import { Dao } from "../generated/schema"
import { log } from "@graphprotocol/graph-ts"

export function handleDaoCreated(event: DaoCreated): void {
  log.info('handleDaoCreated', [event.params.dao.toHex()])
  log.debug('handleDaoCreated', [event.params.dao.toHex()])
  let dao = new Dao(event.params.dao.toHex())
  dao.author = event.params.caller
  dao.address = event.params.dao
  dao.createdAt = event.block.timestamp
  dao.title = event.params.title
  dao.textIpfsHash = event.params.textIpfsHash
  dao.firstEditionMax = event.params.firstEditionAmount
  dao.mintPrice = event.params.initialMintPrice
  dao.save()
}

// export function handleDeposited(event: Deposited):void {
//   log.info('handleDeposited', [event.address.toHexString()]);
//   log.debug('handleDeposited', [event.address.toHexString()]);
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   log.info('Dao was loaded!', [event.address.toHexString()]);
//   dao.fundedAmount = event.params.fundedAmount
//   dao.save()
// }


// export function handleFundingEnded(event: FundingEnded): void {
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   dao.fundingEnded = true
//   dao.save()
// }

// export function handleImgHashSet(event: ImgSet): void {
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   dao.imgIpfsHash = event.params.imgHash
//   dao.save()
// }

// export function handleBlurbHashSet(event: BlurbSet): void {
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   dao.blurbIpfsHash = event.params.blurbHash
//   dao.save()
// }

// export function handleGenreSet(event: GenreSet): void {
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   dao.genre = event.params.newGenre
//   dao.save()
// }

// export function handleSubtitleSet(event: SubtitleSet): void {
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   dao.subtitle = event.params.newSubtitle
//   dao.save()
// }

// export function handleTextSet(event: TextSet): void {
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   dao.textIpfsHash = event.params.textHash
//   dao.save()
// }

// export function handleContributorAdded(event: ContributorAdded): void {
//   let dao = Dao.load(event.address.toHexString())
//   if (!dao) return
//   let contribution = new Contribution(event.params.contributor.toHex() + "-" + event.transaction.hash.toHex() + "-" + event.logIndex.toString())
//   contribution.address = event.params.contributor
//   contribution.share = event.params.share
//   contribution.role = ""
//   contribution.dao = event.address
//   contribution.save()
// }
