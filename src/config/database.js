const { MongoClient } = require("mongodb");
require('dotenv').config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = "HelloWorld";

async function main() {
   // Use connect method to connect to the server
    await client.connect();
    console.log("Successfully connected");
    const db = client.db(dbName);
    const collection = db.collection('User');

    const data = {
    firstname: "Deepika",
    lastname: "Padukone",
    city: "Mumbai",
    phoneNumber: "7982828272"
    };
    // CRUD OPERATIONS
    // Create data
    const insertResult = await collection.insertMany([data]);
    console.log('Inserted documents =>', insertResult);

    // Read data
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);

    // Update data
    const updateResult = await collection.updateOne(
    { firstname: "Deepika" }, 
    { $set: { firstname: "Anjali" }});
    console.log('Updated documents =>', updateResult);

    // Delete data
    const deleteResult = await collection.deleteMany({ firstname: "Anjali" });
    console.log("Deleted documents =>", deleteResult);

    return 'done.';
};

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
