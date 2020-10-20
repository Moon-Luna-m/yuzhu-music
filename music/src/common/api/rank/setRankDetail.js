const request = require('request')
const fs = require('fs')
const {rankData} = require('./rankTable')
request({
  url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
  method: "GET",
  qs: {
    _: 1597313866221,
    data: `{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1,"ct":23,"cv":0},"topList":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}}}`
  }
}, async (err, res, body) => {
  await rankData.deleteMany({})
  let data = JSON.parse(body)
  let finalData = {}
  finalData.group = []
  data.topList.data.group.forEach(rank => {
    let obj = {}
    obj.groupID = rank.groupId
    obj.groupName = rank.groupName
    obj.toplist = []
    rank.toplist.forEach(detail => {
      let obj1 = {}
      obj1.AdShareContent = detail.AdShareContent
      obj1.musichallTitle = detail.musichallTitle
      obj1.picUrl = detail.frontPicUrl
      obj1.listenNum = detail.listenNum
      obj1.topId = detail.topId
      obj1.rankSong = []
      detail.song.forEach(song => {
        let obj2 = {}
        obj2.singerMid = song.singerMid
        obj2.singerName = song.singerName
        obj2.songId = song.songId
        obj2.title = song.title
        obj1.rankSong.push(obj2)
      })
      obj.toplist.push(obj1)
    })
    finalData.group.push(obj)
  })
  rankData.create(finalData).then(() => {
    console.log('排行信息写入成功')
  }).catch(() => {
    console.log('排行信息写入失败');
  })
})
