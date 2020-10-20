import * as types from './mytations-type'
const mutations = {
  [types.SET_SINGER](state, singerData) {
    state.singer = singerData
  },
  [types.SET_DISC](state, descDetail) {
    state.desc = descDetail
  },
  [types.SET_SHOW](state, show) {
    state.show = show
  },
  [types.SET_MODELINDEX](state, index) {
    state.modelIndex = index
  },
  [types.SET_STATUSINDEX](state, index) {
    state.statusIndex = index
  },
  [types.SET_SONGLIST](state, list) {
    state.songlist = list
  },
  [types.SET_SONGINDEX](state, index) {
    state.songIndex = index
  },
  [types.SET_CURRENTSONG](state,song){
    state.currentSong=song
  }
}
export default mutations
