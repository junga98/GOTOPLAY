<template>
  <v-ons-page>
    <v-ons-toolbar style="backgroundColor: rgb(41,122,255)">
      <div class="center" style="color: #FFF;font-size:17px">商家信息录入</div>
    </v-ons-toolbar>

    <div id="shopMsgUpload">
      <form>
        <label>商家名：</label>
        <input name="name" v-model="name" maxlength="14" placeholder="最多14字" required>
        <br>
        <label>关键字：</label>
        <input name="keyword" v-model="keyword" maxlength="14" placeholder="最多14字 空格隔开关键字" required>
        <br>
        <label maxlength="6" placeholder="最多6字">商家类型：</label>
        <!-- <input name="costType" v-model="costType"> -->
        <br>

        <v-ons-select name="costType" style="width: 20%" v-model="costType">
          <option v-for="(item,index) in costTypes" :key="index" :value="item.value">{{ item.text }}</option>
        </v-ons-select>
        <v-ons-select name="type" style="width: 20%" v-model="type">
          <option v-for="(item,index) in types" :key="index" :value="item.value">{{ item.text }}</option>
        </v-ons-select>
        <br>
        <label>地址：</label>
        <input name="location" v-model="location" maxlength="20" placeholder="最多20字" required>
        <br>
        <label>平均价格：</label>
        <input name="price" v-model="price_" maxlength="4" placeholder="最多四位数" required>
        <br>
        <label>评级：</label>
        <input name="star" v-model="star_" maxlength="1" placeholder="1至5" required>
        <br>
        <div style="backgroundColor:#999">
          <label placeholder="下方上传图片">轮播图：</label>
          <input
            multiple="multiple"
            required
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png"
            name="file"
            @change="getFile($event)"
          >
          <!-- <input
            multiple="multiple"
            required
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png"
            name="file1"
            @change="getFile($event,'1')"
          >
          <input
            required
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png"
            name="file2"
            @change="getFile($event,'2')"
          >
          <input
            required
            type="file"
            accept="image/gif, image/jpeg, image/jpg, image/png"
            name="file3"
            @change="getFile($event,'3')"
          >-->
        </div>
        <br>
        <div style="backgroundColor:#999">
          <label>菜单：</label>
          <div
            v-for="(order,index) in orders"
            :key="index"
          >{{order.orderName}} - {{order.orderPrice}}</div>

          <br>
          <input placeholder="菜名，十字以内" maxlength="10" v-model="orderName">
          <input placeholder="价格" maxlength="4" v-model="orderPrice_">
          <button @click="addOrder">添加</button>
        </div>
        <br>
        <label>收藏量：</label>
        <input required name="collection" v-model="collection_">
        <br>
        <button @click="send_PT($event)" class="create_send" id="create_send_PT">发布</button>
      </form>
    </div>
  </v-ons-page>
</template>
<script>
import store from "./../store/store.js";

export default {
  name: "rootPage",
  data() {
    return {
      name: "",
      keyword: "",
      type: "快餐店",
      costType: "吃",
      location: "",
      comment: [],
      orders: [],
      file: "",
      file1: "",
      file2: "",
      file3: "",
      orderName: "",

      price_: 0,
      star_: 0,
      collection_: 0,
      orderPrice_: 0,

      types: [
        { text: "酒店", value: "酒店" },
        { text: "民宿", value: "民宿" },
        { text: "公寓", value: "公寓" },
        { text: "快餐店", value: "快餐店" },
        { text: "火锅店", value: "火锅店" },
        { text: "小吃店", value: "小吃店" },
        { text: "饮品店", value: "饮品店" }
      ],
      costTypes: [
        { text: "吃", value: "吃" },
        { text: "住", value: "住" },
        { text: "行", value: "行" }
      ]
    };
  },
  computed: {
    price() {
      let val = this.price_;
      if (isNaN(val)) {
        return 0;
      } else {
        return parseFloat(val);
      }
    },
    star() {
      let val = this.star_;
      if (isNaN(val)) {
        return 0;
      } else {
        return parseFloat(val);
      }
    },
    collection() {
      let val = this.collection_;
      if (isNaN(val)) {
        return 0;
      } else {
        return parseFloat(val);
      }
    },
    orderPrice() {
      let val = this.orderPrice_;
      if (isNaN(val)) {
        return 0;
      } else {
        return parseFloat(val);
      }
    }
  },
  methods: {
    getFile: function(event, index) {
      // if (index == "1") {
      //   this.file1 = event.target.files[0];
      // } else if (index == "2") {
      //   this.file2 = event.target.files[0];
      // } else if (index == "3") {
      //   this.file3 = event.target.files[0];
      // }
      this.file = event.target.files[0];
    },
    addOrder(event) {
      event.preventDefault();
      this.orders.push({
        orderName: this.orderName,
        orderPrice: this.orderPrice
      });
      this.orderName = "";
      this.orderPrice_ = 0;
    },

    send_PT: function(event, index) {
      event.preventDefault();

      const _this = this;
      let photo = [];

      // if (this.file1 != "" && this.file2 != "" && this.file3 != "") {
      //   photo.push(_this.file1);
      //   photo.push(_this.file2);
      //   photo.push(_this.file3);
      // } else {
      //   store.commit("AlertShow", true);
      //   store.commit("AlertTip", "请上传三张首页轮播图");
      //   return false;
      // }

      console.log(photo);

      // if (
      //   this.name != "" &&
      //   this.keyword != "" &&
      //   this.costType != "" &&
      //   this.type != "" &&
      //   this.location != "" &&
      //   this.price != "" &&
      //   this.star != "" &&
      //   this.orders != [] &&
      //   this.collection != "" &&
      //   this.file != ""
      // ) {
      let formData = new FormData();

      let price = parseInt(this.price);
      let star = parseInt(this.star);

      formData.append("name", this.name);
      formData.append("keyword", this.keyword);
      formData.append("costType", this.costType);
      formData.append("type", this.type);
      formData.append("location", this.location);
      formData.append("price", price);
      formData.append("star", star);
      formData.append("file", this.file);
      formData.append("comment", this.comment);

      for (let i = 0; i < _this.orders.length; i++) {
        formData.append("orders", _this.orders[i]);
      }

      formData.append("collections", this.collection);

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      this.$http
        .post("/api/uploadShopInfo", formData, config)
        .then(res => {
          // 上传成功
          if (res.data.status == "1") {
            _this.$store.commit("AlertShow", true);
            _this.$store.commit("AlertTip", "上传成功");
          } else {
            _this.$store.commit("AlertShow", true);
            _this.$store.commit("AlertTip", "上传失败");
          }
        })
        .catch(reject => {
          console.log(reject);
          _this.$store.commit("AlertShow", true);
          _this.$store.commit("AlertTip", "出错了");
        });
    }
  }
};
</script>
<style>
#shopMsgUpload {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#shopMsgUpload form {
  padding-top: 20px;
}
#shopMsgUpload form input {
  width: 70%;
  margin-bottom: 8px;
  padding: 5px;
  font-size: 16px;
}
</style>