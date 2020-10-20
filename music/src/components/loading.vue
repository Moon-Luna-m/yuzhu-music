<template>
    <div>
        <p>{{title}}</p>        
    </div>
</template>
<script>
export default {
props:{
        title:{
            type:String,
            default:"加载中..."
        }
    }
}
</script>
<style lang="stylus" scoped>
    p{
       color: #a29c9c
       font-size 12px 
       text-align center
    }
</style>
