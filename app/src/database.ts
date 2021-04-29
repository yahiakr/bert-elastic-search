import mongoose from "mongoose";
import { config } from '@environments/config';
import logger from "@services/Logger";


mongoose.connect(
  config.database.url!,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
  }
)
.then(() => logger.info('MongoDB Connected'))
.catch((err: any) => console.log(err));

