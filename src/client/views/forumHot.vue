<template>
  <v-ons-page>
    <div class="AD" :class="AD">
      广告位
      <span v-show="count!=0">广告将在{{count}}秒后最小化</span>
    </div>
    <router-link
      tag="div"
      :to="{ name: 'notes',params:{ back: 'forum' }}"
      class="forum_card"
      v-for="(item,index) in content"
      :key="index"
    >
      <div class="forum_card_title">{{item.title}}</div>

      <div class="forum_card_content">
        <div class="forum_card_left">
          <div class="journey">{{item.from}} - {{item.to}}</div>
          <div class="forum_card_expend">{{item.expend}}</div>
          <div class="forum_card_time">{{item.time}}</div>
        </div>
        <div class="forum_card_right">
          <img src="./../assets/Logo.png">
        </div>
      </div>
    </router-link>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      AD: "AD",
      count: 4,
      content: [
        {
          title: "华软一日游，浪漫粉色丝木棉",
          time: "1天",
          expend: "￥190",
          from: "广州",
          to: "广州从化"
        },
        {
          title: "北京二日游，感受冬日帝都",
          time: "2天",
          expend: "￥2300",
          from: "广州",
          to: "北京"
        },
        {
          title: "武汉三日游，感受冬日帝都",
          time: "3天",
          expend: "￥3200",
          from: "广州",
          to: "武汉"
        },
        {
          title: "重庆五日游，感受冬日帝都",
          time: "5天",
          expend: "￥4700",
          from: "广州",
          to: "重庆"
        },
        {
          title: "杭州四日游，感受冬日帝都",
          time: "4天",
          expend: "￥2400",
          from: "广州",
          to: "杭州"
        },
        {
          title: "长安三日游，感受冬日帝都",
          time: "3天",
          expend: "￥3400",
          from: "广州",
          to: "长安"
        }
      ]
    };
  },
  mounted() {
    const _this = this;
    var countCut = setInterval(function() {
      if (_this.count == 0) {
        clearInterval(countCut);
      } else {
        _this.count -= 1;
      }
    }, 1000);
    setTimeout(function() {
      _this.AD = "AD_small";
    }, 4000);
  }
};
</script>
<style scoped>
.forum_card {
  padding: 9px 25px 3px 25px;
  margin: 0px 0px 6px 0px;
  /*     border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px; */
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(214, 214, 214);
  color: #454545;
}

.forum_card_title {
  font-weight: 500;
  border-bottom: 1px solid rgb(214, 214, 214);
  text-align: center;
  padding-bottom: 6px;
  color: #4d59c5;
}

.forum_card_content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.forum_card_expend {
  /* font-style: italic; */
  margin-top: 3px;
  font-size: 17px;
}

.journey {
  font-size: 20px;
  font-weight: 600;
}

.forum_card_time {
  margin-top: 3px;
  font-size: 17px;
}

.forum_card_left {
  flex: 1;
  padding-left: 22px;
}

.forum_card_right {
  flex: 1;
  text-align: center;
  padding-top: 7px;
}

.forum_card_right img {
  max-width: 100px;
}

.AD {
  width: 103.5%;
  height: 220px;
  background-color: rgb(130, 174, 255);
  text-align: center;
  transition: all ease 0.5;
}
.AD_small {
  width: 103.5%;
  /* height: 60px; */
  background-color: rgb(214, 229, 255);
  text-align: center;
  animation: heiChange ease-in-out 1s forwards;
}
@keyframes heiChange {
  0% {
    height: 220px;
  }
  100% {
    height: 50px;
  }
}
</style>