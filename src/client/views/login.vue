<template>
  <div id="loginPage">
    <img id="loginPage_logo" src="./../assets/Logo.png">
    <div id="selectForm">
      <span @click="showLoginForm">登陆</span>
      <span @click="showRegisteForm">注册</span>
    </div>

    <form id="loginForm" v-show="loginForm">
      <input
        id="loginName"
        type="text"
        maxlength="16"
        placeholder="请输入用户名"
        v-model="loginName"
        autocomplete="off"
        required
      >
      <br>
      <input
        id="loginPassword"
        type="password"
        maxlength="16"
        placeholder="请输入密码"
        v-model="loginPassword"
        autocomplete="off"
        required
      >
      <br>
      <i style="fontSize: 14px;marginLeft: 160px;">忘记密码</i>
      <button type="button" id="btn_go" @click="login">登录</button>
    </form>

    <form id="registeForm" v-show="registeForm">
      <input
        id="registeName"
        type="text"
        maxlength="16"
        placeholder="填写注册用户名"
        :class="{ 'error': error1 }"
        @change="checkRsName"
        v-model="registeName"
        name="registeName"
        autocomplete="off"
        required
      >
      <br>
      <input
        id="registePassword"
        type="text"
        maxlength="16"
        placeholder="请输入8位以上的密码"
        :class="{ 'error': error2 }"
        @change="checkRsPw"
        v-model="registePassword"
        autocomplete="off"
        required
      >
      <br>
      <input
        id="registePassword2"
        type="text"
        maxlength="16"
        placeholder="请再次输入密码"
        :class="{ 'error': error3 }"
        @change="checkRsPwRe"
        v-model="registePassword2"
        autocomplete="off"
        required
      >
      <br>
      <button type="button" id="btn_go2" @click="register">注册</button>
    </form>
  </div>
</template>
<script>
import store from "./../store/store.js";

export default {
  name: "loginPage",
  data() {
    return {
      loginForm: true,
      registeForm: false,
      loginName: "",
      loginPassword: "",
      registeName: "",
      registePassword: "",
      registePassword2: "",
      error1: true,
      error2: true,
      error3: true
    };
  },
  methods: {
    showLoginForm: function() {
      this.$data.loginForm = true;
      this.$data.registeForm = false;
    },
    showRegisteForm: function() {
      this.$data.loginForm = false;
      this.$data.registeForm = true;
    },
    checkloginName: function() {},
    checkloginPassword: function() {},
    checkRsName: function() {
      if (this.registeName.length != 0) {
        this.$data.error1 = false;
      } else {
        this.$data.error1 = true;
      }
    },
    checkRsPw: function() {
      if (this.registePassword.length < 8) {
        store.commit("AlertShow", true);
        store.commit("AlertTip", "请输入8位以上的密码确保安全性");
        this.$data.error2 = true;
      } else {
        this.$data.error2 = false;
        this.$data.registePassword2 = ""; // 清空确认密码框
        this.$data.error3 = true;
      }
    },
    checkRsPwRe: function() {
      if (
        this.registePassword === this.registePassword2 &&
        this.registePassword2.length >= 8
      ) {
        this.$data.error3 = false;
      } else {
        this.$data.error3 = true;
      }
    },
    register: function() {
      // 创建账号
      let params = {
        account: this.registeName,
        password: this.registePassword
      };

      if (
        this.error1 === false &&
        this.error2 === false &&
        this.error3 === false
      ) {
        this.$http
          .post("/api/register", params)
          .then(response => {
            let res = response.data;
            console.log(res);

            if (res.code == 1) {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "账号创建成功");

              //跳转到登录窗口
              this.$data.loginForm = true;
              this.$data.registeForm = false;
              let loginname = this.$data.registeName;
              this.loginName = loginname;
            } else if (res.code == 2) {
              store.commit("AlertShow", true);
              store.commit("AlertTip", "该账号已被使用");
            }
          })
          .catch(reject => {
            console.log(reject);
          });
      } else {
        store.commit("AlertShow", true);
        store.commit("AlertTip", "请补全信息");
        return false;
      }
      // console.log(params);
    },
    login() {
      // 登陆
      let params = {
        account: this.loginName,
        password: this.loginPassword
      };
      if (params.account === "" || params.password === "") {
        store.commit("AlertShow", true);
        store.commit("AlertTip", "账号或密码不能为空");
        return false;
      }
      this.$http
        .post("/api/login", params)
        .then(response => {
          let res = response.data;
          // console.log(response.data.token)
          let token = response.data.token;
          // console.log(token)

          if (res.code == 1) {
            store.commit("AlertShow", true);
            store.commit("AlertTip", "登录成功");

            localStorage.setItem("token", token);
            localStorage.setItem("userName", params.account);
            store.commit("SETuserName", params.account);

            this.$router.push({
              path: "/index"
            });
          } else if (res.code == -1) {
            store.commit("AlertShow", true);
            store.commit("AlertTip", "密码错误");
          } else if (res.code == -2) {
            store.commit("AlertShow", true);
            store.commit("AlertTip", "账号不存在");
          }
        })
        .catch(reject => {
          console.log(reject);
        });
    }
  }
};
</script>
<style>
#loginPage {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background-image: linear-gradient(to top, #ffffff 0%, #4e96f5 100%);  */
  /* background-image: url("../assets/homeBg.jpg");
                 background-size: auto 100%;
    background-position-x: 65%; */
  background-color: #76a6ff;
  /* background-color: #3d9665; */
}

#selectForm {
  margin: 1.4rem;
  margin-top: 1.8rem;
}

#selectForm span {
  color: #fff;
  font-size: 15px;
  margin: 2rem;
}

/* 登陆 */
#loginName,
#loginPassword,
#registeName,
#registePassword,
#registePassword2 {
  background-color: rgba(255, 255, 255, 0);
  width: 14rem;
  font-size: 15px;
  height: 1.8rem;
  color: #fff;
  border: 0;
  border-bottom: 1px solid #eee;
  padding-left: 0.3rem;
}

#registeForm,
#loginForm {
  display: flex;
  flex-direction: column;
  color: #fff;
}

#btn_go,
#btn_go2 {
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, 0);
  color: #fff;
  height: 2.4rem;
  font-size: 15px;
  box-shadow: 0px 0px 5px #fff;
  margin-top: 0.7rem;
}

.error {
  box-shadow: 0px 0px 7px red;
}

input::-webkit-input-placeholder {
  color: #eee;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #eee;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #eee;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #eee;
}

input:focus {
  outline: none;
  box-shadow: 0px 0px 6px #fff;
}
</style>