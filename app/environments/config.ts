require('dotenv').config()

export const config = {
    "database": {
      "url": process.env.MONSTER_MONGO_DB_URI
    },
    "bert": {
      "url": "http://d26c2a99750a.ngrok.io"
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