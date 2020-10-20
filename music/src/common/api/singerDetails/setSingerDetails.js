const request = require('request')
const fs = require('fs')
const {
  JSDOM
} = require('jsdom')
const {
  singerDetails
} = require('./singerDetailsTable')
module.exports = {
  getSingerDetails: function (req, response, err) {
    //   console.log(req.body);使用req.body需要引入中间件body-parser
    let body = req.body.singerMid
    singerDetails.find({
      singerMid: body
    }).then(data => {
      //console.log(data);
      // console.log(body);
      if (data.length == 0) {
        request({
          method: "GET",
          url: "https://i.y.qq.com/n2/m/share/profile_v2/index.html",
          qs: {
            ADTAG: "newyqq.singer",
            source: "ydetail",
            singermid: body
          }
        }, (err, res, body) => {
          let dom = new JSDOM(body, {
            runScripts: "dangerously"
          })
          let singerDetail = dom.window.firstPageData
          let finalData = {}
          finalData.singerMid = singerDetail.data.singerMid
          finalData.singerPMid = singerDetail.data.singerPMid
          finalData.singerFans = singerDetail.data.fansNum
          finalData.singerName = singerDetail.data.name
          finalData.singerImg_1 = singerDetail.data.avatar
          finalData.singerImg_2 = singerDetail.data.backgroundImage
          finalData.songTotalNum = singerDetail.data.tabList[0].tabItemNum
          finalData.singerDesc = singerDetail.data.certificateJumpInfoV2.wiki
          finalData.songList = []
          singerDetail.data.tabInfo.list.forEach(item => {
            let obj = {}
            obj.song_id = item.id
            obj.song_mid = item.mid
            obj.songName = item.name
            obj.album_id = item.album.id
            obj.album_mid = item.album.mid
            obj.album_name = item.album.name
            obj.album_pmid = item.album.pmid
            finalData.songList.push(obj)
          })
          response.send(finalData)
          singerDetails.create(finalData).then(res => {
            console.log('写入成功');
          }).catch(err => {
            console.log('写入失败');
          })
        })
      } else {
        console.log('数据查找成功');
        response.send(data)
      }
    })
  }
}
