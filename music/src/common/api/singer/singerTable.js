const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let singerSchema = new Schema({
  singer_mid: {
    type: String,
    required: true
  },
  singer_name: {
    type: String,
    required: true
  },
  song_num: {
    type: Number,
    required: true
  },
  album_num: {
    type: Number,
    required: true
  },
  songlist: [{
    song_name: {
      type: String,
      required: true
    },
    song_mid:{
        type: String,
        required: true
    }
  }]
})

let singerData = mongoose.model('singerData', singerSchema)
module.exports = {
  singerData
}
