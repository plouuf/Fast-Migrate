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

	static async update(db, name, happiness_score, Gdp, unemployment_rate, crime_index, quality_of_life, health_care, cost_of_living) {
		return new Promise(async function (resolve, reject) {
			let collection = await _get_country_collection(db);
      let new_vals = {
        $set: {
          'happiness_score': happiness_score,
          'Gdp': Gdp,
          'unemployment_rate': unemployment_rate,
          'crime_index': crime_index,
          'quality_of_life': quality_of_life,
          'health_care': health_care,
          'cost_of_living': cost_of_living
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