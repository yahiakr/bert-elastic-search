import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';
import { queryValidator } from '@shared/validators';

module.exports = {
  permissions: "readAny.product",
  validate: {},
  handler: async ({ query, user }: Request) => {
      return "a simple text!"
  },
};
