import { Response, Request } from "express";
import httpStatus from 'http-status';
import UserModel from '../models/user';
import HobbyModel from '../models/hobby';
import handleError from "../middleware/error";

export const getList = handleError(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const skip = (currentPage - 1) * limit;
  const query: any = {};
  const countQuery: any = {};
  const sort = {};
  let order = -1;
  const orderBy = req.query.orderBy ? req.query.orderBy : 'createdAt';

  if (req.query.order && req.query.order === 'asc') order = 1;

  sort[orderBy] = order;

  if (req.query.search) {
    query.name = { $regex: new RegExp(req.query.search, 'i') };
    countQuery.name = { $regex: new RegExp(req.query.search, 'i') };
  }

  const users = await UserModel
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('hobbies')
    .select('-__v')
    .lean();

  const total = await UserModel.countDocuments(countQuery);

  return res.status(httpStatus.OK).send({ data: users, total });
});

export const getSingle = handleError(async (req: Request, res: Response) => {
  const user = await UserModel.findById(req.params.id)
    .populate('hobbies')
    .select('-__v')
    .lean();

  if (user) return res.status(httpStatus.OK).send(user);

  return res.status(httpStatus.NOT_FOUND).send();
});

export const add = handleError(async (req: Request, res: Response) => {
  const user = await UserModel.create(req.body);
  return res.status(httpStatus.OK).send(user);
});

export const update = handleError(async (req: Request, res: Response) => {
  const afterUpdate = await UserModel
    .findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true })
    .select('-__v');

  if (afterUpdate) return res.status(httpStatus.OK).send(afterUpdate);

  return res.status(httpStatus.NOT_FOUND).send();
});

export const remove = handleError(async (req: Request, res: Response) => {
  const afterRemove = await UserModel.findByIdAndRemove(req.params.id);
  await HobbyModel.deleteMany({ userId: req.params.id });

  if (afterRemove) return res.status(httpStatus.OK).send();

  return res.status(httpStatus.NOT_FOUND).send();
});
