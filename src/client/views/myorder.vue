<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px;margin-left:-8px">{{title}}</div>

      <div class="left">
        <v-ons-toolbar-button v-show="myorderComment">
          <v-ons-icon
            icon="fa-chevron-left"
            size="17px"
            @click="toBack"
            style="color: #FFF;margin-left:18px"
          ></v-ons-icon>
        </v-ons-toolbar-button>

        <v-ons-toolbar-button v-show="!myorderComment">
          <v-ons-icon
            icon="fa-chevron-left"
            size="17px"
            @click="toHome"
            style="color: #FFF;margin-left:18px"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <div>
      <div class="myorder_card" v-for="(order,index) in items" :key="index">
        <div v-if="order.createType != 'usercreate'">
          <h5>{{order.shopName}}</h5>
          <span class="orderId">订单号：{{order.orderId}}</span>
          <br>
          <span class="orderDate">生成时间：{{order.date}}</span>
          <v-ons-list>
            <!-- <v-ons-list-header>{{order.date}}</v-ons-list-header> -->
            <v-ons-list-item v-for="(item,index) in order.orders" :key="index">
              {{item.name}} &nbsp;&nbsp;&nbsp;
              ￥{{item.price}} *
              {{item.count}}
            </v-ons-list-item>
          </v-ons-list>

          <div class="other">
            <div>
              <b style="font-size:17px">￥{{order.cost}}</b>
            </div>
            <v-ons-button
              v-if="order.comment== ''"
              style="width:120px;
        text-align:center;font-size:15px;"
              @click="openComment(index)"
            >评价</v-ons-button>
          </div>
          <p v-if="order.comment!= ''">
            <span>评论：</span>
            {{order.comment}}
          </p>
        </div>
        <div class="animate_upload" id="uploadFile" v-show="myorderComment">
          <form>
            <input type="text" name="userName" v-model="userName" v-show="false">
            <input
              id="uploadFile_btn"
              type="file"
              accept="image/gif, image/jpeg, image/jpg, image/png"
              name="file"
              @change="getFile($event)"
            >

            <div id="setStar">
              <span style="margin-right:10px;color:#444">评分</span>
              <v-ons-range v-model="stars" max="5" min="0" step="1" style="width: 50%;"></v-ons-range>
              <v-ons-icon
                icon="md-star"
                style="color:rgb(241, 178, 41);margin-left:10px"
                size="22px"
              ></v-ons-icon>&nbsp;
              <span style="color:#444">{{ stars }}</span>
            </div>

            <textarea
              required
              class="textarea"
              rows="6"
              cols="38"
              maxlength="60"
              v-model="content"
              placeholder="输入评论，最多60字"
            ></textarea>
            <v-ons-button
              style="padding:2px 0px;
        width:80%;margin-top:10px"
              @click="addComment"
            >发布</v-ons-button>
          </form>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>
<script>

