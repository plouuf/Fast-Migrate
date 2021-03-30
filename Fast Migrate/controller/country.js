const { getHappiness } = require('../utils/addCountryHappiness');
const { getGdp } = require('../utils/addCountryGDP');
const { getUnemployment } = require('../utils/addCountryUnemployment');
const { getCountryInfo } = require('../utils/addCountryInfoAPI');
const Country = require('../models/country');

const create = async (req, res) => {
    const new_country = new Country(req.body.name);
    let happiness = getHappiness(new_country.name);
    let gdp = getGdp(new_country.name);
    let unemployment = getUnemployment(new_country.name);
    let crime_index;
    let quality_of_life;
    let health_care_index;
    let cpi_index;
    await getCountryInfo(new_country.name).then(data => {
        crime_index = data[0];
        quality_of_life = data[1];
        health_care_index = data[2];
        cpi_index = data[3];
    });
    new_country.addCountryInfo(happiness, gdp, unemployment, crime_index, quality_of_life, health_care_index, cpi_index)
    if(new_country.isValid()){
        let db = req.db;
        try{
            let msg = await new_country.save(db);
            res.send(msg)
        }catch(err){
            res.send('There was an error while adding the country. (err:'+err+')');
            throw new Error(err);
        }
    }
    else{
        res.send('The country data you entered is invalid');
    }
}

const getOne = async (req, res) => {
    const country_name = req.params.name;
    let db = req.db;
    try{
        let obj = await Country.getCountryByName(db, country_name);
        res.send(obj);
    }catch(err){
        res.send('There was an error while retrieving the country information. (err:'+err+')');
        throw new Error(err);
    }
}

const updateOne = async (req, res) => {
    const country = req.body;
    const name = req.params.name;
    let db = req.db;
    try{
        let msg = await Country.update(db, name, country.happiness_score, country.Gdp, country.unemployment_rate);
        res.send(msg);
    }catch(err){
        res.send('There was an error while updating the country information. (err:'+err+')');
        throw new Error(err);
    }
}

const deleteOne = async (req, res) => {
    const name = req.params.name;
    let db = req.db;
    try{
        let msg = await Country.delete(db, name);
        res.send(msg);
    }catch(err){
        res.send('There was an error while deleting the country information. (err:'+err+')');
        throw new Error(err);
    }
}

const all = async (req, res) => {
    let db = req.db;
    try{
        let obj = await Country.getCountries(db)
        console.log(obj.length + ' countries were returned');
        res.send(obj);
    }catch(err){
        res.send('There was an error while retrieving all countries informations. (err:'+err+')');
        throw new Error(err);
    }
}

module.exports = {
    create,
    getOne,
    updateOne,
    deleteOne,
    all
}