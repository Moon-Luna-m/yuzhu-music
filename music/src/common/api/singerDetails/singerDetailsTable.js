const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let singerDetailsSchema = new Schema({
  singerMid: {
    type: String,
    required: true
  },
  singerPMid: {
    type: String,
    required: true
  },
  singerFans: {
    type: Number,
    required: true
  },
  singerName: {
    type: String,
    required: true
  },
  singerImg_1: {
    type: String,
    required: true
  },
  singerImg_2: {
    type: String,
    required: true
  },
  songTotalNum: {
    type: Number,
    required: true
  },
  singerDesc: {
    type: String,
    required: true
  },
  songList: [{
    song_id: {
      type: Number,
      required: true
    },
    song_mid: {
      type: String,
      required: true
    },
    songName: {
      type: String,
      required: true
    },
      album_id: {
        type: Number,
        required: true
      },
      album_mid: {
        type: String,
        required: true
      },
      album_name: {
        type: String,
        required: true
      },
      album_pmid: {
        type: String,
        required: true
      }
  }]
})

let singerDetails = mongoose.model('singerDetails', singerDetailsSchema)
module.exports = {
  singerDetails
}
