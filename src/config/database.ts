import mongoose from 'mongoose';
import { dbUri, env } from './vars';

// set mongoose Promise
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

export default () => {
  mongoose.connect(dbUri, {
    useCreateIndex: true,
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
    .then(() => console.log('MongoDB connected...'));
  return mongoose.connection;
};
