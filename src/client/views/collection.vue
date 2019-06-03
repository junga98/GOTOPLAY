<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px;margin-left:-8px">收藏 - {{name}}</div>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon
            icon="fa-chevron-left"
            size="17px"
            @click="comfirm"
            style="color: #FFF;margin-left:18px"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <div id="collection_content">
      <div>
        <h3>吃</h3>
        <div class="myorder_card" v-for="(order,index1) in Eorders" :key="index1">
          <h5>商家名：{{order.shopName}}</h5>
          <v-ons-list>
            <v-ons-list-item v-for="(item,index2) in order.orders" :key="index2">
              {{item.name}} &nbsp;&nbsp;&nbsp;&nbsp;
              <div class="priceBox">￥{{item.price*item.count}}</div>
              <div class="countBox">
                <button class="countChange" @click="EcountReduce(index1,index2)">-</button>
                {{item.count}}
                <button
                  class="countChange"
                  @click="EcountPlus(index1,index2)"
                >+</button>
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </div>

      <div>
        <h3>住</h3>
        <div class="myorder_card" v-for="(order,index1) in Horders" :key="index1">
          <h5>商家名：{{order.shopName}}</h5>
          <v-ons-list>
            <v-ons-list-item v-for="(item,index2) in order.orders" :key="index2">
              {{item.name}} &nbsp;&nbsp;&nbsp;&nbsp;
              <div class="priceBox">￥{{item.price*item.count}}</div>
              <div class="countBox">
                <button class="countChange" @click="HcountReduce(index1,index2)">-</button>
                {{item.count}}
                <button
                  class="countChange"
                  @click="HcountPlus(index1,index2)"
                >+</button>
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </div>
    </div>

    <div id="payFooter" style=" background-color: rgb(41, 122, 255);">
      <span>
        <b :class="budgetColor">￥{{money}}</b>
      </span>
      <span>
        <i>您的预算：</i>
        <b>￥{{budget}}</b>
      </span>
      <!-- <v-ons-button style="flex:3;" @click="pay" modifier="large">支付</v-ons-button> -->
    </div>

    <v-ons-alert-dialog modifier="rowfooter" :visible.sync="alertDialog1Visible">
      <span slot="title">保存您的收藏更改吗？</span>
      <template slot="footer">
        <v-ons-alert-dialog-button @click="alertDialog1Visible = false">取消</v-ons-alert-dialog-button>
        <v-ons-alert-dialog-button @click="toHome">保存</v-ons-alert-dialog-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      alertDialog1Visible: false,
      name: "",
      budget: 1000,
      Eorders: [],
      Horders: [],
      del_id: []
    };
  },
  computed: {
    money() {
      let sumE = 0;
      let sumH = 0;
      let Eorders = this.$data.Eorders;
      let Horders = this.$data.Horders;

      for (let i in Eorders) {
        for (let a in Eorders[i].orders) {
          sumE += Eorders[i].orders[a].price * Eorders[i].orders[a].count;
        }
      }
      // console.log(sumE);

      for (let i in Horders) {
        for (let a in Horders[i].orders) {
          sumH += Horders[i].orders[a].price * Horders[i].orders[a].count;
        }
      }
      // console.log(sumH);
      let sum = sumE + sumH;
      return sum;
    },
    budgetColor() {
      if (this.money <= this.budget) {
        return "inRange";
      } else if (this.money > this.budget) {
        return "beyond";
      }
    }
  },
  methods: {
    comfirm() {
      this.alertDialog1Visible = true;
    },
    toHome() {
      let E = this.$data.Eorders;
      let H = this.$data.Horders;
      let arr = E.concat(H);
      // console.log(arr);

      let delParams = {
        del_id: this.$data.del_id
      };

      let updateParams = {
        orders: arr
      };
      // console.log(params);

      this.$api.delCollection(delParams).then(response => {
        if (response.status == "0") {
          this.$store.commit("AlertShow", true);
          this.$store.commit("AlertTip", "删除收藏失败");
        } else {
          this.$api.updateCollection(updateParams).then(response => {
            console.log(response);
            if (response.status == "0") {
              this.$store.commit("AlertShow", true);
              this.$store.commit("AlertTip", "更新收藏失败");
            } else {
              // store.commit("AlertShow", true);
              console.log("更新收藏成功");
              // store.commit("AlertTip", "更新收藏成功");
            }
          });
        }
      });

      this.$router.push({
        path: "/home"
      });
    },

    EcountPlus(index1, index2) {
      // console.log(this.$data.Eorders[index1]);

      this.$data.Eorders[index1].orders[index2].count += 1;
    },
    EcountReduce(index1, index2) {
      // console.log(index1 + "|||" + index2);

      if (this.$data.Eorders[index1].orders[index2].count == 1) {
        // this.$store.commit("AlertShow", true);
        // this.$store.commit("AlertTip", "无法再减了喔");
        this.$data.Eorders[index1].orders.splice(index2, 1);
        // console.log(this.$data.Eorders[index1].items.length);
        if (this.$data.Eorders[index1].orders.length == 0) {
          // console.log( + "sss");
          let _id = this.$data.Eorders[index1]._id;
          this.$data.del_id.push(_id);
          this.$data.Eorders.splice(index1, 1);
        }
      } else {
        const _this = this;
        this.$data.Eorders[index1].orders[index2].count -= 1;
      }
    },

    HcountPlus(index1, index2) {
      // console.log(index1 + "|||" + index2);

      this.$data.Horders[index1].orders[index2].count += 1;
    },
    HcountReduce(index1, index2) {
      // console.log(index1 + "|||" + index2);

      if (this.$data.Horders[index1].orders[index2].count == 1) {
        this.$data.Horders[index1].orders.splice(index2, 1);
        if (this.$data.Horders[index1].orders.length == 0) {
          let _id = this.$data.Horders[index1]._id;
          this.$data.del_id.push(_id);
          this.$data.Horders.splice(index1, 1);
        }
      } else {
        this.$data.Horders[index1].orders[index2].count -= 1;
      }
    },
    getCollection() {
      let locName = this.name;
      let _this = this;

      this.$api.getCollection({ locName: locName }).then(response => {
        if (response.status == "0") {
          this.$store.commit("AlertShow", true);
          this.$store.commit("AlertTip", "获取收藏失败");
        } else {
          let cols = response.collections;
          // console.log(cols);

          cols.map(function(item, index) {
            if (item.costType == "吃") {
              _this.$data.Eorders.push(item);
            } else if (item.costType == "住") {
              _this.$data.Horders.push(item);
            }
          });
        }
      });
    }
  },
  mounted() {
    // console.log()
    this.name = this.$route.params.name;
    this.getCollection();
  }
};
</script>
<style>
#collection_content {
  /* background-color: red; */
  margin-bottom: 10vh;
}

#collection_content h3 {
  text-align: center;
  margin: 5px;
  font-weight: bold;
}

#payFooter {
  position: fixed;
  width: 100vw;
  height: 10%;
  box-shadow: 0px -1px 5px #696969;
  z-index: 10;
  /* width: 100%; */

  bottom: 0;
  display: flex;
  /* margin-left: 30px; */
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

#payFooter span {
  /* color: rgb(65, 65, 65); */
  color: #fff;
  font-size: 15px;
  flex: 5;
}

#payFooter span b {
  font-size: 19px;
}

.myorder_card {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(175, 175, 175);
  margin-bottom: 10px;
}

.myorder_card h5 {
  font-weight: 600;
  padding: 0;
  margin: 10px 0px 0px 16px;
}

.other {
  width: 100%;
  /* background: red; */
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.other div {
  margin-left: 20px;
  color: rgb(73, 73, 73);
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

.inRange {
  color: #fff;
  font-size: 16px;
}
.beyond {
  color: rgb(255, 77, 77);
  font-size: 22px;
  border: 2px solid rgb(255, 77, 77);
  padding: 4px;
}
</style>