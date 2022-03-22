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

export class Dao extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("author", Value.fromBytes(Bytes.empty()));
    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("createdAt", Value.fromBigInt(BigInt.zero()));
    this.set("title", Value.fromString(""));
    this.set("ipfsLink", Value.fromString(""));
    this.set("fundingEnded", Value.fromBoolean(false));
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

  get ipfsLink(): string {
    let value = this.get("ipfsLink");
    return value!.toString();
  }

  set ipfsLink(value: string) {
    this.set("ipfsLink", Value.fromString(value));
  }

  get fundingEnded(): boolean {
    let value = this.get("fundingEnded");
    return value!.toBoolean();
  }

  set fundingEnded(value: boolean) {
    this.set("fundingEnded", Value.fromBoolean(value));
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

  get contribution(): Array<string> | null {
    let value = this.get("contribution");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set contribution(value: Array<string> | null) {
    if (!value) {
      this.unset("contribution");
    } else {
      this.set("contribution", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Contribution extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("address", Value.fromBytes(Bytes.empty()));
    this.set("share", Value.fromBigInt(BigInt.zero()));
    this.set("dao", Value.fromBytes(Bytes.empty()));
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

  get dao(): Bytes {
    let value = this.get("dao");
    return value!.toBytes();
  }

  set dao(value: Bytes) {
    this.set("dao", Value.fromBytes(value));
  }
}
