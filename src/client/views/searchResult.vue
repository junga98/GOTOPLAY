<template id="main">
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px">{{ title }}</div>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon
            v-if="back== 'notes'"
            icon="fa-chevron-left"
            size="17px"
            @click="routeTo"
            style="color: #FFF;margin-left:20px"
          ></v-ons-icon>
          <v-ons-icon
            v-else
            icon="fa-search, material: md-menu"
            size="17px"
            @click="routeTo"
            style="color: #FFF;margin-left:20px"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
      <div class="right">
        <v-ons-toolbar-button
          @click="actionSheetVisible = true"
          style="color: #FFF"
          icon="ion-navicon, material: md-menu"
        ></v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-tabbar swipeable position="auto" :visible="true">
      <template slot="pages">
        <search-detail1></search-detail1>
        <search-detail2></search-detail2>
        <search-detail3></search-detail3>
      </template>

      <v-ons-tab
        @click="setSearchType('吃')"
        :key="tabs[0].i"
        :icon="tabs[0].icon"
        :label="tabs[0].label"
      ></v-ons-tab>

      <v-ons-tab
        @click="setSearchType('住')"
        :key="tabs[1].i"
        :icon="tabs[1].icon"
        :label="tabs[1].label"
      ></v-ons-tab>

      <v-ons-tab
        @click="setSearchType('行')"
        :key="tabs[2].i"
        :icon="tabs[2].icon"
        :label="tabs[2].label"
      ></v-ons-tab>
    </v-ons-tabbar>

    <!-- <v-ons-button @click="actionSheetVisible = true">
      Static action sheet
    </v-ons-button>-->

    <!-- modifier="noshadow" -->
    <!-- modifier="destructive" -->
    <!-- modifier="cover-content" -->

    <v-ons-action-sheet :visible.sync="actionSheetVisible" cancelable title="选择排序方式">
      <v-ons-action-sheet-button icon="md-square-o" @click="actionSheetVisible = false">按评分排序</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o" @click="actionSheetVisible = false">按收藏量排序</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o" @click="actionSheetVisible = false">按人均消费排序</v-ons-action-sheet-button>
      <v-ons-action-sheet-button icon="md-square-o" @click="actionSheetVisible = false">返回</v-ons-action-sheet-button>
    </v-ons-action-sheet>
  </v-ons-page>
</template>
<script>
import searchDetail1 from "./searchDetail.1.vue";
import searchDetail2 from "./searchDetail.2.vue";
import searchDetail3 from "./searchDetail.3.vue";

export default {
  name: "result",
  components: {
    searchDetail1,
    searchDetail2,
    searchDetail3
  },
  data() {
    return {
      actionSheetVisible: false,
      title: "",
      activeIndex: 0,
      tabs: [
        {
          icon: "fa-cookie-bite"
          // label: '吃',
          // page: searchDetail,
          /*     props: {
                 myProp: 'This is a page prop!'
               }, */
        },
        {
          icon: "fa-hotel"
        },
        {
          icon: "fa-route",
          page: searchDetail3
        }
      ]
    };
  },
  methods: {
    routeTo() {
      let back = this.back;
      if (back == "index"|| back == undefined) {
        this.$router.push({
          path: "/index"
        });
      } else {
        this.$router.push({
          name: "notes",
          back: "searchResult"
        });
      }
    },
    setSearchType(type) {
      // alert(11);
      this.$store.commit("searchType", type);
    }
  },
  computed: {
    search() {
      return this.$store.state.search;
    }
  },

  created() {
    if (this.$route.params.go == undefined) {
      let search = localStorage.getItem("search");
      this.title = search;
    } else {
      this.title = this.$route.params.go;
      localStorage.setItem("search", this.title);
    }
    this.back = this.$route.params.back;
  },
  mounted() {
    // console.log('aa');
    // alert("11")
    // store2.commit("searchType", "吃");
    const _this = this;
    this.$api.getAllShops({ search: _this.search }).then(response => {
      console.log(response);
      this.$store.commit("searchRes", response.shops);
    });
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