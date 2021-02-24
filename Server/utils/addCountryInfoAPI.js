const axios = require('axios');


getCountryInfo = (country_name) => { 
  let url = 'https://www.numbeo.com/api/';
  let key = 'x9ey41xq1xqezv';
  let country_data = axios.get(url + 'country_indices?api_key=' + key + '&country=' + country_name).then(res => { 
    // const { crime_index, quality_of_life_index, health_care_index, cpi_index } = res.data;
    // console.log(crime_index, quality_of_life_index, health_care_index, cpi_index);
    
  }).catch(err => {
    console.log(err)
  });
}

getCountryInfo('Kuwait');