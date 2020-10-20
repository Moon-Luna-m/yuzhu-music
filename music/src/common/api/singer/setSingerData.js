const request = require('request')
const fs = require('fs')
const {
  singerData
} = require('./singerTable')
module.exports = {
  getSingerData: function (req, response, err) {
    let body = req.body.singername
    singerData.find({
      singer_name: body
    }).then((data) => {
      if (data.length == 0) {
        request({
          method: "GET",
          url: "https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp",
          qs: {
            _: "1597217772153",
            g_tk: "5381",
            uin: "",
            format: "json",
            inCharset: "utf-8",
            outCharset: "utf-8",
            notice: "0",
            platform: "h5",
            needNewCode: 1,
            g_tk_new_20200303: 5381,
            w: req.body.singername,
            zhidaqu: "1",
            catZhida: "1",
            t: "0",
            flag: 1,
            ie: "utf-8",
            sem: "1",
            aggr: 0,
            perpage: 20,
            n: 30,
            p: 1,
            remoteplace: "txt.mqq.all"
          },
          headers: {
            "user-agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1`,
            "referer": "https://i.y.qq.com/n2/m/index.html",
            "cookie": `pgv_pvi=134465536; ts_uid=9385657894; pgv_pvid=1697968950; ts_refer=cn.bing.com/; RK=NEh9sv4GSi; ptcz=12d237b9bc3f7bdf53275dc47aa289b4841df5a65edde91ac0ed36e8aebe1b4c; yqq_stat=0; pgv_info=ssid=s7857429672; ts_last=y.qq.com/; pgv_si=s771783680`
          }
        }, (err, res, data) => {
          let finalData = {}
          let body = JSON.parse(data)
          finalData.singer_mid = body.data.zhida.singermid
          finalData.singer_name = body.data.zhida.singername
          finalData.song_num = body.data.zhida.songnum
          finalData.album_num = body.data.zhida.albumnum
          finalData.songlist = []
          body.data.song.list.forEach((song) => {
            let obj={}
            obj.song_name=song.songname
            obj.song_mid=song.songmid
            finalData.songlist.push(obj)
          })
          response.send(finalData)
          singerData.create(finalData).then(() => {
            console.log('歌手数据写入成功')
          }).catch(() => {
            console.log('歌手数据写入失败');
          })
        })
      } else {
        console.log('歌手数据查找成功');
        response.send(data)
      }
    })
  }
}
