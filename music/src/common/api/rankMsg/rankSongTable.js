const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let rankSongSchema = new Schema({
  topId: {
    type: Number,
    required: true
  },
  titleDetail: {
    type: String,
    required: true
  },
  intro: {
    type: String,
    required: true
  },
  updateTime: {
    type: String,
    required: true
  },
  listenNum:{
    type: Number,
    required: true
  },
  totalNum:{
    type: Number,
    required: true
  },
  song:[{
      songMid:{
        type: String,
        required: true
      },
      title:{
        type: String,
        required: true
      },
      singerName:{
        type: String,
        required: true
      },
      singerMid:{
        type: String,
        required: true
      }
  }]
})

let rankSong = mongoose.model('rankSong', rankSongSchema)
module.exports = {
  rankSong
}
