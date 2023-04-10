import { Address, bigInt, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
    BuyItem,
    ListItem,
} from "../generated/Marketplace/Marketplace"
import { ItemLists, ItemHistory, ListHistory, BuyHistory } from "../generated/schema"

export function handleListItem(event: ListItem): void {
  const listId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  let listHistory = ListHistory.load(listId)
  if(!listHistory) {
    listHistory = new ListHistory(listId)
    listHistory.index = event.params.index
    listHistory.title = event.params.title
    listHistory.category = event.params.category
    listHistory.imgHash = event.params.imgHash
    listHistory.count = event.params.count
    listHistory.priceForBBOSS = event.params.priceForBBOSS
    listHistory.priceForMATIC = event.params.priceForMATIC
    listHistory.priceForUSD = event.params.priceForUSD
    listHistory.createdAt = event.block.timestamp

    listHistory.save()
  } 

  // const itemId = event.transaction.hash.toHex() + event.logIndex.toString();
  // let item = ItemHistory.load(itemId)

  // if (!item) {
    // let item = new ItemHistory(itemId)
    // item.index = BigInt.fromString("1")
    // item.category = '1'
    // item.save()
  // }

  // const itemId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  // let item = ItemLists.load(itemId)
  // if(!item) {
  //   item = new ItemLists(itemId)
  //   item.index1 = event.params.index
  //   item.category1 = event.params.category
  //   item.imgHash1 = event.params.imgHash
  //   item.count1 = event.params.count
  //   item.priceForBBOSS1 = event.params.priceForBBOSS
  //   item.priceForUSD1 = event.params.priceForUSD
  //   item.createdAt1 = event.block.timestamp
  //   item.save()
  // }

}

export function handleBuyItem(event: BuyItem): void {
    const buyId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let buyHistory = BuyHistory.load(buyId)
    if(!buyHistory) {
        buyHistory = new BuyHistory(buyId)
        buyHistory.index = event.params.index // !
        buyHistory.count = event.params.count // !
        buyHistory.category = event.params.category;
        buyHistory.title = event.params.title;
        buyHistory.payMethod = event.params.payMethod // !
        buyHistory.paidAmount = event.params.paidAmount // !
        buyHistory.email = event.params.email // !
        buyHistory.createdAt = event.block.timestamp // !
        buyHistory.save()
    }
    
    // const itemId = event.params.index.toString()
    // let item = ItemLists.load(itemId)
    // if(item) {
    //     if(item.count >= event.params.count) {
    //         item.count = item.count1.minus(event.params.count)
    //     } else {
    //         item.count = BigInt.fromString("0")
    //     }
    //     item.save()
    // }
}
    