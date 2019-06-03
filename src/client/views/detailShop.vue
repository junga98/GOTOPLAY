<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px">{{shopName}} 商家详情</div>
      <div class="left">
        <v-ons-toolbar-button @click="toResultPage">
          <v-ons-icon icon="fa-chevron-left" size="17px" style="color: #FFF;margin-left:20px"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div class="paddingLR title">
      <h3>{{shopName}}</h3>
    </div>

    <div class="paddingLR basic">
      <v-ons-icon icon="fa-star" size="12px" style="color: red;"></v-ons-icon>
      <v-ons-icon icon="fa-star" size="12px" style="color:red;"></v-ons-icon>
      <v-ons-icon icon="fa-star" size="12px" style="color: red;"></v-ons-icon>
      <v-ons-icon icon="fa-star" size="12px" style="color: red;"></v-ons-icon>
      <span>{{star}}分 |</span>
      <span>￥{{price}}/人</span>
    </div>

    <div id="slide">
      <v-ons-carousel swipeable auto-scroll overscrollable :index.sync="carouselIndex">
        <v-ons-carousel-item v-for="(value, key) in photo" :key="key">
          <img style="backgroundColor:red" :src="'/upload/'+value">
        </v-ons-carousel-item>
      </v-ons-carousel>

      <div :style="dots">
        <span
          :index="dotIndex - 1"
          v-for="dotIndex in photo.length"
          :key="dotIndex"
          style="cursor: pointer"
          @click="carouselIndex = dotIndex - 1"
        >{{ carouselIndex === dotIndex - 1 ? '\u25CF' : '\u25CB' }}</span>
      </div>
    </div>

    <div class="paddingTB paddingLR detail_location">
      <v-ons-icon icon="fa-map-marker-alt" style="color: rgb(41,122,255);font-size: 15px;"></v-ons-icon>
      <span>&nbsp;&nbsp;{{location}}</span>
    </div>

    <!-- <div id="title_">
      <h3>店铺相关</h3>
    </div>-->
    <div class="recommend">
      <router-link :to="{ name:'order', params:{ pShopName: shopName,pOrders:orders }}" tag="div">
        <v-ons-button modifier="large">
          <h4>进入在线预订</h4>
        </v-ons-button>
        <!-- <router-link
        :to="{ name:'order', params:{ pShopName: shopName }}"
        tag="div"
        v-for="(value,index) in photo"
        :key="index"
      >
        <img class="orderImg" :src="value">-->
      </router-link>
    </div>

    <div class="recommend">
      <h4>营业时间</h4>周一至周五 10：30-23：00
      <br>周六至周日 10：00-24：00
    </div>

    <div class="shop_comment">
      <h4>网友评论</h4>

      <div class="comment_card" v-for="(item,index) in comments" :key="index">
        <div class="comment_card_header">
          <div class="header"></div>
          <div>
            <div class="commentName">{{item.userName}}</div>
            <div class="commentDate">{{item.date}}</div>
          </div>
        </div>

        <!-- <p ></p> -->
        <p class="commentContent">
          <b>评价：</b>
          {{item.comment}}
        </p>
        <div>
          <img src="./../assets/1.jpg">
          <img src="./../assets/2.jpg">
          <img src="./../assets/3.jpg">
        </div>
      </div>
    </div>
    <div class="p"></div>
  </v-ons-page>
</template>
<script>

