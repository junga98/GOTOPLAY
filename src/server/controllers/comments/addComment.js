var express = require('express');
var router = express.Router();
let usermodels = require('./../../models/userModel').userModel
let ordermodels = require('./../../models/orderModel').orderModel

router.post('/', (req, res) => {
  const reqData = req.body
  const userName = reqData.userName

  const _id = reqData._id
  const comment = reqData.content
  const stars = reqData.stars


  console.log(reqData);
  usermodels.updateOne({ // step1: 往user表-comments中插入评论
    account: userName
  }, {
    "$push": {
      "comments": reqData
    }
  }, (err) => {
    if (err) {
      res.send({
        status: "0"
      })
    } else {
      console.log(_id + "ss" + comment + "ss" + stars);

      // step2: 往order表-comment中插入评论
      ordermodels.updateOne({
          _id: _id
        }, {
          "comment": comment,
          "stars": stars
        }, (err) => {
          if (err) {
            console.log(err);

            res.send({
              status: "0"
            })
          } else {
            res.send({
              status: "1"
            })
          }
        }

      )

    }
  })




})

module.exports = router;