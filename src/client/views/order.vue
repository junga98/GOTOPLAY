<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px">
        {{shopName}}
        <span v-show="SHOWorder === false">在线预订</span>
      </div>
      <!-- <div class="center" v-show="shopName == '购物车'" style="color: #FFF;font-size:17px">{{shopName}}</div> -->
      <div class="left">
        <v-ons-toolbar-button @click="toResultPage">
          <v-ons-icon icon="fa-chevron-left" size="17px" style="color: #FFF;margin-left:20px"></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <div>
      <!-- <router-link tag="button" :to="{ name:'myorder'}">去我的订单评论</router-link> -->
      <div class="orderCard" v-for="(item,index) in items" :key="index">
        <img src="/upload/timg2.jpg" alt>
        <p class="orderName">
          {{item.name}}
          <br>
          ￥{{item.price}}
        </p>
        <div class="addToCollect" @click="pre(index)">
          <v-ons-icon icon="fa-folder" size="17px" style="color:rgb(255, 78, 78);;"></v-ons-icon>
        </div>
        <v-ons-button @click="order(item)">预订</v-ons-button>
      </div>
    </div>
    <transition name="slide-up">
      <v-ons-page v-show="SHOWorder" id="payPage">
        <v-ons-button @click="close" style="position:relative;margin-top:12px">继续预订</v-ons-button>

        <v-ons-list>
          <!-- <v-ons-progress-bar indeterminate></v-ons-progress-bar> -->
          <!-- <v-ons-list-header>您的订单为： </v-ons-list-header> -->
          <v-ons-list-title>您的订单为：</v-ons-list-title>

          <v-ons-list-item v-for="(order,index) in orders" :key="index">
            {{order.name}} &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="priceBox">￥{{order.price}}</div>

            <div class="countBox">
              <button class="countChange" @click="countReduce(index)">-</button>
              {{order.count}}
              <button class="countChange" @click="countPlus(index)">+</button>
            </div>
          </v-ons-list-item>
        </v-ons-list>
        <v-ons-progress-circular v-show="paying" indeterminate></v-ons-progress-circular>
      </v-ons-page>
    </transition>

    <transition name="slide-up">
      <div>
        <div id="payFooter" v-show="SHOWorder">
          <span>
            <i>您需支付：</i>￥
            <b>{{money}}</b>
          </span>
          <v-ons-button style="flex:3;" @click="pay" modifier="large">支付</v-ons-button>
        </div>
      </div>
    </transition>

    <ons-dialog id="my-dialog" v-show="Alert">
      <div style="text-align: center; padding: 10px;">
        <p>{{tip}}</p>
      </div>
    </ons-dialog>

    <ons-modal direction="up">
      <div style="text-align: center">
        <p>
          <ons-icon icon="md-spinner" size="28px" spin></ons-icon>支付中
        </p>
      </div>
    </ons-modal>

    <v-ons-toast :visible.sync="toastVisible" animation="ascend">
      已添加到收藏夹
      <button @click="routeToCollection">去收藏夹</button>
    </v-ons-toast>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      toastVisible: false,
      tip: "",
      shopName: "",
      SHOWorder: false,
      items: [
        {
          name: "抹茶星冰乐",
          price: 32,
          count: 1
        },
        {
          name: "摩卡星冰乐",
          price: 34,
          count: 1
        },
        {
          name: "浓醇咖啡",
          price: 28,
          count: 1
        },
        {
          name: "至尊奶盖茶",
          price: 30,
          count: 1
        },
        {
          name: "柠檬红茶",
          price: 28,
          count: 1
        },
        {
          name: "柠檬绿茶",
          price: 26,
          count: 1
        },
        {
          name: "波霸奶茶",
          price: 26,
          count: 1
        },
        {
          name: "黑钻奶茶",
          price: 36,
          count: 1
        },
        {
          name: "招牌奶茶",
          price: 38,
          count: 1
        }
      ],
      orders: [],
      paying: false,
      Alert: false,
      shopNameReq: ""
      // money: 66
    };
  },
  computed: {
    money() {
      let sum = 0;
      let orders = this.$data.orders;
      for (let i in orders) {
        sum += orders[i].price * orders[i].count;
      }
      return sum;
    },
    searchType() {
      return this.$store.state.searchType;
    }
  },
  methods: {
    toResultPage() {
      this.$router.push({
        path: "/detailShop"
      });
    },
    order(item) {
      const _this = this;
      this.SHOWorder = true;
      this.shopName = "购物车";

      let itemName = item.name;
      let status = false;
      let orders = this.$data.orders;
      orders.map(function(item, index) {
        if (item.name == itemName) {
          status = true;
        }
      });

      if (status == true) {
        this.tip = "已经在购物车内了喔";
        this.Alert = true;
        setTimeout(function() {
          _this.Alert = false;
          _this.tip = "";
        }, 1000);
        return false;
      } else {
        this.$data.orders.push(item);
      }
    },
    pay() {
      const _this = this;
      let orders = this.$data.orders;

      var modal = document.querySelector("ons-modal");
      modal.show();

      const newOrder = {
        userName: this.userName,
        shopName: this.shopNameReq,
        orders: orders,
        cost: this.money,
        stars: 0,
        location: this.location,
        searchType: this.searchType
      };

      this.$api.addOrder(newOrder).then(response => {
        if (response.status == "0") {
          _this.Alert = true;
          _this.tip = "订单生成失败";

          setTimeout(function() {
            modal.hide();
            _this.paying = false;
            _this.Alert = false;
            _this.tip = "";
          }, 1200);
        } else {
          setTimeout(function() {
            modal.hide();
            _this.paying = true;
            _this.Alert = true;
            _this.tip = "订单已生成, 支付成功";
            _this.SHOWorder = false;
            setTimeout(function() {
              _this.paying = false;
              _this.Alert = false;
              _this.tip = "";
            }, 1200);
          }, 1500);
        }
      });
    },
    close() {
      this.SHOWorder = false;
      this.shopName = this.pshopName;
    },
    countPlus(index) {
      this.$data.orders[index].count += 1;
    },
    countReduce(index) {
      if (this.$data.orders[index].count == 1) {
        this.$data.orders.splice(index, 1);
      } else {
        this.$data.orders[index].count -= 1;
      }
    },
    pre(index) {
      // store.commit("searchType", "吃");
      const _this = this;
      let obj = this.$data.items[index];
      console.log(this.location + "," + this.shopName + obj);

      let newCol = {
        location: this.location,
        shopName: this.shopName,
        costType: this.searchType,
        orders: obj
      };

      this.$api.addCollectionD(newCol).then(response => {
        if (response.status == "1") {
          _this.toastVisible = true;
          setTimeout(() => {
            this.toastVisible = false;
          }, 2000);
        } else if (response.status == "-1") {
          _this.$store.commit("AlertShow", true);
          _this.$store.commit("AlertTip", "收藏失败,已在收藏夹中");
        } else {
          _this.$store.commit("AlertShow", true);
          _this.$store.commit("AlertTip", "收藏失败");
        }
      });
    },
    routeToCollection() {
      this.toastVisible = false;
      this.$router.push({
        path: "/home"
      });
    }
  },
  created() {
    if (this.$route.params.pShopName == undefined) {
      let shopName = localStorage.getItem("shopName");
      // let orders = localStorage.getItem("orders");

      this.shopName = shopName;
      // this.orders = orders;
    } else {
      this.shopName = this.$route.params.pShopName;
      // this.orders = this.$route.params.pOrders;
      localStorage.setItem("shopName", this.shopName);
      // localStorage.setItem("orders", this.shopName);
    }
  },
  mounted() {
    console.log(this.shopName);
    this.shopName = localStorage.getItem("shopName");
    this.shopNameReq = localStorage.getItem("shopName");
    this.location = localStorage.getItem("search");
    this.userName = localStorage.getItem("userName");
  }
};
</script>
<style  scope>
.orderCard {
  width: 100%;
  height: auto;
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgb(255, 255, 255);
  padding: 7px 0px;
  font-size: 15px;
  margin-bottom: 6px;
}

