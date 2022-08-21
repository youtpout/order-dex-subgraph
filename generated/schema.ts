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

export class Order extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Order entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Order must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Order", id.toString(), this);
    }
  }

  static load(id: string): Order | null {
    return changetype<Order | null>(store.get("Order", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get status(): i32 {
    let value = this.get("status");
    return value!.toI32();
  }

  set status(value: i32) {
    this.set("status", Value.fromI32(value));
  }

  get feeAmount(): BigInt {
    let value = this.get("feeAmount");
    return value!.toBigInt();
  }

  set feeAmount(value: BigInt) {
    this.set("feeAmount", Value.fromBigInt(value));
  }

  get amountToSell(): BigInt {
    let value = this.get("amountToSell");
    return value!.toBigInt();
  }

  set amountToSell(value: BigInt) {
    this.set("amountToSell", Value.fromBigInt(value));
  }

  get amountToBuy(): BigInt {
    let value = this.get("amountToBuy");
    return value!.toBigInt();
  }

  set amountToBuy(value: BigInt) {
    this.set("amountToBuy", Value.fromBigInt(value));
  }

  get amountToSellCompleted(): BigInt {
    let value = this.get("amountToSellCompleted");
    return value!.toBigInt();
  }

  set amountToSellCompleted(value: BigInt) {
    this.set("amountToSellCompleted", Value.fromBigInt(value));
  }

  get amountToBuyCompleted(): BigInt {
    let value = this.get("amountToBuyCompleted");
    return value!.toBigInt();
  }

  set amountToBuyCompleted(value: BigInt) {
    this.set("amountToBuyCompleted", Value.fromBigInt(value));
  }

  get trader(): Bytes {
    let value = this.get("trader");
    return value!.toBytes();
  }

  set trader(value: Bytes) {
    this.set("trader", Value.fromBytes(value));
  }

  get tokenToSell(): Bytes {
    let value = this.get("tokenToSell");
    return value!.toBytes();
  }

  set tokenToSell(value: Bytes) {
    this.set("tokenToSell", Value.fromBytes(value));
  }

  get tokenToBuy(): Bytes {
    let value = this.get("tokenToBuy");
    return value!.toBytes();
  }

  set tokenToBuy(value: Bytes) {
    this.set("tokenToBuy", Value.fromBytes(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get fromETH(): boolean {
    let value = this.get("fromETH");
    return value!.toBoolean();
  }

  set fromETH(value: boolean) {
    this.set("fromETH", Value.fromBoolean(value));
  }

  get toETH(): boolean {
    let value = this.get("toETH");
    return value!.toBoolean();
  }

  set toETH(value: boolean) {
    this.set("toETH", Value.fromBoolean(value));
  }
}

export class Counter extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Counter entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Counter must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Counter", id.toString(), this);
    }
  }

  static load(id: string): Counter | null {
    return changetype<Counter | null>(store.get("Counter", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get all(): BigInt {
    let value = this.get("all");
    return value!.toBigInt();
  }

  set all(value: BigInt) {
    this.set("all", Value.fromBigInt(value));
  }

  get active(): BigInt {
    let value = this.get("active");
    return value!.toBigInt();
  }

  set active(value: BigInt) {
    this.set("active", Value.fromBigInt(value));
  }

  get sold(): BigInt {
    let value = this.get("sold");
    return value!.toBigInt();
  }

  set sold(value: BigInt) {
    this.set("sold", Value.fromBigInt(value));
  }

  get canceled(): BigInt {
    let value = this.get("canceled");
    return value!.toBigInt();
  }

  set canceled(value: BigInt) {
    this.set("canceled", Value.fromBigInt(value));
  }

  get soldAndCanceled(): BigInt {
    let value = this.get("soldAndCanceled");
    return value!.toBigInt();
  }

  set soldAndCanceled(value: BigInt) {
    this.set("soldAndCanceled", Value.fromBigInt(value));
  }
}

export class Pair extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pair entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pair must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pair", id.toString(), this);
    }
  }

  static load(id: string): Pair | null {
    return changetype<Pair | null>(store.get("Pair", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenSell(): Bytes {
    let value = this.get("tokenSell");
    return value!.toBytes();
  }

  set tokenSell(value: Bytes) {
    this.set("tokenSell", Value.fromBytes(value));
  }

  get tokenBuy(): Bytes {
    let value = this.get("tokenBuy");
    return value!.toBytes();
  }

  set tokenBuy(value: Bytes) {
    this.set("tokenBuy", Value.fromBytes(value));
  }

  get buy(): Array<string> {
    let value = this.get("buy");
    return value!.toStringArray();
  }

  set buy(value: Array<string>) {
    this.set("buy", Value.fromStringArray(value));
  }

  get sold(): Array<string> {
    let value = this.get("sold");
    return value!.toStringArray();
  }

  set sold(value: Array<string>) {
    this.set("sold", Value.fromStringArray(value));
  }
}

export class PairPrice extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PairPrice entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PairPrice must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PairPrice", id.toString(), this);
    }
  }

  static load(id: string): PairPrice | null {
    return changetype<PairPrice | null>(store.get("PairPrice", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get pair(): string {
    let value = this.get("pair");
    return value!.toString();
  }

  set pair(value: string) {
    this.set("pair", Value.fromString(value));
  }

  get reverse(): boolean {
    let value = this.get("reverse");
    return value!.toBoolean();
  }

  set reverse(value: boolean) {
    this.set("reverse", Value.fromBoolean(value));
  }
}