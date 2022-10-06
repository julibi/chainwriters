// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AuctionsEnded extends ethereum.Event {
  get params(): AuctionsEnded__Params {
    return new AuctionsEnded__Params(this);
  }
}

export class AuctionsEnded__Params {
  _event: AuctionsEnded;

  constructor(event: AuctionsEnded) {
    this._event = event;
  }

  get projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get time(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class AuctionsStarted extends ethereum.Event {
  get params(): AuctionsStarted__Params {
    return new AuctionsStarted__Params(this);
  }
}

export class AuctionsStarted__Params {
  _event: AuctionsStarted;

  constructor(event: AuctionsStarted) {
    this._event = event;
  }

  get projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get time(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ExpirationSet extends ethereum.Event {
  get params(): ExpirationSet__Params {
    return new ExpirationSet__Params(this);
  }
}

export class ExpirationSet__Params {
  _event: ExpirationSet;

  constructor(event: ExpirationSet) {
    this._event = event;
  }

  get projectId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get expirationTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class RoleAdminChanged extends ethereum.Event {
  get params(): RoleAdminChanged__Params {
    return new RoleAdminChanged__Params(this);
  }
}

export class RoleAdminChanged__Params {
  _event: RoleAdminChanged;

  constructor(event: RoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RoleGranted extends ethereum.Event {
  get params(): RoleGranted__Params {
    return new RoleGranted__Params(this);
  }
}

export class RoleGranted__Params {
  _event: RoleGranted;

  constructor(event: RoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleRevoked extends ethereum.Event {
  get params(): RoleRevoked__Params {
    return new RoleRevoked__Params(this);
  }
}

export class RoleRevoked__Params {
  _event: RoleRevoked;

  constructor(event: RoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AuctionsManager__auctionsResult {
  value0: boolean;
  value1: Address;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: boolean;
  value6: boolean;

  constructor(
    value0: boolean,
    value1: Address,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: boolean,
    value6: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromBoolean(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    return map;
  }
}

export class AuctionsManager__readAuctionSettingsResult {
  value0: boolean;
  value1: Address;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: boolean;
  value6: boolean;

  constructor(
    value0: boolean,
    value1: Address,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: boolean,
    value6: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromBoolean(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    return map;
  }
}

export class AuctionsManager extends ethereum.SmartContract {
  static bind(address: Address): AuctionsManager {
    return new AuctionsManager("AuctionsManager", address);
  }

  AUCTION_DURATION(): BigInt {
    let result = super.call(
      "AUCTION_DURATION",
      "AUCTION_DURATION():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_AUCTION_DURATION(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "AUCTION_DURATION",
      "AUCTION_DURATION():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  PAUSER_ROLE(): Bytes {
    let result = super.call("PAUSER_ROLE", "PAUSER_ROLE():(bytes32)", []);

    return result[0].toBytes();
  }

  try_PAUSER_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("PAUSER_ROLE", "PAUSER_ROLE():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  UPGRADER_ROLE(): Bytes {
    let result = super.call("UPGRADER_ROLE", "UPGRADER_ROLE():(bytes32)", []);

    return result[0].toBytes();
  }

  try_UPGRADER_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "UPGRADER_ROLE",
      "UPGRADER_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  auctions(param0: BigInt): AuctionsManager__auctionsResult {
    let result = super.call(
      "auctions",
      "auctions(uint256):(bool,address,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new AuctionsManager__auctionsResult(
      result[0].toBoolean(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBoolean(),
      result[6].toBoolean()
    );
  }

  try_auctions(
    param0: BigInt
  ): ethereum.CallResult<AuctionsManager__auctionsResult> {
    let result = super.tryCall(
      "auctions",
      "auctions(uint256):(bool,address,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new AuctionsManager__auctionsResult(
        value[0].toBoolean(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBoolean(),
        value[6].toBoolean()
      )
    );
  }

  getPrice(_projectId: BigInt, _startPrice: BigInt): BigInt {
    let result = super.call("getPrice", "getPrice(uint256,uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_projectId),
      ethereum.Value.fromUnsignedBigInt(_startPrice)
    ]);

    return result[0].toBigInt();
  }

  try_getPrice(
    _projectId: BigInt,
    _startPrice: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getPrice",
      "getPrice(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_projectId),
        ethereum.Value.fromUnsignedBigInt(_startPrice)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  moonpageCollection(): Address {
    let result = super.call(
      "moonpageCollection",
      "moonpageCollection():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_moonpageCollection(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "moonpageCollection",
      "moonpageCollection():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  moonpageFactory(): Address {
    let result = super.call(
      "moonpageFactory",
      "moonpageFactory():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_moonpageFactory(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "moonpageFactory",
      "moonpageFactory():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  moonpageManager(): Address {
    let result = super.call(
      "moonpageManager",
      "moonpageManager():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_moonpageManager(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "moonpageManager",
      "moonpageManager():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  readAuctionSettings(
    _projectId: BigInt
  ): AuctionsManager__readAuctionSettingsResult {
    let result = super.call(
      "readAuctionSettings",
      "readAuctionSettings(uint256):(bool,address,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );

    return new AuctionsManager__readAuctionSettingsResult(
      result[0].toBoolean(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBoolean(),
      result[6].toBoolean()
    );
  }

  try_readAuctionSettings(
    _projectId: BigInt
  ): ethereum.CallResult<AuctionsManager__readAuctionSettingsResult> {
    let result = super.tryCall(
      "readAuctionSettings",
      "readAuctionSettings(uint256):(bool,address,uint256,uint256,uint256,bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(_projectId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new AuctionsManager__readAuctionSettingsResult(
        value[0].toBoolean(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBoolean(),
        value[6].toBoolean()
      )
    );
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class EmergencyWithdrawCall extends ethereum.Call {
  get inputs(): EmergencyWithdrawCall__Inputs {
    return new EmergencyWithdrawCall__Inputs(this);
  }

  get outputs(): EmergencyWithdrawCall__Outputs {
    return new EmergencyWithdrawCall__Outputs(this);
  }
}

export class EmergencyWithdrawCall__Inputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }

  get _to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class EmergencyWithdrawCall__Outputs {
  _call: EmergencyWithdrawCall;

  constructor(call: EmergencyWithdrawCall) {
    this._call = call;
  }
}

export class EndAuctionsCall extends ethereum.Call {
  get inputs(): EndAuctionsCall__Inputs {
    return new EndAuctionsCall__Inputs(this);
  }

  get outputs(): EndAuctionsCall__Outputs {
    return new EndAuctionsCall__Outputs(this);
  }
}

export class EndAuctionsCall__Inputs {
  _call: EndAuctionsCall;

  constructor(call: EndAuctionsCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class EndAuctionsCall__Outputs {
  _call: EndAuctionsCall;

  constructor(call: EndAuctionsCall) {
    this._call = call;
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RetriggerAuctionCall extends ethereum.Call {
  get inputs(): RetriggerAuctionCall__Inputs {
    return new RetriggerAuctionCall__Inputs(this);
  }

  get outputs(): RetriggerAuctionCall__Outputs {
    return new RetriggerAuctionCall__Outputs(this);
  }
}

export class RetriggerAuctionCall__Inputs {
  _call: RetriggerAuctionCall;

  constructor(call: RetriggerAuctionCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class RetriggerAuctionCall__Outputs {
  _call: RetriggerAuctionCall;

  constructor(call: RetriggerAuctionCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class SetContractsCall extends ethereum.Call {
  get inputs(): SetContractsCall__Inputs {
    return new SetContractsCall__Inputs(this);
  }

  get outputs(): SetContractsCall__Outputs {
    return new SetContractsCall__Outputs(this);
  }
}

export class SetContractsCall__Inputs {
  _call: SetContractsCall;

  constructor(call: SetContractsCall) {
    this._call = call;
  }

  get _manager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _factory(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _collection(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class SetContractsCall__Outputs {
  _call: SetContractsCall;

  constructor(call: SetContractsCall) {
    this._call = call;
  }
}

export class SetupAuctionsCall extends ethereum.Call {
  get inputs(): SetupAuctionsCall__Inputs {
    return new SetupAuctionsCall__Inputs(this);
  }

  get outputs(): SetupAuctionsCall__Outputs {
    return new SetupAuctionsCall__Outputs(this);
  }
}

export class SetupAuctionsCall__Inputs {
  _call: SetupAuctionsCall;

  constructor(call: SetupAuctionsCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _creatorAddress(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetupAuctionsCall__Outputs {
  _call: SetupAuctionsCall;

  constructor(call: SetupAuctionsCall) {
    this._call = call;
  }
}

export class StartAuctionsCall extends ethereum.Call {
  get inputs(): StartAuctionsCall__Inputs {
    return new StartAuctionsCall__Inputs(this);
  }

  get outputs(): StartAuctionsCall__Outputs {
    return new StartAuctionsCall__Outputs(this);
  }
}

export class StartAuctionsCall__Inputs {
  _call: StartAuctionsCall;

  constructor(call: StartAuctionsCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _discountRate(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class StartAuctionsCall__Outputs {
  _call: StartAuctionsCall;

  constructor(call: StartAuctionsCall) {
    this._call = call;
  }
}

export class TriggerNextAuctionCall extends ethereum.Call {
  get inputs(): TriggerNextAuctionCall__Inputs {
    return new TriggerNextAuctionCall__Inputs(this);
  }

  get outputs(): TriggerNextAuctionCall__Outputs {
    return new TriggerNextAuctionCall__Outputs(this);
  }
}

export class TriggerNextAuctionCall__Inputs {
  _call: TriggerNextAuctionCall;

  constructor(call: TriggerNextAuctionCall) {
    this._call = call;
  }

  get _projectId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class TriggerNextAuctionCall__Outputs {
  _call: TriggerNextAuctionCall;

  constructor(call: TriggerNextAuctionCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
