import Vuex from 'vuex'
import Vue from 'vue'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/logger'//vuex小插件，可以提示我们state的值改变前后的变化
Vue.use(Vuex)

const debug = process.env.NODE_ENV!=="production"

const store = new Vuex.Store({
    getters,
    mutations,
    state,
    mutations,
    actions,
    strict:debug,//开启debug选项
    plugins:debug?[createLogger()]:[]
})

export default store