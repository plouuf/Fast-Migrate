const Validator = require('validatorjs');

//function that returns the countries collection
async function _get_country_collection(db) {
  try {
    return await db.collection('countries');
  } catch (err) {
    throw err;
  }
}


class Country {
  constructor(name) {
    this.name = name;
  }
  
  //function that add country info to the object
  addCountryInfo(happiness_score, Gdp, unemployment_rate, crime_index, quality_of_life, health_care, cost_of_living) {
    this.happiness_score = happiness_score;
    this.Gdp = Gdp;
    this.unemployment_rate = unemployment_rate;
    this.crime_index = crime_index;
    this.quality_of_life = quality_of_life;
    this.health_care_index = health_care;
    this.cost_of_living = cost_of_living;
  }

  //function that check if a given country obj is valid based on name happiness gdp and unemployment which are the main fields
  //the rest of the fields are added from a 3rd party api which we don't have any control on
  isValid() { 
    const rules = {
      name: 'required|string',
      happiness_score: 'required|digits_between:0,10',
      Gdp: 'required',
      unemployment_rate: 'required'
    }

    const validation = new Validator(this, rules);
    return validation.passes();
  }

  //function that save a given country to the database then returns a promise
  async save(db) {
		var country =  this;
		return new Promise(async function (resolve, reject) {
			let collection = await _get_country_collection(db);
      collection.insertOne(country, (err, obj) => {
        if (!err) {
          console.log('1 document added.');
          resolve('Country correctly inserted in the Database!');
        } else {
          console.log('document not inserted.');
          reject('Country not inserted in the database.');
        }
      });	
		});
	};

  //function that updates a country then returns a promise
	static async update(db, name, happiness_score, Gdp, unemployment_rate) {
		return new Promise(async function (resolve, reject) {
			let collection = await _get_country_collection(db);
      let new_vals = {
        $set: {
          'happiness_score': happiness_score,
          'Gdp': Gdp,
          'unemployment_rate': unemployment_rate
        }
      };

			collection.updateOne({'name': name}, new_vals, (err, obj) => {
        if (err) throw err;
        if (obj.modifiedCount > 0) {
          console.log('1 document updated.');
          resolve('Country correctly updated!');
        } else {
          console.log('document not updated.');
          reject(`The Country with name ${name} is not valid!`);
        } 
			});
		});
	};

  //function that delete a country from the db then returns a promise
	static async delete(db, name) {
    var country_delete = name;
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);

      collection.deleteOne({'name': country_delete}, (err, obj) => {
        if (err) throw err;
        if (obj.result.n > 0) {
          console.log('1 document deleted.');
          resolve('Country deleted!');
        } else {
          console.log('document not deleted.');
          reject(`Country ${country_delete} was not found!`);
        }
			});
		});
	};
  
  //function that return a promise of a country obj by the given parameter name
	static async getCountryByName(db, name) {
    var name_get = name;
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);
      collection.find({'name': name}).toArray((err, items) => {
				if (err) throw err;
        if (items.length > 0) {
					console.log(`${items.length} item(s) sent.`);
          resolve(items);
        } else {
          console.log('Country was not found');
          reject(`There is no country with name: ${name_get}.`);
        }
			});
    });
	};

  //function that returns a promise of all the countries in the db
	static async getCountries(db) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);
      collection.find({}).toArray((err, items) => {
				if (err) throw err;
				if (items.length > 0) {
					console.log(`${items.length} item(s) sent.`);
          resolve(items);
        } else {
          reject('Database is empty!');
        }
      });
    });
	};
}

module.exports = Country