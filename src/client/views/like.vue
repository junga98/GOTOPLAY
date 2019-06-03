<template>
  <div style="text-align:center">
    <!-- <a href="" onClick="rusure() ;return false;">来点击我</a> -->
    <h3>{{msg}}</h3>
    <div v-show="Count != 4">
      <button @click="like" v-show="Count != 5">喜欢</button>
      <button @click="dislike" v-show="disCount != 4">不喜欢</button>
    </div>
    <svg
      class="svgheart"
      v-show="Count == 4"
      style
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
      ></path>
    </svg>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "",
      msg1: "你喜欢我吗",
      msg2: "不接受这个回答，请重新选择",
      msg3: "别皮，好好选",
      msg4: "别做违心的事",
      msg5: "点喜欢吧,没得选的",

      msg6: "喜欢就对了",
      msg7: "哎哟，羞，别再点我了",
      msg8: "你这样就有点热烈了",
      msg9: "我也是",
      disCount: 0,
      Count: 0
    };
  },
  methods: {
    like() {
      this.Count += 1;
      if (this.Count == 1) {
        this.msg = this.msg6;
      } else if (this.Count == 2) {
        this.msg = this.msg7;
      } else if (this.Count == 3) {
        this.msg = this.msg8;
      } else if (this.Count == 4) {
        this.msg = this.msg9;
      }
    },
    dislike() {
      this.disCount += 1;
      if (this.disCount == 1) {
        this.msg = this.msg2;
      } else if (this.disCount == 2) {
        this.msg = this.msg3;
      } else if (this.disCount == 3) {
        this.msg = this.msg4;
      } else if (this.disCount == 4) {
        this.msg = this.msg5;
      }
    }
  },
  mounted() {
    this.msg = this.msg1;
  }
  // mounted() {
  //   function window.confirm(str) {
  //     execScript("n = (msgbox('" + str + "',vbYesNo, '提示')=vbYes)", "vbscript");
  //     return (n);
  //   }
  //   alert(confirm("重载的confirm弹出框"));
  // }
};
</script>
<style>
.svgheart {
  fill: red;
  width: 300px;
  height: 300px;
  animation: ss 0.5s ease-in-out infinite;
}
@keyframes ss {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>