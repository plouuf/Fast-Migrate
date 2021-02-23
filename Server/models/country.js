
async function _get_country_collection (db){
  try{
  return await db.collection('countries');
}catch(err){
  throw err;
}    
};

class Country { 
  constructor(name, happiness_score) {
    this.name = name
    this.happiness_score = happiness_score
  }

  addCountryInfo() { 
    
  }

}

