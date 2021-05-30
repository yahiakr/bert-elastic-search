import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';
import { synchronize } from '@services/elasticsearch'

module.exports = {
  permissions: "public",
  validate: { },
  handler: async ({ query }: Request) => {
    return await synchronize();
  },
};
