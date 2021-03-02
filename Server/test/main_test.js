var assert = require('assert');
const Country = require('../models/country');
const { getHappiness } = require('../utils/addCountryHappiness');
const { getGdp } = require('../utils/addCountryGDP');
const { getUnemployment } = require('../utils/addCountryUnemployment');
const { getCountryInfo } = require('../utils/addCountryInfoAPI');
const request = require('request');
const mongo = require('../utils/db');

var db;
// This method runs once and connects to the mongoDB
before(async function () {
  try {
    db = await mongo.connectToDB();
  } catch (err) {
    throw err;
  }
});
// this method will close your connection to MongoDB after the tests
after(async function () {
  
  try {
    mongo.closeDBConnection();
  } catch (err) {
    throw err;
  }
});

describe('Testing the FastMigrate API', async function () {
  describe('Testing the Country Model - Simple cases', function () {
    it('Fail 1 - Test creation of a valid Country with parameters matching', async function () {

      const c = new Country('Canada');
      let happiness = getHappiness(c.name);
      let gdp = getGdp(c.name);
      let unemployment = getUnemployment(c.name);
      let crime_index;
      let quality_of_life;
      let health_care_index;
      let cpi_index;

      await getCountryInfo(c.name).then(data => {
        crime_index = data[0];
        quality_of_life = data[1];
        health_care_index = data[2];
        cpi_index = data[3];
      });

      c.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
      assert.strictEqual(c.name, 'Canada');
      assert.strictEqual(c.happiness_score, happiness);
      assert.strictEqual(c.Gdp, gdp);
      assert.strictEqual(c.unemployment_rate, unemployment);
      assert.strictEqual(c.crime_index, crime_index);
      assert.strictEqual(c.health_care_index, health_care_index);
      assert.strictEqual(c.cpi_index, cpi_index);

    it('Fail 3 - Test an invalid Book name', function () {
      //
    });
    it('Fail 4 - Test an invalid Book authors', function () {
      //
    });
    it('Fail 5 - Test Invalid Book year', function () {
      //
    });
    it('Fail 6 - Test Invalid Book year', function () {
      //
    });
    it('Success 1 - Test the insertion of a valid Book (Book.save) - Success Msg test', async function () {
      //
    });
    it('Success 2 - Test the update of a valid Book (Book.update) - Success Msg test', async function () {
      //
    });
    it('Success 3 - Test the deletetion of a valid Book (Book.delete) - Success Msg test', async function () {
      //
    });
    it('Success 4 - Test the retrieval of a book by id (Book.getBookById) - Success Msg test', async function () {
      //
    });
    it('Success 5 - Test the retrieval of all books (Book.getBooks) - Success Msg test', async function () {
      //
    });
  });
  describe('Testing the FastMigrate API - Complex Cases', function () {
    var myurl = '';
    it('Success 1 - POST /books, DELETE /books/:id', function () {
      //
    });

    it('Success 2 - POST /books, GET /books (retrieval greater than 1), DELETE /book/:id', function () {
     //
    });
    it('Success 3 - POST /books, GET /books/:id, DELETE /book/:id', function () {
      //
    });
    it('Success 4 - POST /books, PUT /books/:id, GET /books/:id, DELETE /book/:id', function () {
      //
    });
    it('Success 5 - (Optional) Open', function () {});
    it('Success 6 - (Optional) Open', function () {});
  });
});
