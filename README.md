# 3commas API NodeJs wrapper

NodeJS wrapper for [Official 3commas API](https://github.com/3commas-io/3commas-official-api-docs/) 

⚠️ Currently work in progress ⚠️

[3commas.io](https://3commas.io/?c=3cnode) is collection of smart tools for cryptocurrency traders and investors to minimize risks, limit losses, grow profits, and manage their trades and portfolios across multiple exchanges.

---

## How to use

### Set up

Add node module using npm or yarn

```bash
npm install --save https://github.com/rentorm/3commas-api-node/tarball/master
```

or 

```bash
yarn add https://github.com/rentorm/3commas-api-node/tarball/master
```

### Using in your project

add module import to your script and provide API credentials

```js
const threeCommasAPI = require('3commas-api-node')

const api = new threeCommasAPI({
  apiKey: '',
  apiSecret: ''
})
```

see `example.js` for more details 

## To do

- [x] add deals endpoints
- [ ] add bots endpoints
- [ ] add smart trades endpoints
- [ ] add accounts endpoints

---

by me a beer 🍺

BTC: 37N2MSShWExJGsKuAvBs9GEteUTrhZyvCi
ETH: 0x9F5e35e7DCa77A6Ec7a307213C5F65bc6d010088
