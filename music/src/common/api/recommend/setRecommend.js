const request = require('request')
const fs = require('fs')
const {
  recommendData
} = require('./recommendTable')
const {
  hotKeyData
} = require('./hotKeyTable')

request.get({
  method: "GET",
  url: "https://u.y.qq.com/cgi-bin/musicu.fcg",
  qs: {
    cgiKey: "GetHomePage",
    _: "1596595377872",
    data: `{"comm":{"g_tk":5381,"uin":"","format":"json","inCharset":"utf-8","outCharset":"utf-8","notice":0,"platform":"h5","needNewCode":1},"MusicHallHomePage":{"module":"music.musicHall.MusicHallPlatform","method":"MobileWebHome","param":{"ShelfId":[101,102,161]}},"hotkey":{"module":"tencent_musicsoso_hotkey.HotkeyService","method":"GetHotkeyForQQMusicMobile","param":{"remoteplace":"txt.miniapp.wxada7aab80ba27074","searchid":"1559616839293"}}}`
  }
}, async (err, res, body) => {
  await recommendData.deleteMany({}); //清空数据库
  await hotKeyData.deleteMany({})
  let data = JSON.parse(body).MusicHallHomePage.data.v_shelf
  let hotKey = JSON.parse(body).hotkey
  let keyWords = {}
  keyWords.hotKey = []
  hotKey.data.track_info.forEach(name => {
    let obj = {}
    obj.songName = name.name
    keyWords.hotKey.push(obj)
  })
  hotKeyData.create(keyWords).then(() => {
      console.log('写入成功');
    })
    .catch(() => {
      console.log('写入失败');
    })
  data.forEach(item => {
    let classify = item.title_template
    let classifyList = item.v_niche[0].v_card
    let arr = []
    classifyList.forEach(list => {
      if (list.time) {
        return
      } else {
        arr.push({
          id: list.id,
          cover: list.cover,
          title: list.title,
          cnt: list.cnt
        })
      }
    })
    if (arr.length != 0) {
      recommendData.create({
          classify: classify,
          classifyList: arr
        })
        .then(() => {
          console.log('写入成功');
        })
        .catch(() => {
          console.log('写入失败');
        })
    }
  })
})
