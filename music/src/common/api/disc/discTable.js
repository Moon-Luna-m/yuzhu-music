const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let discSchema = new Schema({
  disclist: [{
    dissid: {
      type: String,
      required: true
    },
    dissname: {
      type: String,
      required: true
    },
    listennum: {
      type: Number,
      required: true
    },
    cover: {
      type: String,
      required: true
    }
  }]

})

let discData = mongoose.model('discData', discSchema)
module.exports = {
  discData
}
