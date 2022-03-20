import { DaoInstantiated } from "../generated/MoonlitFactory/MoonlitFactory"
import { Dao } from "../generated/schema"

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
