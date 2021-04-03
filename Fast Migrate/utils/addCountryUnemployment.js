const fs = require('fs');
const path = require('path');
const pathUnemployed = '../datasets/unemployment.json';

//function that read unemployment.json and returns the parsed data
const _getUnemploymentData = () => { 
  const json_data = fs.readFileSync(path.resolve(__dirname, pathUnemployed));
  return JSON.parse(json_data);
}

//function that a returns a particular unemployment rate base on the country name
module.exports.getUnemployment = (country_name) => { 
  let data = _getUnemploymentData();
  for (let i = 0; i < data.length; i++) {
    if (data[i].country === country_name) {
      return parseFloat(data[i].unemploymentRate);
    }
  } 
  return null;
}
