<template id="main">
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px">{{ title }}</div>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon
            icon="fa-search, material: md-menu"
            size="17px"
            @click="toHome"
            style="color: #FFF;margin-left:20px"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable position="top" :visible="true">
      <template slot="pages">
        <forum-latest></forum-latest>
        <forum-hot></forum-hot>
      </template>

      <v-ons-tab
        v-for="(tab, i) in tabs"
        :key="tab.i"
        :label="tabs[i].label"
        style="height:40px;padding:0px"
      ></v-ons-tab>
    </v-ons-tabbar>
  </v-ons-page>
</template>
<script>
import forumLatest from "./forumLatest.vue";
import forumHot from "./forumHot.vue";

export default {
  name: "forum",
  components: {
    forumLatest,
    forumHot
  },
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {
          // icon: 'fa-star',
          label: "最新"
        },
        {
          // icon: 'fa-fire',
          label: "最热"
        }
      ]
    };
  },
  methods: {
    toHome() {
      this.$router.push({
        path: "/index"
      });
    }
  },
  computed: {
    title() {
      return "社区";
    }
  }
};
</script>
<style scoped>
.ReturnButton {
  position: absolute;
  left: 30px;
  /* border: 1px solid #FFF; */
}
</style>