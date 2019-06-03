<template>
  <div id="index">
    <div id="index_logo">
      <img src="./../assets/Logo.png">
    </div>
    <input
      type="search"
      v-model="go"
      placeholder="去浪一下，你就知道"
      class="search-input search-input--material"
      style="width: 280px;height:38px;"
    >
    <v-ons-button
      class="button button--material"
      style="width: 70%;padding:4px;margin-top:6px"
      @click="search"
    >出发</v-ons-button>
    <div class="index_nav" id="forum" @click="forum">
      <div id="forum_text">社区</div>
    </div>
    <div class="index_nav" id="myHome" @click="home">
      <div id="myHome_text">个人</div>
    </div>
  </div>
</template>

<script>
import alertTip from "./../components/alertTip.vue";

export default {
  name: "index",
  components: {
    alertTip
  },
  data() {
    return {
      go: "从化"
    };
  },
  computed: {},
  methods: {
    alertTip() {
      this.$store.commit("AlertShow", true);
    },
    search() {
      const _this = this;
      if (this.go == "") {
        this.$store.commit("AlertShow", true);
        this.$store.commit("AlertTip", "请输入出发地");
        return false;
      }

      this.$store.commit("SETsearch", this.go);
      this.$router.push({
        name: "searchResult",
        params: {
          go: _this.$data.go,
          back: "index"
        }
      });
    },
    forum() {
      this.$router.push({
        path: "/forum"
      });
    },
    home() {
      this.$router.push({
        path: "/home"
      });
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>

<style>
#index {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/homeBg.jpg");
  background-size: auto 100%;
  background-position-x: 65%;
  color: rgb(255, 255, 255);
}

#index_logo {
  width: 160px;
  height: 160px;
  border-radius: 100%;
  background-color: #fff;
  margin-top: -80px;
  margin-bottom: 50px;
}

#index_logo img {
  width: 160px;
}

.index_nav {
  position: absolute;
  bottom: -120px;
  width: 220px;
  height: 220px;
  border-radius: 100%;
  background-color: rgba(79, 146, 255, 0.836);
  font-size: 18px;
}

#forum {
  left: -110px;
  text-align: right;
}

#forum_text {
  position: absolute;
  margin-left: 136px;
  margin-top: 45px;
}

#myHome_text {
  position: absolute;
  margin-left: 45px;
  margin-top: 45px;
}

#myHome {
  right: -110px;
}

@keyframes listMove {
  0% {
    transform: scale(0);
  }

  25% {
    transform: scale(0.5);
  }

  50% {
    transform: scale(1);
  }

  75% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes blockShow {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>