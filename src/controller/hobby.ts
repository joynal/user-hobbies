import { Response, Request } from "express";
import httpStatus from 'http-status';
import HobbyModel from '../models/hobby';
import handleError from "../middleware/error";

export const getList = handleError(async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit, 10) || 10;
  const currentPage = parseInt(req.query.page, 10) || 1;
  const skip = (currentPage - 1) * limit;
  const query: any = { userId: req.params.id };
  const countQuery: any = { userId: req.params.id };
  const sort = {};
  let order = -1;
  const orderBy = req.query.orderBy ? req.query.orderBy : 'createdAt';

  if (req.query.order && req.query.order === 'asc') order = 1;

  sort[orderBy] = order;

  if (req.query.search) {
    query.name = { $regex: new RegExp(req.query.search, 'i') };
    countQuery.name = { $regex: new RegExp(req.query.search, 'i') };
  }

  const hobbies = await HobbyModel
    .find(query)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .select('-__v')
    .lean();

  const total = await HobbyModel.countDocuments(countQuery);

  return res.status(httpStatus.OK).send({ data: hobbies, total });
});

export const getSingle = handleError(async (req: Request, res: Response) => {
  const hobby = await HobbyModel.findById(req.params.id)
    .populate('user')
    .select('-__v')
    .lean();

  if (hobby) return res.status(httpStatus.OK).send(hobby);

  return res.status(httpStatus.NOT_FOUND).send();
});

export const add = handleError(async (req: Request, res: Response) => {
  const hobby = await HobbyModel.create({ ...req.body, userId: req.params.id });
  return res.status(httpStatus.OK).send(hobby);
});

export const update = handleError(async (req: Request, res: Response) => {
  const afterUpdate = await HobbyModel
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .select('-__v');

  if (afterUpdate) return res.status(httpStatus.OK).send(afterUpdate);

  return res.status(httpStatus.NOT_FOUND).send();
});

export const remove = handleError(async (req: Request, res: Response) => {
  const afterRemove = await HobbyModel.findByIdAndRemove(req.params.id);

  if (afterRemove) return res.status(httpStatus.OK).send();

  return res.status(httpStatus.NOT_FOUND).send();
});
