var assert = require('assert');
const { getHappiness } = require('../utils/addCountryHappiness');
const { getGdp } = require('../utils/addCountryGDP');
const { getUnemployment } = require('../utils/addCountryUnemployment');
const { getCountryInfo } = require('../utils/addCountryInfoAPI');
const Country = require('../models/country');
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

describe('Testing the Fast Migrate API', function(){
    describe('Testing the Country Model - Simple cases', function(){
      it('Success 1 - Test creation of a valid country with parameters matching', async function () {
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
        assert.strictEqual(c.cost_of_living, cpi_index);

        });
        it('Fail 1 - Test an invalid Country name', async function(){
          
          const c1 = new Country('');
          let happiness = getHappiness(c1.name);
          let gdp = getGdp(c1.name);
          let unemployment = getUnemployment(c1.name);
          let crime_index;
          let quality_of_life;
          let health_care_index;
          let cpi_index;

          await getCountryInfo(c1.name).then(data => {
            crime_index = data[0];
            quality_of_life = data[1];
            health_care_index = data[2];
            cpi_index = data[3];
          });

          c1.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
          assert.strictEqual(c1.isValid(), false);

        });
        it('Fail 2 - Test an invalid Country happiness', async function(){
          
          const c2 = new Country('Canada');
          let happiness = null;
          let gdp = getGdp(c2.name);
          let unemployment = getUnemployment(c2.name);
          let crime_index;
          let quality_of_life;
          let health_care_index;
          let cpi_index;

          await getCountryInfo(c2.name).then(data => {
            crime_index = data[0];
            quality_of_life = data[1];
            health_care_index = data[2];
            cpi_index = data[3];
          });

          c2.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
          assert.strictEqual(c2.isValid(), false);

        });
        it('Fail 3 - Test an invalid Country gdp', async function(){
          
          const c3 = new Country('Canada');
          let happiness = getHappiness(c3.name);
          let gdp = null;
          let unemployment = getUnemployment(c3.name);
          let crime_index;
          let quality_of_life;
          let health_care_index;
          let cpi_index;

          await getCountryInfo(c3.name).then(data => {
            crime_index = data[0];
            quality_of_life = data[1];
            health_care_index = data[2];
            cpi_index = data[3];
          });

          c3.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
          assert.strictEqual(c3.isValid(), false);

        });
        it('Fail 4 - Test an invalid Country unemployment', async function(){
          
          const c4 = new Country('Canada');
          let happiness = getHappiness(c4.name);
          let gdp = getGdp(c4.name)
          let unemployment = null;
          let crime_index;
          let quality_of_life;
          let health_care_index;
          let cpi_index;

          await getCountryInfo(c4.name).then(data => {
            crime_index = data[0];
            quality_of_life = data[1];
            health_care_index = data[2];
            cpi_index = data[3];
          });

          c4.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
          assert.strictEqual(c4.isValid(), false);

        });
        it('Success 2 - Test the insertion of a valid Country (Country.save) - Success Msg test', async function(){
          
          const c5 = new Country('Canada');
          let happiness = getHappiness(c5.name);
          let gdp = getGdp(c5.name);
          let unemployment = getUnemployment(c5.name);
          let crime_index;
          let quality_of_life;
          let health_care_index;
          let cpi_index;

          await getCountryInfo(c5.name).then(data => {
            crime_index = data[0];
            quality_of_life = data[1];
            health_care_index = data[2];
            cpi_index = data[3];
          });

          c5.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);

          await c5.save(db)
            .then(msg => { 
              assert.strictEqual(msg, 'Country correctly inserted in the Database!');
          }).catch(msg => { 
            console.log(`Error: ${msg}`);
          });
          
        });
        it('Success 3 - Test the update of a valid Country (Country.update) - Success Msg test', async function(){
          
          let name = 'Canada';
          let up_happ = 8;
          let up_gdp = 1800;
          let up_unemploy = 5.5;
          await Country.update(db, name, up_happ, up_gdp, up_unemploy)
            .then(msg => { 
              assert.strictEqual(msg, 'Country correctly updated!');
          }).catch(msg => { 
            console.log(`Error: ${msg}`);
          });

        });
        it('Success 4 - Test the deletetion of a valid Country (Country.delete) - Success Msg test', async function(){
          await Country.delete(db, 'Canada')
            .then(msg => { 
              assert.strictEqual(msg, 'Country deleted!');
          }).catch(msg => { 
            console.log(`Error: ${msg}`);
          });
        });
        it('Success 5 - Test the retrieval of a Country by name (Country.getCountryByName) - Success Msg test', async function(){
          const c6 = new Country('Canada');
          let happiness = getHappiness(c6.name);
          let gdp = getGdp(c6.name);
          let unemployment = getUnemployment(c6.name);
          let crime_index;
          let quality_of_life;
          let health_care_index;
          let cpi_index;

          await getCountryInfo(c6.name).then(data => {
            crime_index = data[0];
            quality_of_life = data[1];
            health_care_index = data[2];
            cpi_index = data[3];
          });

          c6.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
          await c6.save(db);
          await Country.getCountryByName(db, c6.name)
            .then(msg => { 
              assert.strictEqual(msg[0].name, c6.name);
              assert.strictEqual(msg[0].happiness_score, c6.happiness_score);
              assert.strictEqual(msg[0].Gdp, c6.Gdp);
              assert.strictEqual(msg[0].unemployment_rate, c6.unemployment_rate);
              assert.strictEqual(msg[0].crime_index, c6.crime_index);
              assert.strictEqual(msg[0].quality_of_life, c6.quality_of_life);
              assert.strictEqual(msg[0].health_care_index, c6.health_care_index);
              assert.strictEqual(msg[0].cost_of_living, c6.cost_of_living);
          }).catch(msg => { 
            console.log(`Error: ${msg}`);
          });

          });
        it('Success 6 - Test the retrieval of all Countries (Country.getCountries) - Success Msg test', async function(){
          
          const c7 = new Country('Finland');
          let happiness = getHappiness(c7.name);
          let gdp = getGdp(c7.name);
          let unemployment = getUnemployment(c7.name);
          let crime_index;
          let quality_of_life;
          let health_care_index;
          let cpi_index;

          await getCountryInfo(c7.name).then(data => {
            crime_index = data[0];
            quality_of_life = data[1];
            health_care_index = data[2];
            cpi_index = data[3];
          });

          c7.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
          await c7.save(db);
          await Country.getCountries(db).then(msg => { 
            assert.strictEqual(msg.length > 1, true);
          }).catch(msg => { 
            console.log(`Error: ${msg}`);
          });
          
        });
    });
    describe('Testing the Book API - Complex Cases', function(){
        it('Success 1 - POST /books, DELETE /books/:id', function(){

        });
        it('Success 2 - POST /books, GET /books (retrieval greater than 1), DELETE /book/:id', function(){
            
        });
        it('Success 3 - POST /books, GET /books/:id, DELETE /book/:id', function(){
            
        });
        it('Success 4 - POST /books, PUT /books/:id, GET /books/:id, DELETE /book/:id', function(){
            
        });
        it('Success 5 - (Optional) Open', function(){

        });
        it('Success 6 - (Optional) Open', function(){

        });
    });
});