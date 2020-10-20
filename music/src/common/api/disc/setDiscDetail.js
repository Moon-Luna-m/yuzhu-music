const request = require('request')
const fs = require('fs')
const {
  discData
} = require('./discTable')

request({
  url: "https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?picmid=1&rnd=0.0018296426479929018&g_tk_new_20200303=5381&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&categoryId=10000000&sortId=5&sin=0&ein=19",
  method: "GET",
  headers: {
    referer: "https://y.qq.com/portal/playlist.html",
    cookie: `pgv_pvi=134465536; pgv_pvid=1697968950; ts_uid=9385657894; RK=NEh9sv4GSi; ptcz=12d237b9bc3f7bdf53275dc47aa289b4841df5a65edde91ac0ed36e8aebe1b4c; yqq_stat=0; pgv_si=s4605714432; pgv_info=ssid=s7334391080; ts_refer=ADTAGmyqq; userAction=1; ts_last=y.qq.com/portal/playlist.html`,
    'user-agent': `Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36`
  },
  qs: {
    sin: 20
  }
}, async (err, res, body) => {
  await discData.deleteMany({})
  let data = JSON.parse(body)
  let finalData = {}
  finalData.disclist = []
  data.data.list.forEach(disc => {
    let obj = {}
    obj.dissid = disc.dissid
    obj.dissname = disc.dissname
    obj.listennum = disc.listennum
    obj.cover = disc.imgurl
    finalData.disclist.push(obj)
  })
  discData.create(finalData).then(() => {
    console.log('歌单信息写入成功')
  }).catch(() => {
    console.log('歌单信息写入失败');
  })
})

module.exports=({
    getDiscData:function(req,res){
        discData.find({}).then(data=>{
            res.send(data)
        },{
            __v: false,
            _id: false
        }).catch(err=>{
            throw err
        })
    }
})