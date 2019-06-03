import Vue from 'vue'
import Router from 'vue-router'
// import index from './../views/index.vue'
// import login from './../views/login.vue'
// import searchResult from './../views/searchResult.vue'
// import forum from './../views/forum.vue'
// import notes from "./../views/notes.vue";
// import home from "./../views/home.vue";
// import detailShop from './../views/detailShop.vue'
// import order from './../views/order.vue'
// import myorder from './../views/myorder.vue'
// import collection from './../views/collection.vue'
// import markPage from './../views/markPage.vue'
// import like from './../views/like.vue'
// import rootPage from './../views/root.vue'

const login = r => require.ensure([], () => r(require('./../views/login.vue')))
const index = r => require.ensure([], () => r(require('./../views/index.vue')))
const rootPage = r => require.ensure([], () => r(require('./../views/root.vue')))
const like = r => require.ensure([], () => r(require('./../views/like.vue')))
const home = r => require.ensure([], () => r(require('./../views/home.vue')))
const searchResult = r => require.ensure([], () => r(require('./../views/searchResult.vue')))
const forum = r => require.ensure([], () => r(require('./../views/forum.vue')))
const detailShop = r => require.ensure([], () => r(require('./../views/detailShop.vue')))
const notes = r => require.ensure([], () => r(require('./../views/notes.vue')))
const order = r => require.ensure([], () => r(require('./../views/order.vue')))
const myorder = r => require.ensure([], () => r(require('./../views/myorder.vue')))
const collection = r => require.ensure([], () => r(require('./../views/collection.vue')))
const markPage = r => require.ensure([], () => r(require('./../views/markPage.vue')))


Vue.use(Router)


const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'login',
      component: login,
      meta: {
        index: 0
      }
    },
    {
      path: '/root',
      name: 'root',
      component: rootPage,
      meta: {
        index: 1
      }
    }, {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        index: 1,
        requireAuth: true
      }
    }, {
      path: '/searchResult',
      name: 'searchResult',
      component: searchResult,
      meta: {
        index: 2,
        requireAuth: true
      }
    }, {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        index: 2,
        requireAuth: true
      }
    }, {
      path: '/myorder',
      name: 'myorder',
      component: myorder,
      meta: {
        index: 3,
        requireAuth: true
      }
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection,
      meta: {
        index: 4,
        requireAuth: true
      }
    },
    {
      path: '/markPage',
      name: 'markPage',
      component: markPage,
      meta: {
        index: 4,
        requireAuth: true
      }
    },
    {
      path: '/forum',
      name: 'forum',
      component: forum,
      meta: {
        index: 2,
        requireAuth: true
      }
    }, {
      path: '/notes',
      name: 'notes',
      component: notes,
      meta: {
        index: 3,
        requireAuth: true
      }
    }, {
      path: '/detailShop',
      name: 'detailShop',
      component: detailShop,
      meta: {
        index: 3,
        requireAuth: true
      }
    }, {
      path: '/order',
      name: 'order',
      component: order,
      meta: {
        index: 4,
        requireAuth: true
      }
    }, {
      path: '/like',
      name: 'like',
      component: like,
      meta: {
        index: 1,
        requireAuth: true
      }
    }

  ]
})

router.beforeEach((to, from, next) => {
  //  console.log(to);
  //  console.log(from);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限    
    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token')) { //判断本地是否存在access_token 

      let root = localStorage.getItem("userName");
      if (root == 'root') {
        next({
          path: '/root'
        });
      } else {
        next();
      }
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if (to.fullPath == "/") {
    if (localStorage.getItem('token')) {
      next({
        path: from.fullPath
      });
    } else {
      next();
    }
  }
});

export default router