<template>
  <v-ons-page>
    <div>
      <div class="route_filter">
        <v-ons-input
          type="text"
          v-model="through"
          style="width:240px"
          placeholder="输入出发地/途径地"
          model-event="change"
        ></v-ons-input>
        <v-ons-button class="button button--material" style="backgroundColor:rgb(73,141,212)">搜索</v-ons-button>
      </div>

      <div class="route_card" v-for="(route,index) in routes" :key="index">
        <div class="route_card_site" v-for="(x,index) in route.route" :key="index">
          <div class="route_card_site_box">
            <div class="route_card_site_dot"></div>
            <!-- <div class="route_card_site_nameWay" v-if="x=='公交:'">{{x}}</div> -->
            <div class="route_card_site_name">{{x}}</div>
          </div>
        </div>
      </div>
    </div>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      through: "",
      isWay: false,
      routes: [
        {
          route: [
            "飞机",
            "北京",
            "上海",
            "杭州",
            "广州白云机场",
            "地铁",
            "机场南",
            "公交",
            "广州大学华软软件学院",
            "从化汽车站",
            "桃莲"
          ]
        },
        {
          route: [
            "高铁",
            "北京",
            "广州",
            "公交",
            "从化汽车站",
            "桃莲",
            "高铁",
            "北京",
            "广州"
          ]
        },
        {
          route: [
            "高铁",
            "北京",
            "广州",
            "高铁",
            "北京",
            "广州",
            "公交",
            "从化汽车站",
            "桃莲"
          ]
        },
        {
          route: ["公交", "从化汽车站", "桃莲"]
        },
        {
          route: [
            "高铁",
            "北京",
            "广州",
            "公交",
            "从化汽车站",
            "桃莲",
            "高铁",
            "北京",
            "广州",
            "公交",
            "从化汽车站",
            "桃莲"
          ]
        },
        {
          route: ["高铁", "北京", "广州", "公交", "从化汽车站"]
        }
      ]
    };
  },
  mounted() {}
};
</script>
<style>
.route_card {
  padding: 10px;
  margin: 4px 10px 8px 10px;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  background-color: rgb(116, 201, 67);
  box-shadow: 1px 1px 4px rgb(110, 110, 110);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.route_filter {
  display: inline-flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;
  background-color: rgb(219, 219, 219);
  margin: 0px 0px 0px 0px;
}

.route_card_site {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.route_card_site_box {
  text-align: center;
  margin-left: 14px;
  margin-top: 10px;
}

.route_card_site_nameWay {
  margin-top: 3px;
  font-size: 14px;
  color: #454334;
  font-weight: bold;
}

.route_card_site_name {
  margin-top: 3px;
  font-size: 14px;
  color: #454334;
}

.route_card_site_dot {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: rgb(255, 255, 255);
}
</style>