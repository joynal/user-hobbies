import generateData from './generator';
import connect from '../config/database';

connect();
generateData();

process.exit(0);