export default {
  data() {
    return {
      userName: "",
      myorderComment: false,
      content: "",
      items: [],
      SHOWmodal: false,
      commentIndex: 0,
      stars: 0,
      title: "我的订单"
    };
  },
  methods: {
    toBack() {
      this.myorderComment = false;
      this.title = "我的订单";

      this.content = "";
      this.stars = 0;
    },
    toHome() {
      this.$router.push({
        path: "/home"
      });
    },
    openComment(index) {
      this.myorderComment = true;
      this.commentIndex = index;
      this.title = "评论";
    },
    addComment() {
      const _this = this;
      const info = _this.items[this.commentIndex];
      let location = localStorage.getItem("search");

      if (this.content == "") {
        this.$store.commit("AlertShow", true);
        this.$store.commit("AlertTip", "评论内容不能为空");
        return false;
      } else if (this.stars == 0) {
        this.$store.commit("AlertShow", true);
        this.$store.commit("AlertTip", "请给评分");
        return false;
      }

      let newComment = {
        _id: info._id,
        location: location,
        userName: this.userName,
        shopName: info.shopName,
        content: this.content,
        stars: this.stars
      };

      this.$api.addComment(newComment).then(response => {
        if (response.status == "0") {
          _this.$store.commit("AlertShow", true);
          _this.$store.commit("AlertTip", "评论失败");
        } else {
          _this.$store.commit("AlertShow", true);
          _this.$store.commit("AlertTip", "评论成功");

          _this.content = "";
          _this.stars = 0;

          _this.myorderComment = false;

          // 更新评论
          this.$api.getOrders({ userName: _this.userName }).then(response => {
            if (response.status == "0") {
              _this.$store.commit("AlertShow", true);
              _this.$store.commit("AlertTip", "获取订单失败");
            } else {
              // console.log();
              let resData = response.orders;
              if (resData.length == 0) {
                _this.$store.commit("AlertShow", true);
                _this.$store.commit("AlertTip", "您的订单为空喔");
              }
              _this.items = resData;
            }
          });
        }
      });
    }
  },
  mounted() {
    const _this = this;
    this.userName = localStorage.getItem("userName");
    this.$api.getOrders({ userName: _this.userName }).then(response => {
      if (response.status == "0") {
        _this.$store.commit("AlertShow", true);
        _this.$store.commit("AlertTip", "获取订单失败");
      } else {
        // console.log();
        let resData = response.orders;
        if (resData.length == 0) {
          _this.$store.commit("AlertShow", true);
          _this.$store.commit("AlertTip", "您的订单为空喔");
        }
        _this.items = resData;
      }
    });
  }
};
</script>
<style lang="">
.myorder_card {
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(175, 175, 175);
  margin-bottom: 10px;
}
.myorder_card .orderId {
  margin: 0px 8px 0px 16px;
  padding: 0;
  color: #8b8b8b;
  font-size: 13px;
}

.myorder_card .orderDate {
  margin: 0px 8px 2px 16px;
  padding: 0;
  color: #8b8b8b;
  font-size: 13px;
}
.myorder_card h5 {
  font-weight: 600;
  padding: 0;
  margin: 10px 0px 0px 16px;
  color: rgb(0, 118, 255);
}
.myorder_card h5 span {
  font-weight: normal;
  font-size: 14px;
  float: right;
  margin-right: 8px;
  color: rgb(153, 153, 153);
}
.other {
  width: 100%;
  /* background: red; */
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
.myorder_card p {
  margin: 10px 8px 10px 16px;
}
.myorder_card p span {
  font-weight: bold;
  font-style: italic;
  background-color: rgb(0, 118, 255);
  color: #fff;
  padding: 3px;
}
.other div {
  margin-left: 20px;
  color: rgb(73, 73, 73);
}

#myorderComment {
  position: absolute;
  width: 90vw;
  height: 90vh;
  background-color: rgb(105, 102, 102);
  top: 0;
}

.userInput {
  background: #ffffff;
  border-bottom-color: #ff6633;
  /* padding: 8px; */
  border-bottom-width: 0px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  color: #2c2c2c;
  font-size: 16px;
  flex: 1;
  width: 100%;
  border-top: 1px solid rgb(231, 231, 231);
  border-bottom: 1px solid rgb(231, 231, 231);
}

#uploadFile {
  width: 100%;
  height: 96vh;
  /* margin-bottom: 15px; */
  position: fixed;
  overflow-y: hidden;
  overflow-x: hidden;
  top: 0;
  width: 100vw;
  padding: 20px 0px;
  height: 100vh;
}
#uploadFile form {
  margin-top: 9vh;
}
#uploadFile_btn {
  opacity: 1;
  position: relative;
  display: inline-block;
  border-radius: 4px;
  padding: 4px 12px;
  overflow: hidden;
  color: #1e88c7;
  text-decoration: none;
  text-indent: 0;
  line-height: 20px;
}

#uploadFile label {
  font-size: 15px;
  background-color: rgb(138, 138, 138);
  padding: 4px;
  color: #fff;
}

#userInput_PT {
  width: 90%;
  margin-top: 10px;
}

#uploadFile input {
  font-size: 16px;
  margin-left: 8px;
}

#setStar {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.animate_upload {
  animation: opacity 0.2s ease;
  /* background-color: red; */
  z-index: 5;
  text-align: center;
  background-color: rgb(231, 231, 231);
  box-shadow: 0px 0px 10px #444;
  /* left: ; */
}

@keyframes opacity {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0%);
  }
}
</style>