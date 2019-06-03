<template>
  <v-ons-page>
    <v-ons-list>
      <v-ons-list-item v-for="(item,index) in cols" :key="index">
        <router-link :to="{ name: 'collection',params:{ name: item }}">{{item}}</router-link>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-page>
</template>
<script>
export default {
  data() {
    return {
      notTravel: ["杭州西湖", "青海湖", "武夷山", "台湾阿里山", "梅里雪山"],
      cols: []
    };
  },
  methods: {
    getCollection() {
      this.$api.getCollection({ locName: "all" }).then(response => {
        if (response.status == 0) {
          store.commit("AlertShow", true);
          store.commit("AlertTip", "获取收藏失败");
        } else {
          let colName = response.collections;
          // console.log(colName);
          let arr = this.unique1(colName);
          // console.log(arr);
          this.$data.cols = arr;
        }
      });
    },
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
    this.getCollection();
    // function unique1(array) {
    //   var newArr = [];
    //   //新建一个新数组
    //   //遍历参数数组array
    //   for (var i = 0; i < array.length; i++) {
    //     //判断新数组是否有这个元素值，没有的话，就把arr[i]给push到新数组newArr中
    //     if (newArr.indexOf(array[i]) === -1) {
    //       newArr.push(arr[i]);
    //     }
    //   }
    //   return newArr;
    // }
    // console.log(unique1(arr));
  }
};
</script>
<style scoped>
</style>