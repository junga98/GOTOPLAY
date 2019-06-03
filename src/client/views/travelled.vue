<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-title>未编辑</v-ons-list-title>
      <v-ons-list-item v-for="(item,index) in notravels" :key="index">
        <router-link :to="{ name: 'markPage',params:{ name: item }}">{{ item}}</router-link>
      </v-ons-list-item>

      <v-ons-list-title>已发布</v-ons-list-title>
      <router-link :to="{ name: 'notes',params:{ back: 'home' }}">
        <v-ons-list-item v-for="(item,index) in travelled" :key="index">{{item}}</v-ons-list-item>
      </router-link>
    </v-ons-list>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      note: "广州大学华软软件学院",
      travelled: ["太平马仔山","从化五指山", "从化风云岭"],
      notravels: []
    };
  },
  methods: {
    unique1(array) {
      // 数组去重算法
      var newArr = [];
      //新建一个新数组
      //遍历参数数组array
      for (var i = 0; i < array.length; i++) {
        //判断新数组是否有这个元素值，没有的话，就把arr[i]给push到新数组newArr中
        if (newArr.indexOf(array[i]) === -1) {
          newArr.push(array[i]);
        }
      }
      return newArr;
    }
  },
  mounted() {
    const userName = localStorage.getItem("userName");
    const _this = this;

    this.$api.getNotravels({ type: "all", userName: userName }).then(response => {
      if (response.status == "0") {
        _this.$store.commit("AlertShow", true);
        _this.$store.commit("AlertTip", "获取未旅游失败");
      } else {
        // _this.$store.commit("AlertShow", true);
        // _this.$store.commit("AlertTip", "获取未旅游成功");
        // console.log(response);
        let NTNames = response.notravelNames;
        let arr = this.unique1(NTNames);
        this.$data.notravels = arr;
      }
    });
  }
};
</script>
<style scoped>
</style>