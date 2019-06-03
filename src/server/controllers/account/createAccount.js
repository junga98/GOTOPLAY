var express = require('express');
var router = express.Router();

const usermodels = require('../../models/userModel').userModel;


router.post('/', (req, res) => {

  let newAccount = new usermodels({
    _id: 'user',
    account: req.body.account,
    password: req.body.password
  }) //查询该账号是否已经被注册  
  usermodels.count({
    "account": newAccount.account
  }, (err, docs) => {
    if (err) {
      console.log("Error:" + err)
      res.send(err)
    } else {
      console.log("Docs:" + docs)
      if (docs >= 1) {
        res.send({
          code: 2, // 账号已存在
        })
      } else {
        usermodels.create(newAccount, function (err, data) {
          if (err) {
            res.send(err)
          } else {
            res.send({
              code: 1, //注册成功
            })
          }
        })
      }
    }
  })
})

module.exports = router;