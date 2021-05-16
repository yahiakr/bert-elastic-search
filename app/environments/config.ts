require('dotenv').config()

export const config = {
    "database": {
      "url": process.env.MONSTER_MONGO_DB_URI
    },
    "bert": {
      "url": "http://c4c88632cbc3.ngrok.io"
    },
    "elastic": {
      "url": "http://localhost:9200"
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