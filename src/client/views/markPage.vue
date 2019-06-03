<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)" v-show="!SHOWmarkPage">
      <div class="center" style="color: #FFF;font-size:17px;margin-left:-8px">{{title}}</div>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon
            icon="fa-chevron-left"
            size="17px"
            @click="toHome"
            style="color: #FFF;margin-left:18px"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)" v-show="SHOWmarkPage">
      <div class="center" style="color: #FFF;font-size:17px;margin-left:-8px">{{ markType}}-内容新增</div>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon
            icon="fa-chevron-left"
            size="17px"
            @click="closeMarkPage"
            style="color: #FFF;margin-left:18px;"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>
    <div>
      <div class="noteBox" v-for="(note, index) in notes" :key="index">
        <div class="noteContent">
          <h4>
            吃
            <v-ons-icon icon="fa-cookie-bite" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
            <v-ons-button @click="mark('吃')" modifier="quiet">添加</v-ons-button>
          </h4>
          <ul>
            <li v-for="(item,index) in note.eat" :key="index">
              <p>{{item.desc}}</p>
              <p class="comment" v-if="item.comment == ''">
                评论:
                <router-link tag="button" :to="{ name:'myorder'}">去我的订单评论</router-link>
              </p>
              <p class="comment" v-else>评论: {{item.comment}}</p>
            </li>
          </ul>
          <!-- 住 -->
          <h4>
            住
            <v-ons-icon icon="fa-hotel" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
            <v-ons-button @click="mark('住')" modifier="quiet">添加</v-ons-button>
          </h4>
          <ul>
            <li v-for="(item,index) in note.live" :key="index">
              <p>{{item.desc}}</p>
              <p class="comment" v-if="item.comment == ''">
                评论:
                <router-link tag="button" :to="{ name:'myorder'}">去我的订单评论</router-link>
              </p>
              <p class="comment" v-else>评论: {{item.comment}}</p>
            </li>
          </ul>

          <!-- 行-->
          <h4>
            行
            <v-ons-icon icon="fa-route" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
            <v-ons-button @click="mark('行')" modifier="quiet">添加</v-ons-button>
          </h4>
          <ul v-for="(point, index) in note.route" :key="index">
            <li>{{point}}</li>
          </ul>
          <p class="content_routeOther">{{note.routeOther}}</p>

          <h4>
            其他
            <v-ons-icon icon="fa-user-edit" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
            <v-ons-button @click="mark('其他')" modifier="quiet">编辑</v-ons-button>
          </h4>
          <p class="content_userCreate">{{markOther}}</p>
          <p class="content_footer_date">{{note.date}}</p>
        </div>
      </div>
    </div>
    <v-ons-page v-show="SHOWmarkPage">
      <div id="markPage" style="width:100%">
        <div @click="getLocation" style="padding:5px;">
          <svg
            style="width:16px;height:16px;fill:rgb(41,122,255);"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"
            ></path>
          </svg>
          <span>{{location}}</span>
        </div>

        <v-ons-list>
          <v-ons-list-item>
            <span>商家名</span>
            &nbsp; &nbsp;
            <v-ons-input placeholder="输入店名" v-model="shopname"></v-ons-input>
          </v-ons-list-item>
          <v-ons-list-item>
            <!-- <v-ons-list-title>消费￥</v-ons-list-title> -->
            <span>消费￥</span>
            &nbsp; &nbsp;
            <v-ons-input placeholder="输入消费金额" v-model="cost"></v-ons-input>
          </v-ons-list-item>
          <v-ons-list-item>
            评论：
            <textarea
              required
              class="textarea"
              rows="5"
              style="width:80%"
              maxlength="60"
              v-model="markComment"
              placeholder="输入评论，最多60字"
            ></textarea>
          </v-ons-list-item>
        </v-ons-list>

        <v-ons-button modifier="large--quiet" @click="addMark">新增</v-ons-button>
      </div>
    </v-ons-page>

    <v-ons-page v-show="SHOWmarkOtherPage">
      <div id="markOtherPage" style="width:100%">
        <textarea
          required
          class="textarea"
          rows="25"
          style="width:94%"
          maxlength="160"
          v-model="markOther"
          placeholder="其他内容"
        ></textarea>

        <v-ons-button modifier="large--quiet" @click="addMarkOther">新增</v-ons-button>
      </div>
    </v-ons-page>

    <!-- <v-ons-button modifier style="width:49.4%" @click="SAVE">保存</v-ons-button> -->
    <v-ons-button modifier="large" style @click="UPLOAD">发布</v-ons-button>
  </v-ons-page>
</template>
<script>

