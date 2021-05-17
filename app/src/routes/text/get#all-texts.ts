import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';
import { textController } from '@controllers/texts.controller'

module.exports = {
  permissions: "public",
  validate: {
    query: {
      q: Joi.string().required()
        .description("User query")
        .error(Error(BAD_REQUEST, "USERS_QUERY_IS_REQUIRED"))
    }
  },
  handler: async ({ query }: Request) => {
    const { q } = query;

    return await textController.search(q as String);
  },
};
