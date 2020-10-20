const request = require('request')
const fs = require('fs')
const {
  recommendDetailTable
} = require('./detailTable')
const {
  JSDOM
} = require('jsdom')
module.exports = {
  getRecommendDetails: function (req, res) {
    request({
      method: "GET",
      url: "https://i.y.qq.com/n2/m/share/details/taoge.html",
      qs: {
        ADTAG: "myqq",
        from: "myqq",
        channel: "10007100",
        id: req.params.id
      }
    }, (err, response, body) => {
      /*
      注意：这里的接口请求的数据是写在页面里的js里再进行请求的
          所以需要使用jsdom运行请求网页的js文件进行数据的请求
      */
      let dom = new JSDOM(body, {
        runScripts: "dangerously"
      })
      let songlist = JSON.stringify(dom.window.firstPageData)
      recommendDetailTable.find({
        id: req.params.id
      }).then(data => {
        if (data.length == 0) {
          console.log('当前数据库没有数据');
          let songList = JSON.parse(songlist)
          let finalData = {}; //存储待添加到数据库里的数据
          finalData.id = songList.taogeData.id; //设置歌单id
          finalData.cover = songList.taogeData.picurl2; //设置歌单封面
          if (finalData.cover=='') {
            finalData.cover = songList.taogeData.picurl
          }
          finalData.title = songList.taogeData.title; //设置歌单名称
          finalData.tag = songList.taogeData.tag
          finalData.songlist = []
          songList.taogeData.songlist.forEach(item => {
            let singer = item.singer
            finalData.songlist.push({
              singer: singer,
              mid: item.mid,
              name: item.name
            })
          })
          res.send(JSON.stringify(finalData))
          recommendDetailTable.create(finalData)
        } else {
          console.log('当前数据库有数据');
          res.send(JSON.stringify(data))
        }
      })
    })

  }
}
