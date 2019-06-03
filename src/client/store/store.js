import Vue from 'vue'
import Vuex from 'vuex'
// import api from './api.js';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: '',
    search: "",
    loading: false,
    loadingTip: '',
    tip: '',
    tipShow: false,
    searchType: "",
    colObj: {},
    searchRes: [],
    Ecollections: [],
    Hcollections: []
  },
  mutations: {
    SETuserName(state, userName) {
      state.userName = userName
    },
    searchRes(state, res) {
      // state.searchRes = res
      state.Ecollections = []
      state.Hcollections = []

      res.map(function (item) {
        if (item.costType == "吃") {
          state.Ecollections.push(item)
        } else {
          state.Hcollections.push(item)
        }
      })
    },


    // 首页搜索
    SETsearch(state, search) {
      state.search = search
    },
    addCol(state, newCol) {
      state.colObj = newCol
    },


    searchType(state, type) {
      state.searchType = type
    },

    // Loading动画
    ShowLoading(state, show) {
      state.loading = show.show
      state.loadingTip = show.tip
    },


    /*  提示弹框  */
    AlertShow(state, show) {
      state.tipShow = show
      setTimeout(() => {
        state.tipShow = false
      }, 1500);
    },

    AlertTip(state, tip) {
      state.tip = tip
    },

  },
})

export default store