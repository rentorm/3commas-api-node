const { TestScheduler } = require('jest');
const querystring = require('querystring');
const crypto = require('crypto')
require('jest-fetch-mock').enableMocks();
const threeCommasAPI = require('./index');
const { API_URL } = require('./config');

const _ = expect.anything();

// Independently testing the generateSignature functionality to prevent refactor errors
// This is known to work correctly
const generateSignature = (apiSecret, requestUri, reqData) => {
  const request = requestUri + reqData
  return crypto.createHmac('sha256', apiSecret).update(request).digest('hex')
}

const generateExpectedUrl = (url, param) => {
  return `${url}${querystring.stringify(param)}`;
}

describe('constructor must ', () => {
  test('take url as option', () => {
    const opts = {
      url: 'https://example.com'
    }
    const c = new threeCommasAPI(opts);
    expect(c._url).toBe(opts.url);
  });

  test('take apiKey as option', () => {
    const opts = {
      apiKey: 'PCDFERTD'
    }
    const c = new threeCommasAPI(opts);
    expect(c._apiKey).toBe(opts.apiKey);
  });

  test('take apiSecret as option', () => {
    const opts = {
      apiSecret: 'https://example.com'
    }
    const c = new threeCommasAPI(opts);
    expect(c._apiSecret).toBe(opts.apiSecret);
  });
});

describe('makeRequest ', () => {
  test('should throw an error if apiKeys or apiSecret isn\'t provided', () => {
    try {
      const c = new threeCommasAPI();
    } catch (e) {
      expect(e).toEqual('missing api key or secret');
    }
  })
});

