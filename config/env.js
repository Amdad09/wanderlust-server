import 'dotenv/config'
const requireEnv = (name) => {
    const value = process.env[name];
    if (!value) throw new Error(`${name} is required!`);
    return value;
};

export const config = {
    port: requireEnv('PORT' || 5000),
    dbName: requireEnv('DB_NAME'),
    mongoUrl: requireEnv('MONGO_URL'),
};