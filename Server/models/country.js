async function _get_country_collection(db) {
  try {
    return await db.collection('countries');
  } catch (err) {
    throw err;
  }
}

class Country {
  constructor(name, happiness_score, employment_rate) {
    this.name = name;
    this.happiness_score = happiness_score;
    // this.employment_rate = employment_rate;
  }

  addCountryInfo(crime_index, quality_of_life, health_care, cost_of_living) {
    this.crime_index = crime_index;
    this.quality_of_life = quality_of_life;
    this.health_care = health_care;
    this.cost_of_living = cost_of_living;
  }
}
