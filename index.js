'use strict'
const querystring = require('querystring');
const crypto = require('crypto')
const fetch = require('node-fetch')

const API_URL = 'https://3commas.io'

class threeCommasAPI {
  constructor(opts = {}) {
    this._url = opts.url || API_URL
    this._apiKey = opts.apiKey || ''
    this._apiSecret = opts.apiSecret || ''
  }

  generateSignature (requestUri, reqData) {
    const request = requestUri + reqData
    return crypto.createHmac('sha256', this._apiSecret).update(request).digest('hex')
  }

  async makeRequest (method, path, params) {
    if (!this._apiKey || !this._apiSecret) {
      return new Error('missing api key or secret')
    }

    const sig = this.generateSignature(path, querystring.stringify(params))

    try {
      let response = await fetch(
        `${this._url}${path}${querystring.stringify(params)}`,
        {
          method: method,
          timeout: 30000,
          agent: '',
          headers: {
            'APIKEY': this._apiKey,
            'Signature': sig
          }
        }
      )

      return await response.json()
    } catch (e) {
      console.log(e);
      return false
    }
  }

  async getDeals (params) {
    return await this.makeRequest('GET', '/public/api/ver1/deals?', params)
  }

  async dealUpdateMaxSafetyOrders (deal_id, max_safety_orders) {
    return await this.makeRequest('POST', `/public/api/ver1/deals/${deal_id}/update_max_safety_orders?`, { deal_id, max_safety_orders })
  }

  async dealPanicSell (deal_id) {
    return await this.makeRequest('POST', `/public/api/ver1/deals/${deal_id}/panic_sell?`, { deal_id })
  }

  async dealCancel (deal_id) {
    return await this.makeRequest('POST', `/public/api/ver1/deals/${deal_id}/cancel?`, { deal_id })
  }

  async dealUpdateTp (deal_id, new_take_profit_percentage) {
    return await this.makeRequest('POST', `/public/api/ver1/deals/${deal_id}/update_tp?`, { deal_id, new_take_profit_percentage })
  }

  async getDeal (deal_id) {
    return await this.makeRequest('GET', `/public/api/ver1/deals/${deal_id}/show?`, { deal_id })
  }

}

module.exports = threeCommasAPI
