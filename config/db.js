import { MongoClient } from "mongodb"; 
import {config} from './env.js'
const client = new MongoClient(config.mongoUrl);
let db = null;
export const connectDB = async () => {
    if (db) return db;
    try {
        await client.connect();
        db = client.db(config.dbName);
        await db.command({ ping: 1 });
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
        console.log('Database connected!');
        return db
    } catch (err) {
        console.error('Database connected failed', err);
        process.exit(1);
    }
};

export const getDB = () => {
    if (!db) throw new Error("Database not found!");
    return db;
};