export default {
  data() {
    return {
      shopName: "",
      SHOWimg1: true,
      SHOWimg2: false,
      SHOWimg3: false,
      carouselIndex: 0,
      location: "",
      orders: [],
      items: ["1.jpg", "2.jpg", "3.jpg"],
      dotIndex: 0,
      photo: [],
      price: 0,
      star: 0,
      dots: {
        textAlign: "center",
        fontSize: "30px",
        color: "#fff",
        position: "absolute",
        top: "250px",
        zIndex: "20",
        left: 0,
        right: 0
      },
      comments: [
        {
          name: "JUNGA",
          date: "2019-03-07",
          content:
            "探鱼真的超级好吃，我JUNGA这辈子第一次吃到这么美味鲜嫩的鱼，以后会常来打卡。有望把每一个口味都尝一遍。"
        },
        {
          name: "JANEVEN",
          date: "2019-03-08",
          content:
            "探鱼真的超级好吃，我JUNGA这辈子第一次吃到这么美味鲜嫩的鱼，以后会常来打卡。有望把每一个口味都尝一遍。"
        },
        {
          name: "JUNGA",
          date: "2019-03-07",
          content:
            "探鱼真的超级好吃，我JUNGA这辈子第一次吃到这么美味鲜嫩的鱼，以后会常来打卡。有望把每一个口味都尝一遍。"
        }
      ]
    };
  },
  methods: {
    toResultPage() {
      this.$router.push({
        path: "/searchResult"
      });
    }
  },
  created() {},
  mounted() {
    const _this = this;

    if (this.$route.params.pShopName == undefined) {
      let shopName = localStorage.getItem("shopName");
      let photo = localStorage.getItem("photo");
      let price = localStorage.getItem("price");
      let star = localStorage.getItem("star");
      let location = localStorage.getItem("location");
      let orders = localStorage.getItem("orders");

      this.shopName = shopName;
      this.location = location;
      this.photo = photo;
      this.price = price;
      this.star = star;
      this.orders = orders;
    } else {
      this.shopName = this.$route.params.pShopName;
      let photo = this.$route.params.pShopPhoto[0];
      this.price = this.$route.params.pShopPrice;
      this.star = this.$route.params.pShopStar;
      this.location = this.$route.params.pShopLocation;
      this.orders = this.$route.params.pShopOrders;

      for (let index = 0; index < 3; index++) {
        _this.photo.push(photo);
      }

      localStorage.setItem("shopName", this.shopName);
      localStorage.setItem("photo", this.photo);
      localStorage.setItem("location", this.location);
      localStorage.setItem("price", this.price);
      localStorage.setItem("star", this.star);
      localStorage.setItem("orders", this.orders);
    }

    this.$api.getComments({ shopName: this.shopName }).then(response => {
      if (response.status == "0") {
        _this.$store.commit("AlertShow", true);
        _this.$store.commit("AlertTip", "获取评论失败");
      } else {
        _this.$data.comments = response.comments;
      }
    });
  }
};
</script>
<style scope>
#slide {
  width: 88%;
  height: 220px;
  overflow: hidden;
  margin-left: 6%;
}

.title h3 {
  margin-top: 16px;
  margin-bottom: 5px;
  font-weight: 600;
}

.basic {
  margin-top: 4px;
  margin-bottom: 6px;
  font-size: 13px;
}

.paddingLR {
  padding-left: 22px;
  padding-right: 22px;
}

.paddingTB {
  padding-top: 10px;
  padding-bottom: 10px;
}

.detail_location {
  font-size: 14px;
  /* padding-top: 10px */
}

.recommend {
  width: 90%;
  margin-left: 5%;
  margin-top: 2px;
  padding-top: 5px;
  padding-bottom: 3px;
  text-align: center;
  border-top: 1px solid #afafaf;
  /* border-bottom: 1px solid #7a7a7a */
}

.detail_location {
  padding-top: 10px;
}

.recommend h4 {
  font-weight: 600;
}

.recommend div img {
  max-width: 30%;
  height: auto;
  background-color: rgb(172, 172, 172);
}

.shop_comment {
  width: 90%;
  margin-left: 5%;
  margin-top: 22px;
  /* padding-bottom: 20px; */
  border-top: 1px solid #afafaf;
}

.comment_card_header {
  display: inline-flex;
  align-items: center;
}

.comment_card {
  /* background-color: rgb(185, 185, 185); */
  padding: 13px 8px;
  border-bottom: 1px solid #afafaf;
  color: rgb(54, 54, 54);
}

.commentName {
  font-weight: bold;
  padding-left: 8px;
  text-align: left;
  /* background-color: red; */
}

.commentDate {
  font-size: 13px;
  padding-left: 8px;
}

.commentContent {
  font-size: 15px;
  font-weight: 500px;
  padding: 0;
  margin: 8px 0px;
}

.header {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: rgb(54, 129, 241);
}

.shop_comment h4 {
  font-weight: 600;
  text-align: center;
  padding-top: 4px;
}

.shop_comment div img {
  max-width: 30%;
  height: auto;
  background-color: rgb(172, 172, 172);
}
</style>