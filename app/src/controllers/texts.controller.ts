import { Model } from 'mongoose';
import { Texts, IText } from "@models/Text";
import { config } from "@environments/config";

import { Client } from '@elastic/elasticsearch'
import { bertService } from '@services/bert.service';
const client = new Client({
  node: config.elastic.url!
})

class TextController {

    Model: Model<IText>;
    
    constructor(Model: Model<IText>) {
      this.Model = Model;
    }

    async search(query: String) {

      const embedding = await bertService.getTextEmbedding(query);

      const response = await client.search({
        index: 'texts',
        body: {
          query: {
            "elastiknn_nearest_neighbors": {
              "field": "vector",
              "vec": {
                  "values": embedding.vector,
              },
              "model": "exact",
              "similarity": "angular",
            }
          }
        }
      })
      // .catch((err: any) => { console.log(err.body.error) })
  
      return response.body;
    }

}
  
export const textController = new TextController(Texts);