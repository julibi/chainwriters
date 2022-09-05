// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Edition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Edition entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Edition entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Edition", id.toString(), this);
    }
  }

  static load(id: string): Edition | null {
    return changetype<Edition | null>(store.get("Edition", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get project(): string {
    let value = this.get("project");
    return value!.toString();
  }

  set project(value: string) {
    this.set("project", Value.fromString(value));
  }

  get edition(): BigInt {
    let value = this.get("edition");
    return value!.toBigInt();
  }

  set edition(value: BigInt) {
    this.set("edition", Value.fromBigInt(value));
  }

  get startId(): BigInt | null {
    let value = this.get("startId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set startId(value: BigInt | null) {
    if (!value) {
      this.unset("startId");
    } else {
      this.set("startId", Value.fromBigInt(<BigInt>value));
    }
  }

  get endId(): BigInt | null {
    let value = this.get("endId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set endId(value: BigInt | null) {
    if (!value) {
      this.unset("endId");
    } else {
      this.set("endId", Value.fromBigInt(<BigInt>value));
    }
  }

  get mintPrice(): BigInt | null {
    let value = this.get("mintPrice");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set mintPrice(value: BigInt | null) {
    if (!value) {
      this.unset("mintPrice");
    } else {
      this.set("mintPrice", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class Contributor extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contributor entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Contributor entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Contributor", id.toString(), this);
    }
  }

  static load(id: string): Contributor | null {
    return changetype<Contributor | null>(store.get("Contributor", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get project(): string {
    let value = this.get("project");
    return value!.toString();
  }

  set project(value: string) {
    this.set("project", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get role(): string | null {
    let value = this.get("role");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set role(value: string | null) {
    if (!value) {
      this.unset("role");
    } else {
      this.set("role", Value.fromString(<string>value));
    }
  }

  get sharePercentage(): BigInt {
    let value = this.get("sharePercentage");
    return value!.toBigInt();
  }

  set sharePercentage(value: BigInt) {
    this.set("sharePercentage", Value.fromBigInt(value));
  }
}

export class Mint extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Mint entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Mint entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Mint", id.toString(), this);
    }
  }

  static load(id: string): Mint | null {
    return changetype<Mint | null>(store.get("Mint", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get project(): string {
    let value = this.get("project");
    return value!.toString();
  }

  set project(value: string) {
    this.set("project", Value.fromString(value));
  }

  get edition(): BigInt {
    let value = this.get("edition");
    return value!.toBigInt();
  }

  set edition(value: BigInt) {
    this.set("edition", Value.fromBigInt(value));
  }

  get receiver(): Bytes {
    let value = this.get("receiver");
    return value!.toBytes();
  }

  set receiver(value: Bytes) {
    this.set("receiver", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }
}

export class Project extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Project entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Project entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Project", id.toString(), this);
    }
  }

  static load(id: string): Project | null {
    return changetype<Project | null>(store.get("Project", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value!.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get royaltiesSplitter(): Bytes {
    let value = this.get("royaltiesSplitter");
    return value!.toBytes();
  }

  set royaltiesSplitter(value: Bytes) {
    this.set("royaltiesSplitter", Value.fromBytes(value));
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    return value!.toBigInt();
  }

  set createdAt(value: BigInt) {
    this.set("createdAt", Value.fromBigInt(value));
  }

  get title(): string {
    let value = this.get("title");
    return value!.toString();
  }

  set title(value: string) {
    this.set("title", Value.fromString(value));
  }

  get textIpfsHash(): string {
    let value = this.get("textIpfsHash");
    return value!.toString();
  }

  set textIpfsHash(value: string) {
    this.set("textIpfsHash", Value.fromString(value));
  }

  get imgIpfsHash(): string | null {
    let value = this.get("imgIpfsHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set imgIpfsHash(value: string | null) {
    if (!value) {
      this.unset("imgIpfsHash");
    } else {
      this.set("imgIpfsHash", Value.fromString(<string>value));
    }
  }

  get animationIpfsHash(): string | null {
    let value = this.get("animationIpfsHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set animationIpfsHash(value: string | null) {
    if (!value) {
      this.unset("animationIpfsHash");
    } else {
      this.set("animationIpfsHash", Value.fromString(<string>value));
    }
  }

  get blurbIpfsHash(): string | null {
    let value = this.get("blurbIpfsHash");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set blurbIpfsHash(value: string | null) {
    if (!value) {
      this.unset("blurbIpfsHash");
    } else {
      this.set("blurbIpfsHash", Value.fromString(<string>value));
    }
  }

  get initialMintPrice(): BigInt {
    let value = this.get("initialMintPrice");
    return value!.toBigInt();
  }

  set initialMintPrice(value: BigInt) {
    this.set("initialMintPrice", Value.fromBigInt(value));
  }

  get firstEditionAmount(): BigInt {
    let value = this.get("firstEditionAmount");
    return value!.toBigInt();
  }

  set firstEditionAmount(value: BigInt) {
    this.set("firstEditionAmount", Value.fromBigInt(value));
  }

  get originalLanguage(): string | null {
    let value = this.get("originalLanguage");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set originalLanguage(value: string | null) {
    if (!value) {
      this.unset("originalLanguage");
    } else {
      this.set("originalLanguage", Value.fromString(<string>value));
    }
  }

  get subtitle(): string | null {
    let value = this.get("subtitle");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set subtitle(value: string | null) {
    if (!value) {
      this.unset("subtitle");
    } else {
      this.set("subtitle", Value.fromString(<string>value));
    }
  }

  get genre(): string | null {
    let value = this.get("genre");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set genre(value: string | null) {
    if (!value) {
      this.unset("genre");
    } else {
      this.set("genre", Value.fromString(<string>value));
    }
  }

  get auctionsStarted(): boolean {
    let value = this.get("auctionsStarted");
    return value!.toBoolean();
  }

  set auctionsStarted(value: boolean) {
    this.set("auctionsStarted", Value.fromBoolean(value));
  }

  get auctionsEnded(): boolean {
    let value = this.get("auctionsEnded");
    return value!.toBoolean();
  }

  set auctionsEnded(value: boolean) {
    this.set("auctionsEnded", Value.fromBoolean(value));
  }

  get startId(): BigInt | null {
    let value = this.get("startId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set startId(value: BigInt | null) {
    if (!value) {
      this.unset("startId");
    } else {
      this.set("startId", Value.fromBigInt(<BigInt>value));
    }
  }

  get endId(): BigInt | null {
    let value = this.get("endId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set endId(value: BigInt | null) {
    if (!value) {
      this.unset("endId");
    } else {
      this.set("endId", Value.fromBigInt(<BigInt>value));
    }
  }

  get currentId(): BigInt {
    let value = this.get("currentId");
    return value!.toBigInt();
  }

  set currentId(value: BigInt) {
    this.set("currentId", Value.fromBigInt(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value!.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get isCurated(): boolean {
    let value = this.get("isCurated");
    return value!.toBoolean();
  }

  set isCurated(value: boolean) {
    this.set("isCurated", Value.fromBoolean(value));
  }

  get isFrozen(): boolean {
    let value = this.get("isFrozen");
    return value!.toBoolean();
  }

  set isFrozen(value: boolean) {
    this.set("isFrozen", Value.fromBoolean(value));
  }

  get isPaused(): boolean {
    let value = this.get("isPaused");
    return value!.toBoolean();
  }

  set isPaused(value: boolean) {
    this.set("isPaused", Value.fromBoolean(value));
  }

  get premintedByAuthor(): BigInt | null {
    let value = this.get("premintedByAuthor");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set premintedByAuthor(value: BigInt | null) {
    if (!value) {
      this.unset("premintedByAuthor");
    } else {
      this.set("premintedByAuthor", Value.fromBigInt(<BigInt>value));
    }
  }

  get mintCount(): BigInt {
    let value = this.get("mintCount");
    return value!.toBigInt();
  }

  set mintCount(value: BigInt) {
    this.set("mintCount", Value.fromBigInt(value));
  }

  get currentAuctionExpiresAt(): BigInt | null {
    let value = this.get("currentAuctionExpiresAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set currentAuctionExpiresAt(value: BigInt | null) {
    if (!value) {
      this.unset("currentAuctionExpiresAt");
    } else {
      this.set("currentAuctionExpiresAt", Value.fromBigInt(<BigInt>value));
    }
  }

  get minted(): Array<string> | null {
    let value = this.get("minted");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set minted(value: Array<string> | null) {
    if (!value) {
      this.unset("minted");
    } else {
      this.set("minted", Value.fromStringArray(<Array<string>>value));
    }
  }

  get contributors(): Array<string> | null {
    let value = this.get("contributors");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set contributors(value: Array<string> | null) {
    if (!value) {
      this.unset("contributors");
    } else {
      this.set("contributors", Value.fromStringArray(<Array<string>>value));
    }
  }

  get editions(): Array<string> | null {
    let value = this.get("editions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set editions(value: Array<string> | null) {
    if (!value) {
      this.unset("editions");
    } else {
      this.set("editions", Value.fromStringArray(<Array<string>>value));
    }
  }
}
