const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let recommendDetailSchema = new Schema({
  id: {
    required: true,
    type: String
  },
  //歌单封面
  cover: {
    required: true,
    type: String
  },
  //歌单名称
  title: {
    required: true,
    type: String
  },
  //歌单种类
  tag: [{
    id: {
      require: true,
      type: Number
    },
    name: {
      required: true,
      type: String
    }
  }],
  songlist: [{
    mid: {
      require: true,
      type: String
    },
    name: {
      require: true,
      type: String
    },
    singer: [{
      id: String,
      mid: String,
      name: String, //歌手名称
      title: String
    }]
  }]
})

let recommendDetailTable = mongoose.model("recommendDetailTable", recommendDetailSchema)

module.exports = {
  recommendDetailTable
}
