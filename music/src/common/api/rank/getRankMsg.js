const {rankData} = require('./rankTable')
module.exports=({
    getRankData:function(req,res){
        rankData.find({}).then(data=>{
            res.send(data)
        },{
            __v: false,
            _id: false
        }).catch(err=>{
            throw err
        })
    }
})