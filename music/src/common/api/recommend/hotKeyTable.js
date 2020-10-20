const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let hotKeySchema = new Schema({
  hotKey: [{
    songName: {
      type: String,
      required: true
    }
  }]
})

let hotKeyData = mongoose.model('hotKeyData', hotKeySchema)
module.exports = {
  hotKeyData
}
