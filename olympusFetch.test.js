const Olympus = require('./olympus-fetch');

describe('Olympus() - client-side wrapper for fetch()', () => {
  describe('Should return a promise', () => {
    test('Should return a promise', async () => {
      expect.assertions(1);
      const immediateValue = Olympus(options);
      expect(immediateValue).toBeInstanceOf(Promise);
    })
  })
})