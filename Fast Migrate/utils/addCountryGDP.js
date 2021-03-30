const fs = require('fs');
const path = require('path');
const pathGdp = '../datasets/Gdp.json';

const _getGdpData = () => { 
  const json_data = fs.readFileSync(path.resolve(__dirname, pathGdp));
  return JSON.parse(json_data);
}

module.exports.getGdp = (country_name) => { 
  let data = _getGdpData();
  for (let i = 0; i < data.length; i++) {
    if (data[i].Country === country_name) {
      return parseFloat(data[i].GDP);
    }
  } 
  return null;
}
