import { log } from '@graphprotocol/graph-ts';
import { BigInt } from '@graphprotocol/graph-ts';
import {
  AdminChanged,
  Paused,
  ProjectCreated,
  Received,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Unpaused,
  Upgraded,
} from '../generated/MoonpageFactory/MoonpageFactory';
import { Project } from '../generated/schema';

export function handleAdminChanged(event: AdminChanged): void {
  // // Entities can be loaded from the store using a string ID; this ID
  // // needs to be unique across all entities of the same type
  // let entity = ExampleEntity.load(event.transaction.from.toHex());
  // // Entities only exist after they have been saved to the store;
  // // `null` checks allow to create entities on demand
  // if (!entity) {
  //   entity = new ExampleEntity(event.transaction.from.toHex());
  //   // Entity fields can be set using simple assignments
  //   entity.count = BigInt.fromI32(0);
  // }
  // // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1);
  // // Entity fields can be set based on event parameters
  // entity.previousAdmin = event.params.previousAdmin;
  // entity.newAdmin = event.params.newAdmin;
  // // Entities can be written to the store with `.save()`
  // entity.save();
}

export function handlePaused(event: Paused): void {}

export function handleProjectCreated(event: ProjectCreated): void {
  let project = new Project(event.params.projectId.toHexString());
  project.creator = event.params.creator;
  project.royaltiesSplitter = event.params.royaltiesSplitter;
  project.createdAt = event.block.timestamp;
  project.title = event.params.title;
  project.textIpfsHash = event.params.textIpfsHash;
  project.auctionsStarted = false;
  project.auctionsEnded = false;
  project.save();
}

export function handleReceived(event: Received): void {}

export function handleRoleAdminChanged(event: RoleAdminChanged): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}

export function handleUnpaused(event: Unpaused): void {}

export function handleUpgraded(event: Upgraded): void {}
