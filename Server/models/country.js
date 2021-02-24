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

  addCountryInfo(crime_index, quality_of_life, health_care, cost_of_living, Gdp, happiness_score, employment_rate) {
    this.crime_index = crime_index;
    this.quality_of_life = quality_of_life;
    this.health_care = health_care;
    this.cost_of_living = cost_of_living;
    this.Gdp = Gdp;
    this.happiness_score = happiness_score;
    this.employment_rate = employment_rate;
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

	static async update(db) {
		return new Promise(async function (resolve, reject){
			//
		});
	};

	static async delete(db) {
		return new Promise(async function (resolve, reject){
			//
		});
	};
	
	static async getCountryByName(db) {
		return new Promise(async function (resolve, reject){
			//
		});
	};

	static async getCountries(db) {
		return new Promise(async function (resolve, reject){
			//
		});
	};
}
