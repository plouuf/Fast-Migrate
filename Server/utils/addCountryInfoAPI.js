const axios = require("axios"); 

getCountryInfo = (country_name) => {
    return new Promise((resolve, reject) => {
        let url = 'https://www.numbeo.com/api/';
        let key = 'x9ey41xq1xqezv';
        let country_api = axios.get(url+"/api/country_indices?api_key="+key+"&country="+country_name)
                            .then(res => { return res.data.main;})
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