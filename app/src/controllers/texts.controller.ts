import { Model } from 'mongoose';
import { Texts, IText } from "@models/Text";


class TextController {

    Model: Model<IText>;
    
    constructor(Model: Model<IText>) {
      this.Model = Model;
    }

}
  
export const textController = new TextController(Texts);