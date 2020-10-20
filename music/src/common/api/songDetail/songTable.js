const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/YUZHU', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let songDetailSchema = new Schema({
    songMid:{
        type:String,
        required:true
    },
    m4aUrl:{
        type:String,
        required:true
    },
    songName:{
        type:String,
        required:true
    },
    playTime:{
        type:String,
        required:true
    },
    songPic:{
        type:String,
        required:true
    }
})

let songDetail = mongoose.model('songDetail', songDetailSchema)
module.exports = {
    songDetail
}
