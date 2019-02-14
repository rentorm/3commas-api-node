const threeCommasAPI = require('3commas-api-node')

const api = new threeCommasAPI({
  apiKey: '',
  apiSecret: ''
})

// get last 20 active deals
const showActiveDeals = async () => {
  let data = await api.getDeals({
    limit: 20,
    scope: 'active',
  })
  console.log(data)
}

showActiveDeals()
