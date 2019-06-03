<template>
  <div id="app">

    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

    <loading v-show="loading"></loading>

    <transition name="slide-right">
      <alert-tip v-show="tipShow">
        <template slot="tip">{{tip}}</template>
      </alert-tip>
    </transition>
  </div>
</template>

<script>
  import loading from './components/loading.vue'
  import alertTip from './components/alertTip.vue'

  export default {
    name: 'App',
    components: {
      loading,
      alertTip
    },
    data() {
      return {
        transitionName: ""
      };
    },
    computed: {
      title() {
        return this.$store.state.title;
      },
      listShow() {
        return this.$store.state.listShow;
      },
      mainfuns() {
        return this.$store.state.mainfuns;
      },
      loading() {
        return this.$store.state.loading
      },
      tip() {
        return this.$store.state.tip;
      },
      tipShow() {
        return this.$store.state.tipShow;
      },
    },
    methods: {
      changeRouter: function () {
        this.$store.commit('ShowList', false)
      }
    },
    mounted() {
    },
    watch: {
      // 使用watch 监听$router的变化
      $route(to, from) {
        // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          // 设置动画名称
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      }
    }
  }
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 250ms;
    /* position: absolute; */
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate(-100%, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate(100%, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate(-100%, 0);
  }


  .slide-up-enter-active,
  .slide-up-leave-active,
  .slide-down-enter-active,
  .slide-down-leave-active {
    will-change: transform;
    transition: all 200ms;
    /* position: absolute; */
  }
  .slide-up-leave-active,{
    will-change: transform;
    transition: all 190ms;
    /* position: absolute; */
  }


  .slide-up-enter {
    opacity: 0;
    transform: translateY(100%)
  }

  .slide-up-leave-active {
    opacity: 0;
    transform: translateY(100%, 0);
  }

  .slide-down-enter {
    opacity: 0;
    transform: translateY(100%, 0);
  }

  .slide-down-leave-active {
    opacity: 0;
    transform: translateY(-100%, 0);
  }
</style>