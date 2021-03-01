const Validator = require('validatorjs');

async function _get_user_collection(db) {
  try {
    return await db.collection('users');
  } catch (err) {
    throw err;
  }
}

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  
  isValid() { 
    const rules = {
      username: 'required|string',
      password: 'required'
    }

    const validation = new Validator(this, rules);
    return validation.passes();
  }

  async save(db) {
		var user =  this;
		return new Promise(async function (resolve, reject) {
			//
		});
	};

	static async update(db) {
		return new Promise(async function (resolve, reject) {
			//
		});
	};

	static async delete(db) {
    return new Promise(async function (resolve, reject) {
      //
		});
	};
	
	static async getUserByUsername(db, uname) {
    var uname_get = uname;
		return new Promise(async function (resolve, reject){
			//
    });
	};
}

module.exports = User