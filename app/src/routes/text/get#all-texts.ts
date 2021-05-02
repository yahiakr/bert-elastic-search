import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';

module.exports = {
  permissions: "public",
  validate: {},
  handler: async ({ query, user }: Request) => {
      return "a simple text!"
  },
};