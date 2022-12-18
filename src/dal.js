import data from './mockData/data.json' assert { type: "json" };
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
// import environment variables 
dotenv.config();

// Connection URL
const url = process.env.MONGO_CLIENT_URL;
const client = new MongoClient(url);
const dbName = 'talonDB';
const collectionName = 'systemEvents';

async function initDB() {
    await client.connect();
    const db = client.db(dbName);
    // Check if we already have collection with data
    const collectionExists = (await db.listCollections().toArray()).some(collection => collection.name === collectionName);
    if (!collectionExists) {
        const collection = db.collection('systemEvents');
        await collection.insertMany(data);
    }
}
// Returning resuslt as: []
async function getAllEventTypes() {
    const collection = client.db('talonDB').collection('systemEvents');
    const systemEvents = await collection.distinct("eventType");

    return systemEvents;
}
// Returning resuslt as: {count: number ,data:[]}
async function getFilteredEvents(eventsName, amount, skip) {
    const collection = client.db('talonDB').collection('systemEvents');
    const queryVar = eventsName.map(eventTypeName => ({ eventType: eventTypeName }));
    const filter = queryVar.length > 0 ? { $or: queryVar } : {};
    const options = {
        sort: { time: -1 },
        limit: amount,
        skip: skip
    };
    
    const cursor = collection.find(filter, options);
    const eventsArray = await cursor.toArray();
    const count = await client.db('talonDB').collection('systemEvents').countDocuments(filter);

    return { count: count, data: eventsArray };
}

export { initDB, getAllEventTypes, getFilteredEvents };
