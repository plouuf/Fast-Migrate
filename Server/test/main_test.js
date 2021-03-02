var assert = require('assert');
const { getHappiness } = require('../utils/addCountryHappiness');
const { getGdp } = require('../utils/addCountryGDP');
const { getUnemployment } = require('../utils/addCountryUnemployment');
const { getCountryInfo } = require('../utils/addCountryInfoAPI');
const Country = require('../models/country');
const request = require('request');

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
        it('Fail 2 - Test the insertion of a valid Book (Book.save) - Success Msg test', function(){

        });
        it('Fail 2 - Test the insertion of a valid Book (Book.save) - Success Msg test', function(){

        });
        it('Fail 2 - Test the insertion of a valid Book (Book.save) - Success Msg test', function(){

        });
        it('Fail 2 - Test the insertion of a valid Book (Book.save) - Success Msg test', function(){

        });
        it('Success 2 - Test the insertion of a valid Book (Book.save) - Success Msg test', function(){

        });
        it('Success 3 - Test the update of a valid Book (Book.update) - Success Msg test', function(){
            
        });
        it('Success 4 - Test the deletetion of a valid Book (Book.delete) - Success Msg test', function(){
            
        });
        it('Success 5 - Test the retrieval of a book by id (Book.getBookById) - Success Msg test', function(){
            
        });
        it('Success 6 - Test the retrieval of all books (Book.getBooks) - Success Msg test', function(){
            
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