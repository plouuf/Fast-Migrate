const fs = require('fs');
const pathUnemployed = '../datasets/unemployment.json'

const _getGdpData = () => { 
  const json_data = fs.readFileSync(pathUnemployed);
  return JSON.parse(json_data);
}

module.exports.getUnemployment = (country_name) => { 
  let data = _getGdpData();
  for (let i = 0; i < data.length; i++) {
    if (data[i].country === country_name) {
      return data[i].unemploymentRate;
    }
  } 
  return null;
}
