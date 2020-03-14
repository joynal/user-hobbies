import httpStatus from 'http-status';
import { Response, Request, NextFunction } from "express";

import APIError from './APIError';
import { env } from '../config/vars';

export const handler = (err: APIError, req: Request, res: Response, next?: NextFunction) => {
  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
  };

  if (env !== 'development') delete response.stack;

  return res.status(+err.status).send(response);
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError(<any>{
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
