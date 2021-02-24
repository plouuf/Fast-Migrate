const axios = require("axios"); 

getCountryInfo = (country_name) => {
    return new Promise((resolve, reject) => {
        let url = 'https://www.numbeo.com/api/';
        let key = 'x9ey41xq1xqezv';
        let country_api = axios.get(url+"/api/country_indices?api_key="+key+"&country="+country_name)
                            .then(res => { 
                                let health_care = res.data.results[0];
                                let crime_index = res.data.results[1];
                                let cost_of_living = res.data.results[4];
                                let quality_of_life = res.data.results[7];                                
                                return [health_care, crime_index, cost_of_living, quality_of_life];
                            })
                            .catch( err => {
                                console.log(err);
                                return null;
                            });
        if(country_api != null) {
            resolve(country_api);
        }else{
            reject(null);
        }
    });
};