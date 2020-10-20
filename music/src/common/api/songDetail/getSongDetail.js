const request = require('request')
const fs = require('fs')
const {
  JSDOM
} = require('jsdom')
const {
  songDetail
} = require('./songTable')
const express = require('express')
const bodyParser = require("body-parser")
let app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
songDetail.deleteMany({}).then(()=>{console.log('歌曲播放链接清除成功')}).catch(()=>{console.log('歌曲播放链接清除失败')})
module.exports = {
  getSongDetail: function (req, response, err) {
    //使用req.body需要引入中间件body-parser
    let body = req.body.songMid
    console.log(body);
    songDetail.find({
      songMid: body
    }).then(data => {
      //console.log(data);
      // console.log(body);
      if (data.length == 0) {
        request({
          url: "https://i.y.qq.com/v8/playsong.html",
          method: "GET",
          qs: {
            songmid: req.body.songMid
          },
          headers: {
            "user-agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1`
          }
        }, function (err, res, body) {
          let dom = new JSDOM(body, {
            runScripts: "dangerously"
          })
          let song = dom.window.songlist
          let finalData = {}
         
          finalData.songMid = song[0].songmid
          finalData.m4aUrl = song[0].m4aUrl
          finalData.songName = song[0].songname
          // finalData.playTime = song.playTime
          let arr = song[0].playTime.split(":")
          finalData.playTime = String(arr[0] * 60 + arr[1] * 1)
          if (song[0].pic.includes("http:")) {
            finalData.songPic = song[0].pic
          } else {
            finalData.songPic = "http:" + song[0].pic
          }
          response.send(finalData)
          songDetail.create(finalData).then(() => {
            console.log('写入成功')
          }).catch(() => {
            console.log('写入失败')
          })
        })
      } else {
        console.log('数据查找成功');
        response.send(data)
      }
    })
  }
}
