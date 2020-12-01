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

    test('dealUpdateMaxSafetyOrders must make a POST request to /update_max_safety_orders', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const max_safety_orders = 23;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/update_max_safety_orders?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id, max_safety_orders });

      await api.dealUpdateMaxSafetyOrders(deal_id, max_safety_orders);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealPanicSell must make a POST request to /panic_sell', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/panic_sell?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.dealPanicSell(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealCancel must make a POST request to /cancel', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/cancel?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.dealCancel(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealUpdateTp must make a POST request to /update_tp', async () => {
      const expectedMethodType = 'POST';
      const deal_id = 42;
      const new_take_profit_percentage = 23;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/update_tp?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id, new_take_profit_percentage });

      await api.dealUpdateTp(deal_id, new_take_profit_percentage);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('getDeal must make a GET request to /show', async () => {
      const expectedMethodType = 'GET';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/show?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.getDeal(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('getDealSafetyOrders must make a GET request to /market_orders', async () => {
      const expectedMethodType = 'GET';
      const deal_id = 42;
      const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/market_orders?`;
      const expectedUrl = generateExpectedUrl(dealUrl, { deal_id });

      await api.getDealSafetyOrders(deal_id);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('dealAddFunds must make a POST request to /add_funds', async () => {
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
    test('getBotsBlackList must make a GET request to /pairs_black_list', async () => {
      const expectedMethodType = 'GET';
      const botUrl = `${API_URL}/public/api/ver1/bots/pairs_black_list?`;
      const expectedUrl = generateExpectedUrl(botUrl, null);

      await api.getBotsBlackList();

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botsUpdateBlackList must make a POST request to /update_pairs_black_list', async () => {
      const expectedMethodType = 'POST';
      const botUrl = `${API_URL}/public/api/ver1/bots/update_pairs_black_list?`;
      const expectedUrl = generateExpectedUrl(botUrl, testParam);

      await api.botsUpdateBlackList(testParam);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })

    test('botCreate must make a POST request to /create_bot', async () => {
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

    test('getBots must make a GET request to /bots', async () => {
      const expectedMethodType = 'GET'
      const botUrl = `${API_URL}/public/api/ver1/bots?`;
      const expectedUrl = generateExpectedUrl(botUrl, testParam);

      await api.getBots(testParam);

      expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
      expect(fetchMock.mock.calls[0][1]).toMatchObject({ method: expectedMethodType })
    })
  });
});
