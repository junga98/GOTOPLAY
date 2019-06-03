<template>
  <v-ons-page>
    <!-- <v-ons-select style="" v-model="selectedItem">
      <option  v-for="item in sorts" :value="item.value" :key="item.value">{{ item.text }}</option>
    </v-ons-select>-->
    <div>
      <router-link
        :to="{ name:'detailShop', params:{ pShopName:info.name,pShopPrice:info.price,pShopStar:info.star, pShopPhoto:info.photo }}"
        tag="div"
        class="info_card"
        v-for="(info,index) in infos"
        :key="index"
      >
        <div class="info_card_basic">
          <p class="infoName">
            {{info.name}}
            <span class="infoType">（{{info.type}}）</span>
          </p>

          <div>
            <v-ons-icon v-if="info.star>=1" icon="fa-star" size="12px" style="color: #FFF;"></v-ons-icon>
            <v-ons-icon v-if="info.star>=2" icon="fa-star" size="12px" style="color:#FFF;"></v-ons-icon>
            <v-ons-icon v-if="info.star>=3" icon="fa-star" size="12px" style="color: #FFF;"></v-ons-icon>
            <v-ons-icon v-if="info.star>=4" icon="fa-star" size="12px" style="color: #FFF;"></v-ons-icon>
          </div>
          <div class="infoPrice">￥{{info.price}}</div>
        </div>
        <div class="card_footer">
          <div>{{info.location}}</div>
          <div class="info_collection">
            <v-ons-icon icon="fa-bookmark" size="13px" style="color: #FFF;"></v-ons-icon>
            {{info.collection}}
          </div>

          <div class="addToCollect" @click="pre($event,index)">
            <v-ons-icon icon="fa-folder" size="17px" style="color:rgb(255, 78, 78);;"></v-ons-icon>
          </div>
        </div>
      </router-link>
    </div>
  </v-ons-page>
</template>
<script>

export default {
  data() {
    return {
      toastVisible: false,
      sorts: [
        { text: "按评分排序", value: "按评分排序" },
        { text: "按收藏量排序", value: "按收藏量排序" },
        { text: "按人均消费排序", value: "按人均消费排序" }
      ],
      selectedItem: "按评分排序"
      // infos: [
      // {
      //   name: "新月公寓",
      //   type: "公寓型",
      //   star: "5",
      //   position: "广东省从化市街口镇新光广场232号",
      //   collection: "122",
      //   price: 85
      // },
      // {
      //   name: "ID公寓",
      //   type: "公寓型",
      //   star: "1",
      //   position: "广东省从化市街口镇新光广场132号",
      //   collection: "422",
      //   price: 90
      // },
      // {
      //   name: "如家酒店",
      //   type: "快捷酒店",
      //   star: "1",
      //   position: "广东省从化市街口镇新光广场132号",
      //   collection: "312",
      //   price: 100
      // },
      // {
      //   name: "七天连锁酒店",
      //   type: "快捷酒店",
      //   star: "1",
      //   position: "广东省从化市街口镇新光广场132号",
      //   collection: "92",
      //   price: 110
      // },
      // {
      //   name: "青年客栈",
      //   type: "经济型",
      //   star: "1",
      //   position: "广东省从化市街口镇新光广场132号",
      //   collection: "122",
      //   price: 38
      // },
      // {
      //   name: "维也纳酒店",
      //   type: "五星级酒店",
      //   star: "1",
      //   position: "广东省从化市街口镇新光广场132号",
      //   collection: "622",
      //   price: 500
      // },
      // {
      //   name: "青年客栈",
      //   type: "经济型",
      //   star: "1",
      //   position: "广东省从化市街口镇新光广场132号",
      //   collection: "122",
      //   price: 38
      // },
      // {
      //   name: "维也纳酒店",
      //   type: "五星级酒店",
      //   star: "1",
      //   position: "广东省从化市街口镇新光广场132号",
      //   collection: "622",
      //   price: 500
      // }
      // ]
    };
  },
  computed: {
    search() {
      return this.$store.state.search;
    },
    infos() {
      return this.$store.state.Hcollections;
    }
  },
  methods: {
    pre(event, index) {
      // console.log(arguments[0]);

      var e = event || window.event;
      // if (e.stopPropagation) {
      // e.stopPropagation();
      // } else {
      e.cancelBubble = true;
      // }

      e.preventDefault();

      let shopName = this.infos[index].name;
      let price = this.infos[index].price;
      let location = localStorage.getItem("search");

      let searchType = "住";

      let newCol = {
        shopName: shopName,
        costType: searchType,
        location: location,
        orders: [
          {
            name: "平均消费",
            price: 45,
            count: 1
          }
        ]
      };
      // this./api/addCollection
      this.$api.addCollection(newCol).then(response => {
        if (response.status == "1") {
          this.$ons.notification.toast("已添加到收藏!", {
            timeout: 1000,
            animation: "fall"
          });
        } else if (response.status == "-1") {
          this.$store.commit("AlertShow", true);
          this.$store.commit("AlertTip", "收藏失败,已在收藏夹中");
        } else {
          this.$store.commit("AlertShow", true);
          this.$store.commit("AlertTip", "收藏失败");
        }
      });
    }
  },
  mounted() {}
};
</script>
<style scoped>
.info_card {
  display: flex;
  flex-direction: column;
  /* background-color: rgb(209, 209, 209); */
  padding: 4px;
  background-color: rgb(150, 195, 255);
  box-shadow: 0px 1px 4px #555;
  margin: 0px 0px 8px 0px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
}

.info_card_basic {
  padding: 11px 9px 12px 9px;
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}

.info_card_basic div:nth-child(2) {
  width: 20%;
}

.infoName {
  font-weight: bold;
  color: #454545;
  /* padding-left: 12px; */
  margin: 0;
  width: 50%;
  margin-right: 10px;
}

.infoType {
  font-size: 13px;
  color: #666;
  font-style: italic;
}

.infoPrice {
  /* width: 20%; */
  padding: 3px 7px 3px 5px;
  font-size: 17px;
  font-weight: bold;
  background-color: rgb(255, 78, 78);
  color: #fff;
  border-radius: 6px;
  margin-right: 14px;
  /* position: absolute;
  right: 20px; */
}

.infoComment {
  padding: 15px 25px 15px 25px;
  line-height: 20px;
  font-size: 15px;
}

.infoPic {
  padding: 0px 25px 10px 25px;
}

.infoPic img {
  max-width: 23%;
}

.card_footer {
  display: inline-flex;
  color: #555;
  justify-content: space-between;
  font-size: 14px;
  padding: 0px 20px 9px 20px;
}
.card_footer div:nth-child(1) {
  width: 76%;
}
.info_collection {
  font-size: 14px;
  color: #555;
}
</style>