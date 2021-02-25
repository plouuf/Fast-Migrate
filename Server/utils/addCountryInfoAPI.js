const axios = require('axios');

module.exports.getCountryInfo = (country_name) => { 
  return new Promise((resolve, reject) => { 
    let url = 'https://www.numbeo.com/api/';
    let key = 'x9ey41xq1xqezv';
    let country_data = axios.get(url + 'country_indices?api_key=' + key + '&country=' + country_name)
    .then(res => { 
      const { crime_index, quality_of_life_index, health_care_index, cpi_index } = res.data;
      return ([crime_index || null, quality_of_life_index || null, health_care_index || null, cpi_index || null]);
  }).catch(err => {
      console.log(err)
      return null;
  });
    if (country_data != null) {
      resolve(country_data);
    } else { 
      reject('Country data was not found!');
    }
  });
}
