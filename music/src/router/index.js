import Vue from 'vue'
import Router from 'vue-router'
import '../common/css/initialize .css'
import songlist from '../components/songlist.vue'
import recommend from '../components/recommend.vue'
import rank from '../components/rank.vue'
import search from '../components/search.vue'
import descDetail from '../components/descDetail.vue'
import descPlay from '../components/descPlay.vue'
import singer from '../components/singer.vue'
import rankSong from '../components/rankSong.vue'

Vue.use(Router)

//阻止编程式路由重复点击同一路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [{
      path: '/songlist',
      name: "songlist",
      meta: {
        route: "songlist"
      },
      component: songlist
    },
    {
      path: '/recommend',
      name: "recommend",
      meta: {
        route: "recommend"
      },
      component: recommend,
    },
    {
      name: "descDetail",
      path: "/descDetail/:id",
      component: descDetail,
      children: [{
          path: 'playSong/:mid',
          name: "playSong",
          component: descPlay
        },
        {
          path: 'singer',
          name: "singer",
          component: singer
        },
      ]
    },
    {
      path: '/rank',
      name: "rank",
      meta: {
        route: "rank"
      },
      component: rank
    },
    {
      path: '/rankSong',
      name: 'rankSong',
      component: rankSong,
      children: [{
          path: 'playSong/:mid',
          name: "play",
          component: descPlay
        },
        {
          path: 'singer',
          name: "singerDetail",
          component: singer,
        },
        {
          path: '/rankSong/playSong',
          name: "playS",
          component: descPlay
        }
      ]
    },
    {
      path: '/search',
      name: "search",
      component: search,
      children: [{
        path: 'searchMsg',
        name: "searchMsg",
        component: singer
      }]
    },
    {
      path: 'playSong',
      name: "playSearch",
      component: descPlay
    },
    {
      redirect: "/recommend",
      path: "*"
    },
    {
      path: "/",
      component: recommend
    },
  ]
})
