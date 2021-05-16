import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';
import { textController } from '@controllers/texts.controller'

module.exports = {
  permissions: "public",
  validate: {},
  handler: async ({ query, user }: Request) => {
    return await textController.search();
  },
};
