<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px;margin-left:-8px">{{ title }}</div>
      <div class="left">
        <v-ons-toolbar-button>
          <v-ons-icon
            icon="fa-chevron-left"
            size="17px"
            @click="routeTo"
            style="color: #FFF;margin-left:18px"
          ></v-ons-icon>
        </v-ons-toolbar-button>
      </div>
    </v-ons-toolbar>

    <router-link
      tag="p"
      :to="{name:'searchResult',params:{ back:'notes',go:this.location }}"
      class="location"
    >
      <v-ons-icon icon="fa-map-marker-alt" style="color: rgb(41,122,255);font-size: 15px;"></v-ons-icon>
      &nbsp;{{location}} - 去看看
    </router-link>

    <div class="noteBox" v-for="(note, index) in notes" :key="index">
      <div class="noteContent">
        <h4>
          吃
          <v-ons-icon icon="fa-cookie-bite" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
        </h4>
        <ul>
          <li v-for="(item,index) in note.eat" :key="index">
            <p>
              {{item.desc}}
              <span class="addToCollect" @click="pre($event,index)">
                <v-ons-icon icon="fa-folder" size="17px" style="color:rgb(255, 78, 78);;"></v-ons-icon>
              </span>
            </p>
            <p class="comment">评论: {{item.comment}}</p>
          </li>
        </ul>
        <!-- 住 -->
        <h4>
          住
          <v-ons-icon icon="fa-hotel" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
        </h4>
        <ul>
          <li v-if="note.live">
            <p>
              {{note.live}}
              <span class="addToCollect" @click="pre($event,index)">
                <v-ons-icon icon="fa-folder" size="17px" style="color:rgb(255, 78, 78);"></v-ons-icon>
              </span>
            </p>
            <p class="comment">评论: {{note.liveComment}}</p>
          </li>
          <li v-if="!note.live">无</li>
        </ul>

        <!-- 行-->
        <h4>
          行
          <v-ons-icon icon="fa-route" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
        </h4>
        <ul v-for="(point, index) in note.route" :key="index">
          <li>{{point}}</li>
        </ul>
        <p class="content_routeOther">{{note.routeOther}}</p>

        <h4>
          其他
          <v-ons-icon icon="fa-user-edit" style="color: rgb(38, 114, 236);font-size: 16px;"></v-ons-icon>
        </h4>
        <p class="content_userCreate">{{note.other}}</p>
        <p class="content_footer_date">{{note.date}}</p>
        <div
          style="width:103.5%;height:80px;backgroundColor:rgb(130, 174, 255);text-align:center"
        >广告位</div>
      </div>
    </div>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      title: "华软一日游，浪漫粉色丝木棉",
      location: "广州大学华软软件学院",
      notes: [
        {
          date: "2019-01-12",

          eat: [
            {
              desc:
                "在广州市从化区太平镇百德广场吃了肯德基，花了32块，给了4分。",
              comment: "香脆脆，热辣辣，就要这种感觉。"
            },
            {
              desc:
                "在广州市从化区太平镇百德广场吃了杨国福，花了17块，给了5分。",
              comment: "够辣，好爽~在大冬天吃出一身汗。"
            },
            {
              desc:
                "在广州市从化区太平镇百德广场吃了黄焖鸡，花了16块，给了3分。",
              comment: "等了二十多分钟。"
            }
          ],

          live:
            "在广州市从化区太平镇百德广场的ID公寓住了一晚，花了100元，给了4.8分",
          liveComment:
            "酒店位于工业园区，离客户单位很近，距离太平地铁站大概2.5公里，酒店周边有餐馆，理发店，生活还算便利，洒店卫生好，干净整洁，设施新。",
          liveScore: "4.8分",
          route: ["嘉禾望岗(地铁)", "新和(地铁)", "太平(地铁)"],
          routeOther: "用时40分钟，花了8块钱",
          other:
            "从化空气清新，一下地铁太平站就看到华软学院，顺道进去看了下丝木棉，非常美丽，粉色的小花激起了我的少女心。"
        }
      ]
    };
  },
  methods: {
    routeTo() {
      let back = this.back;
      console.log(back);

      if (back == "forum" || back == undefined) {
        this.$router.push({
          path: "/forum"
        });
      } else {
        this.$router.push({
          path: "home"
        });
      }
    },
    pre(event, index) {
      const _this = this;
      var e = event || window.event;
      e.cancelBubble = true;
      e.preventDefault();
      this.$ons.notification.toast("已添加到收藏!", {
        timeout: 1000,
        animation: "fall"
      });
    }
  },
  mounted() {
    this.back = this.$route.params.back;
  }
};
</script>
<style scoped>
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
  color: rgb(87, 145, 252);
  font-size: 15px;
}

.addToCollect {
}
</style>