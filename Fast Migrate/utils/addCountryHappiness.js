const fs = require('fs');
const path = require('path');
const pathHappiness = '../datasets/happiness.json';

//function that read happiness.json and returns the parsed data
const _getHappinessData = () => { 
  const json_data = fs.readFileSync(path.resolve(__dirname, pathHappiness));
  return JSON.parse(json_data);
}
//function that a returns a particular happiness score base on the country name
module.exports.getHappiness = (country_name) => { 
  let data = _getHappinessData();
  for (let i = 0; i < data.length; i++) { 
    if (data[i].Country == country_name) { 
      return parseFloat(data[i].Score);
    }
  }
  return null;
}
