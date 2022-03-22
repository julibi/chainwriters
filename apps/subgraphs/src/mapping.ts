import { DaoInstantiated } from "../generated/MoonlitFactory/MoonlitFactory"
import { FundingEnded, GenreSet, SubtitleSet, URISet, ContributorAdded } from "../generated/templates/MoonlitDao/MoonlitDao"
import { Contributor, Dao } from "../generated/schema"

export function handleDaoInstantiated(event: DaoInstantiated): void {
  let dao = new Dao(event.params.dao.toHex())
  dao.author = event.params.caller
  dao.address = event.params.dao
  dao.createdAt = event.block.timestamp
  dao.title = event.params.title
  dao.ipfsLink = event.params.ipfsLink
  dao.fundingEnded = false
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


// change this. just save the contributor and its project in one and in dao filter for contributions of a project
export function handleContributorAdded(event: ContributorAdded): void {
  let dao = Dao.load(event.address.toHexString())
  if (!dao) return
  let contributor = new Contributor(event.params.contributor.toHex() + "-" + event.transaction.hash.toHex() + "-" + event.logIndex.toString())
  contributor.address = event.params.contributor
  contributor.share = event.params.share
  contributor.role = ""
  // if (dao.contributors) {
  //   const index = dao.contributors.length
  //   dao.contributors[index] = contributor
  // } else {
  //   dao.contributors = [contributor]
  // }
  // dao.save()
}
