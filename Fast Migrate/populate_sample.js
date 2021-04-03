const fs = require('fs');
const path = require('path');
const { getHappiness } = require('./utils/addCountryHappiness');
const { getGdp } = require('./utils/addCountryGDP');
const { getUnemployment } = require('./utils/addCountryUnemployment');
const { getCountryInfo } = require('./utils/addCountryInfoAPI');
const mongo = require('./utils/db');
const Country = require('./models/country')
const pathCountry = './datasets/happiness.json';

var db;
//function that connect to the database
async function loadDBClient() {
  try {
    db = await mongo.connectToDB();
  }catch(err){
    throw new Error('Could not connect to the Mongo DB');
  }
};

//function to read data from the happiness.json file and returned the parsed data
const _getData = () => { 
  const json_data = fs.readFileSync(path.resolve(__dirname, pathCountry));
  return JSON.parse(json_data);
}

//function to populate the db
const populate = async () => {
  loadDBClient();
  let names = _getData();
  //add 156 countries to the database
  for (let i = 0; i < 156; i++) {
    let c = new Country(names[i].Country);
    let happiness = getHappiness(c.name);
    let gdp = getGdp(c.name);
    let unemployment = getUnemployment(c.name);
    let crime_index;
    let quality_of_life;
    let health_care_index
    let cpi_index;
    //function that makes a call to the 3rd party api to get info to be added to the database
    await getCountryInfo(c.name).then(data => {
      crime_index = data[0];
      quality_of_life = data[1];
      health_care_index = data[2];
      cpi_index = data[3];
    });
    //add the infos to the country object
    c.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index);
    //save the country obj in the db
    let msg = await c.save(db);
    console.log(msg);
  }
  console.log("All countries added to DB. Have Fun!")
  mongo.closeDBConnection();
}

//call the populate function
populate();
