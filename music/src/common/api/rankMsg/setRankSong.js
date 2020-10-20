const request = require('request')
const fs = require('fs')
const {
  JSDOM
} = require('jsdom')
const {
  rankSong
} = require('./rankSongTable')

module.exports = {
  getRankSong: function (req, response) {
    let topID = req.body.topId
    rankSong.find({
      topId: topID
    }).then(data => {
      if (data.length == 0) {
        console.log('此时数据库中没有该排行歌单信息');
        request({
          url: "https://i.y.qq.com/n2/m/share/details/toplist.html",
          qs: {
            ADTAG: "myqq",
            from: "myqq",
            channel: 10007100,
            id: topID
          }
        }, (err, res, body) => {
          let dom = new JSDOM(body, {
            runScripts: "dangerously"
          }).window.firstPageData
          let finalData = {}
          if (dom == undefined) {
            return
          }
          finalData.topId = dom.toplistData.topId
          finalData.titleDetail = dom.toplistData.titleDetail
          finalData.intro = dom.toplistData.intro
          finalData.updateTime = dom.toplistData.updateTime
          finalData.listenNum = dom.toplistData.listenNum
          finalData.totalNum = dom.toplistData.totalNum
          finalData.song = []
          dom.toplistData.song.forEach((song, index) => {
            let obj = {}
            if (dom.songInfoList.length != 0) {
              obj.songMid = dom.songInfoList[index].mid
            }
            obj.title = song.title
            obj.singerName = song.singerName
            obj.singerMid = song.singerMid
            finalData.song.push(obj)
          })
          response.send(finalData)
          rankSong.create(finalData).then(() => {
            console.log('排行歌单信息写入成功')
          }).catch(() => {
            console.log('排行歌单信息写入失败');
          })
        })

      } else {
        response.send(data)
        console.log('此时数据库中有该排行榜单歌曲');
      }
    })
  }
}
