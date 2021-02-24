const fs = require('fs');
const pathHappiness = '../datasets/happiness.json'

const _getHappinessData = () => { 
  const json_data = fs.readFileSync(pathHappiness);
  return JSON.parse(json_data);
}

module.exports.getHappiness = (country_name) => { 
  let data = _getHappinessData();
  for (let i = 0; i < data.length; i++) { 
    if (data[i].Country == country_name) { 
      return data[i].Score;
    }
  }
  return null;
}


