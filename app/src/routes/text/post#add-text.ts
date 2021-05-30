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
            .description("The title of the text")
            .error(Error(BAD_REQUEST, "TITLE_IS_REQUIRED")),
        cleanContent: Joi.string()
            .description("The content of the text")
            .error(Error(BAD_REQUEST, "CLEAN_CONTENT_MUST_BE_STRING"))
    }
  },
  handler: async ({ body }: Request) => {
    const { title, cleanContent } = body;

    const embedding = await bertService.getTextEmbedding(title);
    const vector = embedding.vector;

    return textController.Model.create({ title, vector, cleanContent });
  },
};
