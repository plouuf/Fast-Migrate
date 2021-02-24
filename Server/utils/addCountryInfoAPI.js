const axios = require("axios"); 

getCountryHealth = (country_name) => {
    return new Promise((resolve, reject) => {
        let url = 'https://www.numbeo.com/api/';
        let key = 'x9ey41xq1xqezv';
        let country_api = axios.get(url+"/api/country_indices?api_key="+key+"&country="+country_name)
                            .then(res => { 
                                return res.data.results[0];
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

getCountryCrime = (country_name) => {
    return new Promise((resolve, reject) => {
        let url = 'https://www.numbeo.com/api/';
        let key = 'x9ey41xq1xqezv';
        let country_api = axios.get(url+"/api/country_indices?api_key="+key+"&country="+country_name)
                            .then(res => { 
                                return res.data.results[1];
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

getCountryCost = (country_name) => {
    return new Promise((resolve, reject) => {
        let url = 'https://www.numbeo.com/api/';
        let key = 'x9ey41xq1xqezv';
        let country_api = axios.get(url+"/api/country_indices?api_key="+key+"&country="+country_name)
                            .then(res => { 
                                return res.data.results[4];
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

getCountryQuality = (country_name) => {
    return new Promise((resolve, reject) => {
        let url = 'https://www.numbeo.com/api/';
        let key = 'x9ey41xq1xqezv';
        let country_api = axios.get(url+"/api/country_indices?api_key="+key+"&country="+country_name)
                            .then(res => { 
                                return res.data.results[7];                                
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