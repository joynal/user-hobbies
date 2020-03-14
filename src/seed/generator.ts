import { users, hobbies } from './data';
import UserModel from '../models/user';
import HobbyModel from '../models/hobby';

export default async () => {
  try {
    await UserModel.insertMany(users);
    await HobbyModel.insertMany(hobbies);
  } catch (err) {
    console.error(err);
  }
};
