<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px">{{ title }}</div>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon
            icon="fa-chevron-left"
            size="17px"
            @click="toIndex"
            style="color: #FFF;margin-left:20px"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div id="home_userInfo">
      <div>
        <img src="./../assets/Logo.png">
      </div>
      <div id="home_userName">
        <span>{{userName}}</span>
        <br>
        <button @click="toMyOrder">我的订单</button>
        <br>
        <button>我的钱包</button>
      </div>
    </div>

    <v-ons-tabbar swipeable position="top" style="marginTop: 140px" :visible="true">
      <template slot="pages">
        <travelled></travelled>
        <notTravel></notTravel>
      </template>

      <v-ons-tab v-for="(tab, i) in tabs" :key="tab.i" :label="tabs[i].label"></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>
<script>
import travelled from "./travelled.vue";
import notTravel from "./notTravel.vue";

export default {
  components: {
    travelled,
    notTravel
  },
  data() {
    return {
      title: "个人主页",
      userName: "JUNGA",
      tabs: [
        {
          // icon: 'fa-star',
          label: "游记"
        },
        {
          // icon: 'fa-fire',
          label: "收藏"
        }
      ]
    };
  },
  methods: {
    toIndex() {
      this.$router.push({
        path: "/index"
      });
    },

    toMyOrder() {
      this.$router.push({
        path: "/myorder"
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
#home_userInfo {
  width: 100%;
  height: 100px;
  position: absolute;
  display: inline-flex;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
  z-index: 100;
  align-items: center;
  justify-content: space-around;
  /* background-color: red; */
}

#home_userInfo div:nth-child(1) {
  flex: 3;
}

#home_userInfo div:nth-child(2) {
  flex: 2;
}

#home_userInfo img {
  max-width: 110px;
}

#home_userName {
  text-align: center;
}

#home_userName span {
  font-size: 18px;
  margin-left: -70px;
  color: #3b3b3b;
}

#home_userName button {
  margin-left: -70px;
  margin-top: 5px;
}
</style>