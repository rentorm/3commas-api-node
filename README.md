# 3commas API NodeJs wrapper

NodeJS wrapper for [Official 3commas API](https://github.com/3commas-io/3commas-official-api-docs/) 

[3commas.io](https://3commas.io/?c=3cnode) is collection of smart tools for cryptocurrency traders and investors to minimize risks, limit losses, grow profits, and manage their trades and portfolios across multiple exchanges.

---

## How to use

### Set up

Add node module using npm or yarn

```bash
npm i 3commas-api-node
```

or 

```bash
yarn add 3commas-api-node
```

### Using in your project

add module to your script and provide API credentials

```js
const threeCommasAPI = require('3commas-api-node')

const api = new threeCommasAPI({
  apiKey: '',
  apiSecret: '',
  // url: 'https://api.3commas.io' // this is optional in case of defining other endpoint
  // forcedMode: 'real' // this is optional in case of defining account mode, 'real' or 'paper'

})
```

see `example.js` for more details 

## Current methods

### for deals

```
 getDeals (params)
 
 dealUpdateMaxSafetyOrders (deal_id, max_safety_orders)
 
 dealPanicSell (deal_id)
 
 dealCancel (deal_id)
 
 dealUpdateTp (deal_id, new_take_profit_percentage)
 
 getDeal (deal_id)

 getDealSafetyOrders (deal_id)

```

### for bots

```
  getBotsBlackList ()
  
  botsUpdateBlackList (params)
  
  botCreate (params)
  
  getBots (params)
  
  getBotsStats (params)
  
  botUpdate (params)
  
  botDisable (bot_id)
  
  botEnable (bot_id)
  
  botStartNewDeal (params)
  
  botDelete (bot_id)
  
  botPaniceSellAllDeals (bot_id)
  
  botCancelAllDeals (bot_id)
  
  botShow (bot_id)
```

### for smart trades

```
  smartTradesCreateSimpleSell (params)

  smartTradesCreateSimpleBuy (params)
  
  smartTradesCreateSmartSell (params)
  
  smartTradesCreateSmartCover (params)
  
  smartTradesCreateSmartTrade (params)
  
  smartTrades ()
  
  smartTradesStepPanicSell (params)
  
  smartTradesUpdate (params)
  
  smartTradesCancel (smart_trade_id)
  
  smartTradesPanicSell (smart_trade_id)
  
  smartTradesForceProcess (smart_trade_id)
```

### for accounts

```
  accountsNew (params)

  accounts ()
  
  accountsMarketList ()
  
  accountsCurrencyRates ()
  
  accountSellAllToUsd (account_id)
  
  accountSellAllToBtc (account_id)
  
  accountLoadBalances (account_id)
  
  accountRename (params)
  
  accountPieChartData (account_id)
  
  accountTableData (account_id)
  
  accountRemove (account_id)
```

---

buy me a beer 🍺

BTC: 37N2MSShWExJGsKuAvBs9GEteUTrhZyvCi

ETH: 0x9F5e35e7DCa77A6Ec7a307213C5F65bc6d010088
