import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import api from './store/api'
import axios from 'axios'


// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

// JS import
import VueOnsen from 'vue-onsenui'; // This imports 'onsenui', so no need to import it separately

Vue.use(VueOnsen); // VueOnsen set here as plugin to VUE. Done automatically if a call to window.Vue exists in the startup code.


Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$api = api

axios.defaults.timeout = 10000; //超时响应
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头（推荐）
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; // 配置请求头
axios.interceptors.request.use(
  config => {
    // console.log("axios" + localStorage.token)
    if (localStorage.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `${ localStorage.token }`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      console.log(error.response)
      switch (error.response.status) {
        case false:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.setItem("token", "")
          router.replace({
            path: '/LoginPage',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });

new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {
    App
  }
})