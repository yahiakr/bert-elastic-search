import { Request } from 'express';
import Error from 'http-errors';
import Joi from "joi";
import { BAD_REQUEST } from 'http-status-codes';
import { Texts } from "@models/Text";
import { bertService } from "@services/bert.service";

module.exports = {
  permissions: "public",
  validate: { },
  handler: async ({ query }: Request) => {
    
    console.info("DB_SYNC_STARTED");
    let count = 0;
    
    const data = await Texts.find({});

    for (const doc of data) {
      console.info(`Generating document: ${count} embedding!`);
      console.info(`title: ${doc.title.fr}`);
      // await sleep(2000);
      let embedding = await bertService.getTextEmbedding(doc.title.fr);
      if(!doc.vector.length){
        doc.vector = embedding.vector;
        await doc.save();
      }
      count++;
    }

  },
};

function sleep(ms: any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
