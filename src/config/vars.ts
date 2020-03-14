import { config } from 'dotenv';

// load .env file
config();

const env = process.env.NODE_ENV;
const port = process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT;
const dbUri = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URI : process.env.DB_URI;
const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

export { env, port, dbUri, logs };
