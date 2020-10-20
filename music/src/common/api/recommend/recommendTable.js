const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let recommendSchema = new Schema({
  classify: {
    type: String,
    required: true
  },
  classifyList: [{
    id: {
      type: String,
      required: true
    },
    cover: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    cnt:{
      type: Number,
      required: true
    }
  }]
})

let recommendData = mongoose.model('recommendData', recommendSchema)
module.exports = {
  recommendData
}
