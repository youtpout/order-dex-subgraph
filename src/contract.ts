import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  Contract,
  OrderAdded,
  OrderAddedOrderInfoStruct,
  OrderCanceled,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Sold
} from "../generated/Contract/Contract"
import { Order, Counter, Pair, PairPrice } from "../generated/schema"

export function handleOrderAdded(event: OrderAdded): void {
  let entity = new Order(event.params.id.toHex());
  // Entity fields can be set based on event parameters

  let orderInfo = event.params.orderInfo;
  let price = orderInfo.amountToBuy.div(orderInfo.amountToSell);
  let priceInverted = orderInfo.amountToBuy.div(orderInfo.amountToSell);


  updateCount("0x0", entity.status);
  updateCount("seller_" + event.params.trader.toHex(), entity.status);
  updateCount("pair_" + orderInfo.tokenToSell.toHex() + "_" + orderInfo.tokenToBuy.toHex(), entity.status);
  updateAmount(orderInfo.tokenToSell, orderInfo.tokenToBuy, price, orderInfo.amountToSell, false);
  updateAmount(orderInfo.tokenToBuy, orderInfo.tokenToSell, priceInverted, orderInfo.amountToBuy, true);

  // Entities can be written to the store with `.save()`
  entity.save();
}


function updateCount(id: string, status: i32): void {
  let entity = Counter.load(id);
  if (entity == null) {
    entity = new Counter(id);
  }
  switch (status) {
    case 0:
      entity.active = entity.active.plus(BigInt.fromI32(1));
      entity.all = entity.all.plus(BigInt.fromI32(1));
      break;
    case 1:
      entity.active = entity.active.minus(BigInt.fromI32(1));
      entity.canceled = entity.canceled.plus(BigInt.fromI32(1));
      break;
    case 2:
      entity.active = entity.active.minus(BigInt.fromI32(1));
      entity.sold = entity.sold.plus(BigInt.fromI32(1));
      break;
    case 3:
      entity.active = entity.active.minus(BigInt.fromI32(1));
      entity.soldAndCanceled = entity.soldAndCanceled.plus(BigInt.fromI32(1));
      break;
  }
  entity.save();
}


function updateAmount(tokenToSell: Bytes, tokenToBuy: Bytes, price: BigInt, amount: BigInt, reverse: boolean): void {

  let id = "pair_" + tokenToSell.toHex() + "_" + tokenToBuy.toHex();
  let entity = Pair.load(id);
  if (entity == null) {
    entity = new Pair(id);
    entity.tokenBuy = tokenToBuy;
    entity.tokenSell = tokenToSell;
  }

  let ppId = id + "_" + price.toHex();
  let pp = PairPrice.load(ppId);
  if (pp == null) {
    pp = new PairPrice(ppId);
    pp.price = price;
    pp.pair = id;
    pp.reverse = reverse;
  }

  if (reverse) {
    let sold = entity.sold;
    if (sold.indexOf(ppId) === -1) {
      sold.push(ppId);
    }
    entity.sold = sold;
  } else {
    let buy = entity.buy;
    if (buy.indexOf(ppId) === -1) {
      buy.push(ppId);
    }
    entity.buy = buy;
  }

  pp.amount = pp.amount.plus(amount);

  entity.save();
  pp.save();
}

export function handleOrderCanceled(event: OrderCanceled): void {

}

export function handleSold(event: Sold): void {

}
