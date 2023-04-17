import { Address, bigInt, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
    BuyItem,
    ListItem,
} from "../generated/Marketplace/Marketplace"
import { ItemList, ItemHistory, ListHistory, BuyHistory } from "../generated/schema"

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
    listHistory.priceForUSD = event.params.priceForUSD
    listHistory.createdAt = event.block.timestamp

    listHistory.save()
  } 

  const itemId = event.address.toHex() + "-" + event.params.index.toString()
  let item = ItemList.load(itemId)
  if(!item) {
    item = new ItemList(itemId)
    item.index = event.params.index
    item.title = event.params.title
    item.category = event.params.category
    item.imgHash = event.params.imgHash
    item.count = event.params.count
    item.priceForBBOSS = event.params.priceForBBOSS
    item.priceForUSD = event.params.priceForUSD
    item.createdAt = event.block.timestamp
    item.save()
  }

}

export function handleBuyItem(event: BuyItem): void {
    const buyId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let buyHistory = BuyHistory.load(buyId)
    if(!buyHistory) {
        buyHistory = new BuyHistory(buyId)
        buyHistory.buyer = event.params.buyer // !
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
    
  const itemId = event.address.toHex() + "-" + event.params.index.toString()
    let item = ItemList.load(itemId)
    if(item) {
        if(item.count >= event.params.count) {
            item.count = item.count.minus(event.params.count)
        } else {
            item.count = BigInt.fromString("0")
        }
        item.save()
    }
}
    