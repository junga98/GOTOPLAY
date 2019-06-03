var express = require('express');
var router = express.Router();
var usermodels = require('../../models/userModel').userModel
const jwt = require('jsonwebtoken') // 登录验证

router.post('/', (req, res) => {
  let newAccount = {
    account: req.body.account,
    password: req.body.password
  }
  //查询该账号是否存在  
  usermodels.findOne({
    account: req.body.account
  }, (err, docs) => {
    if (err) {
      console.log("Error:" + err)
      res.send(err)
    } else {
      if (!docs == "") {
        // 存在，验证账号密码是否正确 

        if (docs.password === newAccount.password) {
          const payload = {
            name: newAccount.account,
          }
          const secret = 'GOTOPLAY' // 密匙

          const token = jwt.sign(
            payload, secret, {
              expiresIn: '3600s'
            } //1小时
          )
          res.send({
            code: 1, // 登录成功
            token: token
          })
        } else {
          res.send({
            code: -1 // 密码错误
          })
        }
      } else {
        res.send({
          code: -2 // 账号不存在
        })
      }
    }
  })
});

// 验证jsonwebtoken是否过期的中间件，在login接口后面执行，除了login接口的请求外，其他接口都需要验证token
router.use(function jwtVerify(req, res, next) { // 拦截请求, 检查验证token
  let token = req.headers['authorization']
  // console.log(token)
  var cert = 'Origin'
  // 先解密
  if (token) {
    jwt.verify(token, cert, function (err, decoded) {
      if (err) {
        console.log("token验证信息存在错误")
        res.send({
          status: false
        })
      } else {
        next() // token验证通过 放行
      }
    })
  } else {
    res.send({
      status: false
    })
    // console.log("用户验证信息已过期")
  }
});

module.exports = router;