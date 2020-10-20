const express = require('express')
const bodyParser = require('body-parser')
const {getRecommendData}=require('./api/recommend/getRecommendData')
const {getRecommendDetails} = require('./api/recommendDetails/setRecommendDetails')
const {getSingerDetails} = require('./api/singerDetails/setSingerDetails')
const {getSongDetail} = require('./api/songDetail/getSongDetail')
const {getSingerData} = require('./api/singer/setSingerData')
const {getDiscData} = require('./api/disc/setDiscDetail')
const {getRankData} = require('./api/rank/getRankMsg')
const {getRankSong} = require('./api/rankMsg/setRankSong')
let app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//对传入的请求体进行解析
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method==="OPTIONS") { //判断是否支持方法
      res.status(200).send("OK")
      console.log("has option");
  }else{
    next();
  }
});
//合并所有的api接口
app.get('/api/getRecommendData',getRecommendData)
app.get('/api/setRecommendDetails/:id', getRecommendDetails)
app.post('/api/getSingerDetails',getSingerDetails )
app.post('/api/getSongDetail',getSongDetail)
app.post('/api/getSingerData',getSingerData)
app.get('/api/getDiscData',getDiscData)
app.get('/api/getRankData',getRankData)
app.post('/api/getRankSong',getRankSong )
app.listen(9527)