const MongoClient = require("mongodb").MongoClient
const uri ="mongodb://localhost:27017";
const client = new MongoClient(uri, { useUnifiedTopology: true });

/**
 * A function to establish a connection with a MongoDB instance.
 */
async function connectToDB() {
    try {
        // Connect the client to the server
        await client.connect();
        // Our db name is going to be FastMigrate
        let db = client.db('FastMigrate');
        console.log("Successfully connected to mongoDB");  
        return db;
    } catch (err) {
        throw err;
    } 
}

async function getDb() {
    return db;
}

async function closeDBConnection(){
    try{
        await client.close();    
    }catch(err){
        throw err;
    }    
};


module.exports = {connectToDB, getDb, closeDBConnection}