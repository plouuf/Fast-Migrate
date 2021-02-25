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

  addCountryInfo(happiness_score, Gdp, crime_index, quality_of_life, health_care, cost_of_living) {
    this.happiness_score = happiness_score;
    this.Gdp = Gdp;
    // this.unemployment_rate = unemployment_rate;
    this.crime_index = crime_index;
    this.quality_of_life = quality_of_life;
    this.health_care = health_care;
    this.cost_of_living = cost_of_living;
  }

  async save(db) {
		var country =  this;
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);
      collection.insertOne(country, (err, obj) => {
        if (!err) {
          console.log("1 document added.");
          resolve("Country correctly inserted in the Database!");
        } else {
          console.log("document not inserted.");
          reject("Country not inserted in the database.");
        }
      });	
		});
	};

	static async update(db, name, happiness_score, Gdp, unemployment_rate, crime_index, quality_of_life, health_care, cost_of_living) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);
			let new_vals = {$set: {'happiness_score': happiness_score, 'Gdp': Gdp, 'unemployment_rate': unemployment_rate, 'crime_index': crime_index, 'quality_of_life' : quality_of_life, 'health_care' : health_care, 'cost_of_living' : cost_of_living}};

			collection.updateOne({'name': name}, new_vals, (err, obj) => {
				if (err) {
					console.log("The country with name = "+name+" was not updated in the database.");
					reject('Error: Country not updated in database');
				}
				
				resolve('Country correctly updated in database');
				console.log("The country with name = "+name+" was correctly updated in the database.");
			});
		});
	};

	static async delete(db, name) {
    var country_delete = name;
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);

      collection.deleteOne({'name': country_delete}, (err, obj) => {
				if (err) {
					console.log("The country with name = "+country_delete+" was not deleted in the database.")
					reject('Error: Country not deleted in database');
				}

				resolve('Country correctly deleted in database');
				console.log("The country with name = "+country_delete+" was correctly deleted in the database.");
			});
		});
	};
	
	static async getCountryByName(db, name) {
    var name_get = name;
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);

      collection.find({"name": name}).toArray((err, items)=> {
				if (err) {
					console.log("The country with name = "+country_get+" was not found in the database.");
					reject('Error: No country with name = '+country_get+' in database.');
				}

				resolve(items);
				console.log("The country with name = "+country__get+" was found in the database.");
			});

    });
	};

	static async getCountries(db) {
		return new Promise(async function (resolve, reject){
			let collection = await _get_country_collection(db);

      collection.find({}).toArray((err, items) => {
				if (err) {
					console.log('No countries were retrieved from the database.');
					reject('Error: No countries retrieved from database');
				}
				
				if(items.length == 0) {
					console.log("Database is empty");
				}

				resolve(items);
				console.log(items.length+" countries sent.");
    });
	};
}

module.exports = Country