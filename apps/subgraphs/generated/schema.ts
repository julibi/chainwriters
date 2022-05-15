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

export class Contribution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("share", Value.fromBigInt(BigInt.zero()));
    this.set("dao", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Contribution entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Contribution entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Contribution", id.toString(), this);
    }
  }

  static load(id: string): Contribution | null {
    return changetype<Contribution | null>(store.get("Contribution", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get share(): BigInt {
    let value = this.get("share");
    return value!.toBigInt();
  }

  set share(value: BigInt) {
    this.set("share", Value.fromBigInt(value));
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

  get dao(): string {
    let value = this.get("dao");
    return value!.toString();
  }

  set dao(value: string) {
    this.set("dao", Value.fromString(value));
  }
}

export class Edition extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("totalSupply", Value.fromBigInt(BigInt.zero()));
    this.set("maxSupply", Value.fromBigInt(BigInt.zero()));
    this.set("mintPrice", Value.fromBigInt(BigInt.zero()));
    this.set("dao", Value.fromString(""));
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

  get totalSupply(): BigInt {
    let value = this.get("totalSupply");
    return value!.toBigInt();
  }

  set totalSupply(value: BigInt) {
    this.set("totalSupply", Value.fromBigInt(value));
  }

  get maxSupply(): BigInt {
    let value = this.get("maxSupply");
    return value!.toBigInt();
  }

  set maxSupply(value: BigInt) {
    this.set("maxSupply", Value.fromBigInt(value));
  }

  get mintPrice(): BigInt {
    let value = this.get("mintPrice");
    return value!.toBigInt();
  }

  set mintPrice(value: BigInt) {
    this.set("mintPrice", Value.fromBigInt(value));
  }

  get dao(): string {
    let value = this.get("dao");
    return value!.toString();
  }

  set dao(value: string) {
    this.set("dao", Value.fromString(value));
  }

  get expiresAt(): BigInt | null {
    let value = this.get("expiresAt");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set expiresAt(value: BigInt | null) {
    if (!value) {
      this.unset("expiresAt");
    } else {
      this.set("expiresAt", Value.fromBigInt(<BigInt>value));
    }
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
}

export class Dao extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("author", Value.fromBytes(Bytes.empty()));
    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
    this.set("title", Value.fromString(""));
    this.set("textIpfsHash", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Dao entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Dao entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Dao", id.toString(), this);
    }
  }

  static load(id: string): Dao | null {
    return changetype<Dao | null>(store.get("Dao", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get author(): Bytes {
    let value = this.get("author");
    return value!.toBytes();
  }

  set author(value: Bytes) {
    this.set("author", Value.fromBytes(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value!.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
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

  get paused(): boolean {
    let value = this.get("paused");
    return value!.toBoolean();
  }

  set paused(value: boolean) {
    this.set("paused", Value.fromBoolean(value));
  }

  get contributions(): Array<string> | null {
    let value = this.get("contributions");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set contributions(value: Array<string> | null) {
    if (!value) {
      this.unset("contributions");
    } else {
      this.set("contributions", Value.fromStringArray(<Array<string>>value));
    }
  }
}
