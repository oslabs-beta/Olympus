const { beforeEach, it, expect, beforeAll } = require('@jest/globals');
const Olympus = require('./olympus-fetch');

const testObject = {
  method: 'POST',
  headers: {'Content-Type': 'application/json; charset=utf-8'},
  body: JSON.stringify({query: "query {   account (account_id: 522933) {     account_id     limit   } }"}),
};

const testResult = {
  result: {"data":{"account":{"account_id":522933,"limit":10000}}},
  operationType: 'query'
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
};

global.localStorage = new LocalStorageMock;

describe('Olympus() - client-side wrapper for fetch()', () => {
  describe('Should return a promise', () => {
    test('Should return a promise', async () => {
      expect.assertions(1);
      global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(testResult),
      })
      );
      const invokedOlympus = Olympus(testObject);
      expect(invokedOlympus).toBeInstanceOf(Promise);
    })
    test('Check Value of resolved Promise', async () => {
      expect.assertions(1);
      global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(testResult),
      })
      );
      const invokedOlympus = await Olympus(testObject);
      expect(JSON.parse(invokedOlympus)).toEqual(testResult.result);
    })
  })
});


// expect fetch to be called when test for checking if query exists in localStorage FAILS
// expect(fetch).toHaveBeenCalledTimes(1) // <= referring to global.fetch