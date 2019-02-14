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

  /**
   * Deals methods
   */

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

  /**
   * Bots methods
   */

  async getBotsBlackList () {
    return await this.makeRequest('GET', `/public/api/ver1/bots/pairs_black_list?`, null)
  }

  async botsUpdateBlackList (params) {
    return await this.makeRequest('POST', '/public/api/ver1/bots/update_pairs_black_list?', params)
  }

  async botCreate (params) {
    return await this.makeRequest('POST', '/public/api/ver1/bots/create_bot?', params)
  }

  async getBots (params) {
    return await this.makeRequest('GET', `/public/api/ver1/bots?`, params)
  }

  async getBotsStats (params) {
    return await this.makeRequest('GET', `/public/api/ver1/bots/stats?`, params)
  }

  async botUpdate (params) {
    return await this.makeRequest('PATCH', `/public/api/ver1/bots/${params.bot_id}/update?`, params)
  }

  async botDisable (bot_id) {
    return await this.makeRequest('POST', `/public/api/ver1/bots/${bot_id}/disable?`, { bot_id })
  }

  async botEnable (bot_id) {
    return await this.makeRequest('POST', `/public/api/ver1/bots/${bot_id}/enable?`, { bot_id })
  }

  async botStartNewDeal (params) {
    return await this.makeRequest('POST', `/public/api/ver1/bots/${params.bot_id}/start_new_deal?`, params)
  }

  async botDelete (bot_id) {
    return await this.makeRequest('POST', `/public/api/ver1/bots/${bot_id}/delete?`, { bot_id })
  }

  async botPaniceSellAllDeals (bot_id) {
    return await this.makeRequest('POST', `/public/api/ver1/bots/${bot_id}/panic_sell_all_deals?`, { bot_id })
  }

  async botCancelAllDeals (bot_id) {
    return await this.makeRequest('POST', `/public/api/ver1/bots/${bot_id}/cancel_all_deals?`, { bot_id })
  }

  async botShow (bot_id) {
    return await this.makeRequest('GET', `/public/api/ver1/bots/${bot_id}/show?`, { bot_id })
  }

}

module.exports = threeCommasAPI
