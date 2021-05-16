import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';
import { textController } from '@controllers/texts.controller'
import { bertService } from "@services/bert.service";

module.exports = {
  permissions: "public",
  validate: {
    body: {
        title: Joi.string().required()
            .description("The title to get it's embedding")
            .error(Error(BAD_REQUEST, "TITLE_IS_REQUIRED"))
    }
  },
  handler: async ({ body }: Request) => {
    const { title } = body;

    const embedding = await bertService.getTextEmbedding(title);
    const vector = embedding.vector;

    return textController.Model.create({ title, vector });
  },
};