describe('methods ', () => {
  const opts = {
    apiKey: "APIKEY",
    apiSecret: "APISECRET"
  };

  const testParam = {
    arg1: 'val'
  };

  let apil;

  beforeEach(() => {
    api = new threeCommasAPI(opts);
    fetchMock.mockResponse(JSON.stringify({}));
  });
  afterEach(() => {
    api = null;
    fetchMock.mockClear();
    // fetchMock.reset();
  })

  describe('for deals ', () => {
    test('getDeals must make a GET request to /deals', async () => {
      const expectedMethodType = 'GET';
      const dealUrl = `${API_URL}/public/api/ver1/deals?`;
      const expectedUrl = generateExpectedUrl(dealUrl, testParam);

      await api.getDeals(testParam);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealUpdateMaxSafetyOrders must make a POST request to /deals/{id}/update_max_safety_orders', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const max_safety_orders = 23;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/update_max_safety_orders?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id, max_safety_orders });

      await api.dealUpdateMaxSafetyOrders(deal_id, max_safety_orders);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealPanicSell must make a POST request to /deals/{id}/panic_sell', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/panic_sell?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.dealPanicSell(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealCancel must make a POST request to /deals/{id}/cancel', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/cancel?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.dealCancel(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealUpdateTp must make a POST request to /deals/{id}/update_tp', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const new_take_profit_percentage = 23;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/update_tp?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id, new_take_profit_percentage });

      await api.dealUpdateTp(deal_id, new_take_profit_percentage);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('getDeal must make a GET request to /deals/{id}/show', async () => {
      const expectedMethodType = 'GET';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/show?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.getDeal(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('getDealSafetyOrders must make a GET request to /deals/{id}/market_orders', async () => {
      const expectedMethodType = 'GET';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/market_orders?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.getDealSafetyOrders(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealAddFunds must make a POST request to /deals/{id}/add_funds', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/add_funds?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.dealAddFunds({ deal_id });

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })
  });

  describe('for bots ', () => {
    test('getBotsBlackList must make a GET request to /bots/pairs_black_list', async () => {
      const expectedMethodType = 'GET';
      const botUrl = `${API_URL}/public/api/ver1/bots/pairs_black_list?`;
      const expectedUrl = generateExpectedUrl(botUrl, null);

      await api.getBotsBlackList();

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botsUpdateBlackList must make a POST request to /bots/update_pairs_black_list', async () => {
      const expectedMethodType = 'POST';
      const botUrl = `${API_URL}/public/api/ver1/bots/update_pairs_black_list?`;
      const expectedUrl = generateExpectedUrl(botUrl, testParam);

      await api.botsUpdateBlackList(testParam);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botCreate must make a POST request to /bots/create_bot', async () => {
      const expectedMethodType = 'POST';
      const botUrl = `${API_URL}/public/api/ver1/bots/create_bot?`;
      const expectedUrl = generateExpectedUrl(botUrl, testParam);

      await api.botCreate(testParam);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('getBots must make a GET request to /bots', async () => {
      const expectedMethodType = 'GET'
      const botUrl = `${API_URL}/public/api/ver1/bots?`;
      const expectedUrl = generateExpectedUrl(botUrl, testParam);

      await api.getBots(testParam);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('getBotsStats must make a GET request to /bots/stats', async () => {
      const expectedMethodType = 'GET'
      const botUrl = `${API_URL}/public/api/ver1/bots/stats?`;
      const expectedUrl = generateExpectedUrl(botUrl, testParam);

      await api.getBotsStats(testParam);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botUpdate must make a PATCH request to /bots/{id}/update', async () => {
      const expectedMethodType = 'PATCH'
      const botParams = {
        bot_id: 43
      }
      const botUrl = `${API_URL}/public/api/ver1/bots/${botParams.bot_id}/update?`;
      const expectedUrl = generateExpectedUrl(botUrl, botParams);

      await api.botUpdate(botParams);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botDisable must make a POST request to /bots/{id}/disable', async () => {
      const expectedMethodType = 'POST'
      const bot_id = 43;
      const botUrl = `${API_URL}/public/api/ver1/bots/${bot_id}/disable?`;
      const expectedUrl = generateExpectedUrl(botUrl, { bot_id });

      await api.botDisable(bot_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botEnable must make a POST request to /bots/{id}/disable', async () => {
      const expectedMethodType = 'POST'
      const bot_id = 43;
      const botUrl = `${API_URL}/public/api/ver1/bots/${bot_id}/enable?`;
      const expectedUrl = generateExpectedUrl(botUrl, { bot_id });

      await api.botEnable(bot_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botStartNewDeal must make a POST request to /bots/{id}/start_new_deal', async () => {
      const expectedMethodType = 'POST'
      const botParams = {
        bot_id: 43
      }
      const botUrl = `${API_URL}/public/api/ver1/bots/${botParams.bot_id}/start_new_deal?`;
      const expectedUrl = generateExpectedUrl(botUrl, botParams);

      await api.botStartNewDeal(botParams);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botDelete must make a POST request to /bots/{id}/delete', async () => {
      const expectedMethodType = 'POST'
      const bot_id = 43;
      const botUrl = `${API_URL}/public/api/ver1/bots/${bot_id}/delete?`;
      const expectedUrl = generateExpectedUrl(botUrl, { bot_id });

      await api.botDelete(bot_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botPaniceSellAllDeals must make a POST request to /bots/{id}/panic_sell_all_deals', async () => {
      const expectedMethodType = 'POST'
      const bot_id = 43;
      const botUrl = `${API_URL}/public/api/ver1/bots/${bot_id}/panic_sell_all_deals?`;
      const expectedUrl = generateExpectedUrl(botUrl, { bot_id });

      await api.botPaniceSellAllDeals(bot_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botCancelAllDeals must make a POST request to /bots/{id}/cancel_all_deals', async () => {
      const expectedMethodType = 'POST'
      const bot_id = 43;
      const botUrl = `${API_URL}/public/api/ver1/bots/${bot_id}/cancel_all_deals?`;
      const expectedUrl = generateExpectedUrl(botUrl, { bot_id });

      await api.botCancelAllDeals(bot_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botShow must make a GET request to /bots/{id}/show', async () => {
      const expectedMethodType = 'GET'
      const bot_id = 43;
      const botUrl = `${API_URL}/public/api/ver1/bots/${bot_id}/show?`;
      const expectedUrl = generateExpectedUrl(botUrl, { bot_id });

      await api.botShow(bot_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })
  });

  describe('for smart trades ', () => {
    test('smartTradesCreateSimpleSell must make a POST request to /smart_trades/create_simple_sell',
      async () => {
        const expectedMethodType = 'POST';
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/create_simple_sell?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.smartTradesCreateSimpleSell(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesCreateSimpleBuy must make a POST request to /smart_trades/create_simple_buy',
      async () => {
        const expectedMethodType = 'POST';
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/create_simple_buy?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.smartTradesCreateSimpleBuy(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesCreateSmartSell must make a POST request to /smart_trades/create_smart_sell',
      async () => {
        const expectedMethodType = 'POST';
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/create_smart_sell?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.smartTradesCreateSmartSell(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesCreateSmartCover must make a POST request to /smart_trades/create_smart_cover',
      async () => {
        const expectedMethodType = 'POST';
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/create_smart_cover?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.smartTradesCreateSmartCover(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesCreateSmartTrade must make a POST request to /smart_trades/create_smart_trade',
      async () => {
        const expectedMethodType = 'POST';
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/create_smart_trade?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.smartTradesCreateSmartTrade(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTrades must make a GET request to /smart_trades',
      async () => {
        const expectedMethodType = 'GET';
        const botUrl = `${API_URL}/public/api/ver1/smart_trades?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.smartTrades(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesV2 must make a GET request to /v2/smart_trades',
      async () => {
        const expectedMethodType = 'GET';
        const botUrl = `${API_URL}/public/api/v2/smart_trades?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.smartTradesV2(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesStepPanicSell must make a POST request to /smart_trades/{id}/step_panic_sell',
      async () => {
        const expectedMethodType = 'POST';
        const params = {
          smart_trade_id: 73
        };
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/${params.smart_trade_id}/step_panic_sell?`;
        const expectedUrl = generateExpectedUrl(botUrl, params);

        await api.smartTradesStepPanicSell(params);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesUpdate must make a PATCH request to /smart_trades/{id}/update',
      async () => {
        const expectedMethodType = 'PATCH';
        const params = {
          smart_trade_id: 73
        };
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/${params.smart_trade_id}/update?`;
        const expectedUrl = generateExpectedUrl(botUrl, params);

        await api.smartTradesUpdate(params);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesCancel must make a POST request to /smart_trades/{id}/cancel',
      async () => {
        const expectedMethodType = 'POST';
        const smart_trade_id = 74
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/${smart_trade_id}/cancel?`;
        const expectedUrl = generateExpectedUrl(botUrl, { smart_trade_id });

        await api.smartTradesCancel(smart_trade_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesPanicSell must make a POST request to /smart_trades/{id}/panic_sell',
      async () => {
        const expectedMethodType = 'POST';
        const smart_trade_id = 74
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/${smart_trade_id}/panic_sell?`;
        const expectedUrl = generateExpectedUrl(botUrl, { smart_trade_id });

        await api.smartTradesPanicSell(smart_trade_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('smartTradesForceProcess must make a POST request to /smart_trades/{id}/force_process',
      async () => {
        const expectedMethodType = 'POST';
        const smart_trade_id = 74
        const botUrl = `${API_URL}/public/api/ver1/smart_trades/${smart_trade_id}/force_process?`;
        const expectedUrl = generateExpectedUrl(botUrl, { smart_trade_id });

        await api.smartTradesForceProcess(smart_trade_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })
  });

  describe('for accounts ', () => {
    test('accountsNew must make a POST request to /accounts/new',
      async () => {
        const expectedMethodType = 'POST';
        const botUrl = `${API_URL}/public/api/ver1/accounts/new?`;
        const expectedUrl = generateExpectedUrl(botUrl, testParam);

        await api.accountsNew(testParam);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accounts must make a GET request to /accounts',
      async () => {
        const expectedMethodType = 'GET';
        const botUrl = `${API_URL}/public/api/ver1/accounts?`;
        const expectedUrl = generateExpectedUrl(botUrl, null);

        await api.accounts();

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountsMarketList must make a GET request to /accounts/market_list',
      async () => {
        const expectedMethodType = 'GET';
        const botUrl = `${API_URL}/public/api/ver1/accounts/market_list?`;
        const expectedUrl = generateExpectedUrl(botUrl, null);

        await api.accountsMarketList();

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountsCurrencyRates must make a GET request to /accounts/currency_rates',
      async () => {
        const expectedMethodType = 'GET';
        const botUrl = `${API_URL}/public/api/ver1/accounts/currency_rates?`;
        const expectedUrl = generateExpectedUrl(botUrl, null);

        await api.accountsCurrencyRates();

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountSellAllToUsd must make a POST request to /accounts/{id}/sell_all_to_usd',
      async () => {
        const expectedMethodType = 'POST';
        const account_id = 342;
        const botUrl = `${API_URL}/public/api/ver1/accounts/${account_id}/sell_all_to_usd?`;
        const expectedUrl = generateExpectedUrl(botUrl, { account_id });

        await api.accountSellAllToUsd(account_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountSellAllToBtc must make a POST request to /accounts/{id}/sell_all_to_btc',
      async () => {
        const expectedMethodType = 'POST';
        const account_id = 342;
        const botUrl = `${API_URL}/public/api/ver1/accounts/${account_id}/sell_all_to_btc?`;
        const expectedUrl = generateExpectedUrl(botUrl, { account_id });

        await api.accountSellAllToBtc(account_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountSellAllToBtc must make a POST request to /accounts/{id}/sell_all_to_btc',
      async () => {
        const expectedMethodType = 'POST';
        const account_id = 342;
        const botUrl = `${API_URL}/public/api/ver1/accounts/${account_id}/sell_all_to_btc?`;
        const expectedUrl = generateExpectedUrl(botUrl, { account_id });

        await api.accountSellAllToBtc(account_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountLoadBalances must make a POST request to /accounts/{id}/load_balances',
      async () => {
        const expectedMethodType = 'POST';
        const account_id = 342;
        const botUrl = `${API_URL}/public/api/ver1/accounts/${account_id}/load_balances?`;
        const expectedUrl = generateExpectedUrl(botUrl, { account_id });

        await api.accountLoadBalances(account_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountRename must make a POST request to /accounts/{id}/rename',
      async () => {
        const expectedMethodType = 'POST';
        const params = {
          account_id: 52
        };
        const botUrl = `${API_URL}/public/api/ver1/accounts/${params.account_id}/rename?`;
        const expectedUrl = generateExpectedUrl(botUrl, params);

        await api.accountRename(params);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountPieChartData must make a POST request to /accounts/{id}/pie_chart_data',
      async () => {
        const expectedMethodType = 'POST';
        const account_id = 342;
        const botUrl = `${API_URL}/public/api/ver1/accounts/${account_id}/pie_chart_data?`;
        const expectedUrl = generateExpectedUrl(botUrl, { account_id });

        await api.accountPieChartData(account_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountTableData must make a POST request to /accounts/{id}/account_table_data',
      async () => {
        const expectedMethodType = 'POST';
        const account_id = 342;
        const botUrl = `${API_URL}/public/api/ver1/accounts/${account_id}/account_table_data?`;
        const expectedUrl = generateExpectedUrl(botUrl, { account_id });

        await api.accountTableData(account_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })

    test('accountRemove must make a POST request to /accounts/{id}/remove',
      async () => {
        const expectedMethodType = 'POST';
        const account_id = 342;
        const botUrl = `${API_URL}/public/api/ver1/accounts/${account_id}/remove?`;
        const expectedUrl = generateExpectedUrl(botUrl, { account_id });

        await api.accountRemove(account_id);

        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
        expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
      })
  });
});
