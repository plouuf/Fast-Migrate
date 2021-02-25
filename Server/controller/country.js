const { getHappiness } = require("../utils/addCountryHappiness");
const { getGdp } = require("../utils/addCountryGDP");
const { getCountryInfo } = require("../utils/addCountryInfoAPI");
const Country = require("../models/country");



let c = new Country('Canada');

//returns the happiness score for canada
let happiness = getHappiness('Canada');
console.log(happiness);

//returns gdp for canada
let gdp = getGdp('Canada');
console.log(gdp);

//returns a promise of an array [crime_index, quality_of_life_index, health_care_index, cpi_index(cost of living)] 
//or null for some field if not found in the api
//need to await this function
getCountryInfo('Canada').then(data => { 
  console.log(data);
}).catch(err => { 
  console.log(err);
});


