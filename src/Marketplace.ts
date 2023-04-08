import { Address, bigInt, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
    BuyItem,
    ListItem,
} from "../generated/Marketplace/Marketplace"
import { Items, ListHistory, BuyHistory } from "../generated/schema"
import { ZeroAddress } from "./common"

export function handleListItem(event: ListItem): void {
    const listId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let listHistory = ListHistory.load(listId)
    if(!listHistory) {
        listHistory = new ListHistory(listId)
        listHistory.index = event.params.index
        listHistory.category = event.params.category
        listHistory.imgHash = event.params.imgHash
        listHistory.count = event.params.count
        listHistory.priceForBBOSS = event.params.priceForBBOSS
        listHistory.priceForUSD = event.params.priceForUSD
        listHistory.createdAt = event.block.timestamp
        listHistory.save()
    }

    
    const itemId = event.params.index.toString()
    let item = Items.load(itemId)
    if(!item) {
        item = new Items(itemId)
        item.index = event.params.index
        item.category = event.params.category
        item.imgHash = event.params.imgHash
        item.count = event.params.count
        item.priceForBBOSS = event.params.priceForBBOSS
        item.priceForUSD = event.params.priceForUSD
        item.createdAt = event.block.timestamp
    }
    item.count = item.count.plus(event.params.count)
    item.save()
}

export function handleBuyItem(event: BuyItem): void {
    const buyId = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let buyHistory = BuyHistory.load(buyId)
    if(!buyHistory) {
        buyHistory = new BuyHistory(buyId)
        buyHistory.buyer = event.params.buyer
        buyHistory.index = event.params.index
        buyHistory.count = event.params.count
        buyHistory.payMethod = event.params.payMethod
        buyHistory.paidAmount = event.params.paidAmount
        buyHistory.email = event.params.email
        buyHistory.createdAt = event.block.timestamp
        buyHistory.save()
    }

    
    const itemId = event.params.index.toString()
    let item = Items.load(itemId)
    if(item) {
        if(item.count >= event.params.count) {
            item.count = item.count.minus(event.params.count)
        } else {
            item.count = BigInt.fromString("0")
        }
        item.save()
    }
}
    