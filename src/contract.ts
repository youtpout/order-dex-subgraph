import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  OrderAdded,
  OrderAddedOrderInfoStruct,
  OrderCanceled,
  OwnershipTransferred,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Sold,
  OrderDex
} from "../generated/OrderDex/OrderDex"
import { Order, Counter, Pair, PairPrice } from "../generated/schema"

export function handleOrderAdded(event: OrderAdded): void {
  let orderInfo = event.params.orderInfo;

  let entity = new Order(event.params.id.toHex());
  entity.amountToBuy = orderInfo.amountToBuy;
  entity.amountToBuyCompleted = orderInfo.amountToBuyCompleted;
  entity.amountToSell = orderInfo.amountToSell;
  entity.amountToSellCompleted = orderInfo.amountToSellCompleted;
  entity.feeAmount = orderInfo.feeAmount;
  entity.status = orderInfo.status;
  entity.trader = orderInfo.trader;
  entity.tokenToSell = orderInfo.tokenToSell;
  entity.tokenToBuy = orderInfo.tokenToBuy;
  entity.timestamp = orderInfo.timestamp;
  entity.fromETH = orderInfo.fromETH;
  entity.toETH = orderInfo.toETH;
  entity.priceByTokenA = orderInfo.amountToBuy.div(orderInfo.amountToSell);
  entity.priceByTokenB = orderInfo.amountToSell.div(orderInfo.amountToBuy);

  let price = orderInfo.amountToBuy.div(orderInfo.amountToSell);
  let priceInverted = orderInfo.amountToBuy.div(orderInfo.amountToSell);

  updateCount("0x0", entity.status);
  updateCount("seller_" + event.params.trader.toHex(), entity.status);
  updateCount("pair_" + orderInfo.tokenToSell.toHex() + "_" + orderInfo.tokenToBuy.toHex(), entity.status);
  updateAmount(orderInfo.tokenToSell, orderInfo.tokenToBuy, price, orderInfo.amountToSell, false, false);
  updateAmount(orderInfo.tokenToBuy, orderInfo.tokenToSell, priceInverted, orderInfo.amountToBuy, true, false);

  // Entities can be written to the store with `.save()`
  entity.save();
}


function updateCount(id: string, status: i32): void {
  let entity = Counter.load(id);
  if (entity == null) {
    entity = new Counter(id);
    entity.all = BigInt.zero();
    entity.active = BigInt.zero();
    entity.sold = BigInt.zero();
    entity.canceled = BigInt.zero();
    entity.soldAndCanceled = BigInt.zero();
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


function updateAmount(tokenToSell: Bytes, tokenToBuy: Bytes, price: BigInt, amount: BigInt, reverse: boolean, substract: boolean): void {

  let id = "pair_" + tokenToSell.toHex() + "_" + tokenToBuy.toHex();
  let entity = Pair.load(id);
  if (entity == null) {
    entity = new Pair(id);
    entity.tokenBuy = tokenToBuy;
    entity.tokenSell = tokenToSell;
    entity.buy = [];
    entity.sold = [];
  }

  let ppId = id + "_" + price.toHex();
  let pp = PairPrice.load(ppId);
  if (pp == null) {
    pp = new PairPrice(ppId);
    pp.price = price;
    pp.pair = id;
    pp.reverse = reverse;
    pp.amount = BigInt.zero();
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

  if (substract) {
    pp.amount = pp.amount.minus(amount);
  } else {
    pp.amount = pp.amount.plus(amount);
  }

  entity.save();
  pp.save();
}

export function handleOrderCanceled(event: OrderCanceled): void {
  let entity = Order.load(event.params.id.toHex());
  if (entity == null) {
    entity = new Order(event.params.id.toHex());
  }

  let price = entity.amountToBuy.div(entity.amountToSell);
  let priceInverted = entity.amountToBuy.div(entity.amountToSell);
  let amount = entity.amountToSell.minus(entity.amountToSellCompleted);
  let amount2 = entity.amountToBuy.minus(entity.amountToBuyCompleted);

  if (event.params.partiallySold) {
    entity.status = 3;
  } else {
    entity.status = 1;
  }

  updateCount("seller_" + entity.trader.toHex(), entity.status);
  updateCount("pair_" + entity.tokenToSell.toHex() + "_" + entity.tokenToBuy.toHex(), entity.status);

  updateAmount(entity.tokenToSell, entity.tokenToBuy, price, amount, false, true);
  updateAmount(entity.tokenToBuy, entity.tokenToSell, priceInverted, amount2, true, true);

  entity.save();
}

export function handleSold(event: Sold): void {
  let contract = OrderDex.bind(Address.fromString("0xB79aF1F3dD7e25Da902363ef5E220470b9288021"));

  let entity = Order.load(event.params.orderIdA.toHex());
  if (entity == null) {
    entity = new Order(event.params.orderIdA.toHex());
  }

  let orderInfo = contract.orders(event.params.orderIdA);

  let price = entity.amountToBuy.div(entity.amountToSell);
  let priceInverted = entity.amountToBuy.div(entity.amountToSell);
  let amount = event.params.amount;
  let amount2 = orderInfo.getAmountToSellCompleted().minus(entity.amountToSellCompleted);

  entity.amountToBuyCompleted = orderInfo.getAmountToBuyCompleted();
  entity.amountToSellCompleted = orderInfo.getAmountToSellCompleted();

  if (event.params.filled) {
    entity.status = 2;
    updateCount("seller_" + entity.trader.toHex(), entity.status);
    updateCount("pair_" + entity.tokenToSell.toHex() + "_" + entity.tokenToBuy.toHex(), entity.status);
  }


  updateAmount(entity.tokenToSell, entity.tokenToBuy, price, amount, false, true);
  updateAmount(entity.tokenToBuy, entity.tokenToSell, priceInverted, amount2, true, true);

  entity.save();
}
