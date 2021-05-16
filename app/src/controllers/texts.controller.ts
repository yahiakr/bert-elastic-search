import { Model } from 'mongoose';
import { Texts, IText } from "@models/Text";
import { config } from "@environments/config";

import { Client } from '@elastic/elasticsearch'
const client = new Client({
  node: config.elastic.url!
})

class TextController {

    Model: Model<IText>;
    
    constructor(Model: Model<IText>) {
      this.Model = Model;
    }

    async search() {
      const response = await client.search({
        index: 'texts',
        body: {
          query: {
            match_all: {}
          }
        }
      })
  
      return response.body;
    }

}
  
export const textController = new TextController(Texts);