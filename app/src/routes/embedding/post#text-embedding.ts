import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';
import axios from "axios";
import { config } from "@environments/config"

module.exports = {
    permissions: "public",
    validate: {
        body: {
            text: Joi.string().required()
                .description("The text to get it's embedding")
                .error(Error(BAD_REQUEST, "TEXT_IS_REQUIRED"))
        }
    },
    handler: async ({ body }: Request) => {
        const { text } = body;

        const response = await axios.post(`${config.bert.url}/embedding`, {context: text})
        return response.data;
    },
};