.orderName {
  width: 110px;
  margin: 0;
  padding: 0;
  margin-left: -14px;
}

.orderCard img {
  width: 70px;
  height: 70px;
}

#payPage {
  position: fixed;
  /* width: 100vw; */
  /* height: 90vh; */
  /* padding-top: 20px; */
  /* left: 5vw; */
  /* background-color: rgb(156, 255, 147); */
  /* border-top: 1px solid rgb(129, 129, 129); */
  /* box-shadow: 0px 1px 16px #1d1d1d; */
  margin-top: 44px;
  text-align: center;
  margin-bottom: 10vh;
  /* display: flex;
  flex-direction: column; */
}

#payFooter {
  position: fixed;
  width: 100vw;
  height: 10vh;
  box-shadow: 0px -1px 5px #696969;
  z-index: 10;
  /* width: 100%; */
  background-color: rgb(197, 197, 197);
  bottom: 0;
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#payFooter span {
  color: rgb(65, 65, 65);
  font-size: 15px;
  flex: 5;
}

#payFooter span b {
  font-size: 19px;
}

.countChange {
  width: 18px;
  height: 18px;
  text-align: center;
  background-color: rgb(187, 214, 250);
  border-radius: 100%;
  border: none;
  outline: none;
  color: #666;
}

.countBox {
  /* background-color:red; */
  /* position: absolute;
  right: 24px; */
}

.priceBox {
  /* position: absolute;
  right: 104px; */
}

#progressBar {
  position: absolute;
  bottom: 0vh;
  z-index: 900;
}
</style>