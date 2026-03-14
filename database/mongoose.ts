import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

if (!global.mongooseCache) {
    global.mongooseCache = { conn: null, promise: null };
}
let cached = global.mongooseCache;


export async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI as string, options).then((mongoose) => mongoose);
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}