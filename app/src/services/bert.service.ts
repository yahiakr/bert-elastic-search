import { config } from "@environments/config";
import axios from "axios";

class BertService {

    baseUrl: String;
    
    constructor(baseUrl: String) {
      this.baseUrl = baseUrl;
    }

    async getTextEmbedding(text: String) {
      const response = await axios.post(`${config.bert.url}/embedding`, {context: text})
      return response.data;
    }

}
  
export const bertService = new BertService(config.bert.url!);