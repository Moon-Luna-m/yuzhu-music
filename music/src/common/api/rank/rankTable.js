const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let rankSchema = new Schema({
  group: [{
    groupID: {
      type: Number,
      required: true
    },
    groupName: {
      type: String,
      required: true
    },
    toplist: [{
      AdShareContent: {
        type: String,
        required: true
      },
      musichallTitle: {
        type: String,
        required: true
      },
      picUrl: {
        type: String,
        required: true
      },
      listenNum: {
        type: Number,
        required: true
      },
      topId: {
        type: Number,
        required: true
      },
      rankSong: [{
        singerMid: {
          type: String,
          required: true
        },
        singerName: {
          type: String,
          required: true
        },
        songId: {
          type: Number,
          required: true
        },
        title: {
          type: String,
          required: true
        }
      }]
    }]
  }]

})

let rankData = mongoose.model('rankData', rankSchema)
module.exports = {
  rankData
}
