const fs = require('fs');
const path = require('path');
const db = require('../Olympus/server.js');

// const testJsonFile = path.resolve(__dirname, '');

describe('db unit tests', () => {
    beforeAll((done) => {
        fs.writeFile(testJsonFile, JSON.stringify([]), () => {
          db.reset();
          done();
        });
      });

      afterAll((done) => {
        fs.writeFile(testJsonFile, JSON.stringify([]), done);
      });
describe('#sync', () => {
    xit('test sync one', () => {
    });

    xit('test sync one', () => {
    });
    
    xit('test sync one', () => {
    });
    
    });
});