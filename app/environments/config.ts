require('dotenv').config()

export const config = {
    "database": {
      "url": process.env.MONSTER_MONGO_DB_URI
    },
    "bert": {
      "url": process.env.BERT_SERVICE_URI
    },
    "elastic": {
      "url": process.env.ELASTIC_SEARCH_URI
    },
    "aws": {
      "aws_reigion": "",
      "aws_profile": "",
      "aws_media_bucket": "",
    },
    "jwt": {
      "secret": process.env.JWT_SECRET
    }
}