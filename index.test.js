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
    } catch(e) {
      expect(e).toEqual('missing api key or secret');
    }
  })
});

describe('method ', () => {
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

  test('getDeals must make a GET request to /deals', async () => {
    const dealUrl = `${API_URL}/public/api/ver1/deals?`;
    const expectedUrl = generateExpectedUrl(dealUrl, testParam);

    await api.getDeals(testParam);

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
  })

  test('dealUpdateMaxSafetyOrders must make a POST request to /update_max_safety_orders', async () => {
    const deal_id = 42;
    const max_safety_orders = 23;
    const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/update_max_safety_orders?`;
    const expectedUrl = generateExpectedUrl(dealUrl, {deal_id, max_safety_orders});

    await api.dealUpdateMaxSafetyOrders(deal_id, max_safety_orders);

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({method: 'POST'})
  })

  test('dealPanicSell must make a POST request to /update_max_safety_orders', async () => {
    const deal_id = 42;
    const dealUrl = `${API_URL}/public/api/ver1/deals/${deal_id}/panic_sell?`;
    const expectedUrl = generateExpectedUrl(dealUrl, {deal_id});

    await api.dealPanicSell(deal_id);

    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, _);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({method: 'POST'})
  })
});