export default {
  data() {
    return {
      title: "",
      SHOWmarkPage: false,
      SHOWmarkOtherPage: false,
      markOther: "",
      location: "点击获取位置信息",
      shopname: "",
      markComment: "",
      markType: "",
      cost: 0,
      notes: [
        {
          date: "2019-01-12",
          eat: [],

          live: [],

          route: ["嘉禾望岗(地铁)", "新和(地铁)", "太平(地铁)"],
          routeOther: "用时40分钟，花了8块钱",
          other: ""
        }
      ],
      items: [
        { text: "广东省", value: "广东省" },
        { text: "福建省", value: "福建省" },
        { text: "湖南省", value: "湖南省" }
      ]
    };
  },
  methods: {
    // "从化空气清新，一下地铁太平站就看到华软学院，顺道进去看了下丝木棉，非常美丽，粉色的小花激起了我的少女心。"
    toHome() {
      this.$router.push({
        path: "/home"
      });
    },
    SAVE() {
      this.$store.commit("AlertShow", true);
      this.$store.commit("AlertTip", "保存成功");
    },
    UPLOAD() {
      this.$store.commit("AlertShow", true);
      this.$store.commit("AlertTip", "发布成功");

      // api.uploadTravel(newOrder).then(response => {
      //   if (response.status == "0") {
      //     _this.$store.commit("AlertShow", true);
      //     _this.$store.commit("AlertTip", "新增失败");
      //   } else {
      //     _this.notes[0].eat.push(obj);
      //     _this.SHOWmarkPage = false;
      //     _this.location = "点击获取位置信息";
      //     _this.shopname = "";
      //     _this.cost = 0;
      //     _this.markComment = "";
      //   }
      // });
    },
    addMarkOther() {
      this.SHOWmarkOtherPage = false;
    },
    mark(type) {
      this.markType = type;
      // alert("编辑")
      if (type == "其他") {
        this.SHOWmarkOtherPage = true;
      } else {
        this.SHOWmarkPage = true;
      }
    },
    closeMarkPage() {
      this.SHOWmarkPage = false;
      this.location = "点击获取位置信息";
      this.shopname = "";
      this.cost = 0;
      this.markComment = "";
    },
    getLocation() {
      const _this = this;
      this.location = "正在获取位置信息...";
      setTimeout(function() {
        _this.location = "广州大学华软软件学院";
      }, 1000);
    },
    addMark() {
      const _this = this;

      if (this.location == "点击获取位置信息") {
        this.$store.commit("AlertShow", true);
        this.$store.commit("AlertTip", "请获取位置信息");
        return false;
      } else if (this.shopname == "") {
        this.$store.commit("AlertShow", true);
        this.$store.commit("AlertTip", "请输入商家名");
        return false;
      } else if (this.cost == "") {
        this.$store.commit("AlertShow", true);
        this.$store.commit("AlertTip", "请输入消费金额");
        return false;
      } else if (this.markComment == "") {
        this.$store.commit("AlertShow", true);
        this.$store.commit("AlertTip", "请输入评论");
        return false;
      }

      let desc = `在${this.location}吃了${this.shopname},花了${this.cost}元。`;
      let obj = {
        desc: desc,
        comment: this.markComment
      };

      const newOrder = {
        orders: [],
        createType: "usercreate",
        stars: 0,
        userName: this.userName,
        shopName: this.shopname,
        cost: this.cost,
        searchType: this.markType,
        location: this.location,
        comment: this.markComment
      };

      this.$api.addOrder(newOrder).then(response => {
        if (response.status == "0") {
          _this.$store.commit("AlertShow", true);
          _this.$store.commit("AlertTip", "新增失败");
        } else {
          _this.notes[0].eat.push(obj);
          _this.SHOWmarkPage = false;
          _this.location = "点击获取位置信息";
          _this.shopname = "";
          _this.cost = 0;
          _this.markComment = "";
        }
      });

      // console.log();
    }
  },
  mounted() {
    this.title = this.$route.params.name;
    this.userName = localStorage.getItem("userName");
    const _this = this;

   this.$api
      .getNotravelOrder({ userName: this.userName, location: this.title })
      .then(response => {
        if (response.status == "0") {
          this.$store.commit("AlertShow", true);
          this.$store.commit("AlertTip", "获取未旅游游记详情失败");
        } else {
          // this.$store.commit("AlertShow", true);
          // this.$store.commit("AlertTip", "获取未旅游游记详情成功");

          let resOrders = response.orders;

          resOrders.map(function(item) {
            let desc = `在${item.location}吃了${item.shopName},花了${
              item.cost
            }元,给了${item.stars}分`;

            let order = {
              desc: desc,
              comment: item.comment
            };
            if (item.type == "吃") {
              _this.notes[0].eat.push(order);
            } else if (item.type == "住") {
              _this.notes[0].live.push(order);
            } else {
              alert("出错");
            }
          });

          // this.markOther = response.other;
        }
      });
    this.markOther = this.notes[0].other;
  }
};
</script>
<style>
.location {
  padding-left: 24px;
  background-color: rgb(255, 255, 255);
  font-size: 15px;
  margin: 0;
  padding: 8px 24px 8px 24px;
  color: rgb(79, 146, 255);
}

.noteBox {
  background-color: rgb(255, 255, 255);
  margin-top: 7px;
  border-bottom: 1px solid rgb(218, 218, 218);
}

.noteBox h4 {
  background-color: #fff;
  font-weight: 600;
  text-align: center;
  color: rgb(38, 114, 236);
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  margin-bottom: -2px;
}

.noteBox h4:nth-child(1) {
  padding-top: 25px;
}

.noteContent {
  padding: 0px 16px 2px 2px;
  color: rgb(41, 41, 41);
}

.comment {
  /* text-indent: 2em; */
  font-style: italic;
  text-align: left;
  color: rgb(95, 95, 95);
  padding-right: 10px;
  margin-top: -8px;
  padding-bottom: 5px;
}

.content_routeOther {
  padding-left: 24px;
  color: rgb(95, 95, 95);
}

.content_userCreate {
  /* text-indent: 2em; */
  padding: 0px 24px 0px 24px;
}

.content_footer_date {
  text-align: right;
  color: rgb(95, 95, 95);
  font-size: 15px;
}

#markPage {
  height: 100%;
  position: fixed;
  z-index: 100;
  background-color: rgb(255, 255, 255);
  text-align: center;
}

#markOtherPage {
  height: 100%;
  position: fixed;
  z-index: 100;
  background-color: rgb(255, 255, 255);
  text-align: center;
}
#setTitle {
}
</style>