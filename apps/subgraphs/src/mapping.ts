import { DaoInstantiated } from "../generated/MoonlitFactory/MoonlitFactory"
import { Dao } from "../generated/schema"

export function handleDaoInstantiated(event: DaoInstantiated): void {
  let dao = new Dao(event.params.dao.toHex())
  dao.author = event.params.caller
  dao.address = event.params.dao
  dao.title = event.params.title
  dao.ipfsLink = event.params.ipfsLink
  dao.initialMintPrice = event.params.initialMintPrice
  dao.firstEditionAmount = event.params.firstEditionAmount
  dao.save()
}
