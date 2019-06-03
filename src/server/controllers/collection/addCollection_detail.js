var express = require('express');
var router = express.Router();
let usermodels = require('./../../models/userModel').userModel

router.post('/', (req, res) => {
  let newCollection = req.body
  const orders = newCollection.orders

  usermodels.count({
    "account": 'a',
    "collections": {
      "$elemMatch": {
        "location": newCollection.location,
        "shopName": newCollection.shopName
      }
    }
  }, (err, docs) => {
    if (err) {
      res.send({
        status: "0"
      })
    } else {
      if (docs >= 1) {
        // 已在收藏内
        console.log("已在收藏内,先进行更新");
        usermodels.updateOne({
          'account': 'a',
          collections: {
            $elemMatch: {
              location: newCollection.location,
              shopName: newCollection.shopName
            }
          }
        }, {
          $addToSet: {
            "collections.$.orders": orders
          }
        }, (err, doc) => {
          if (err) {
            console.log(err);
            console.log('更新完成，删除{平均消费}');
            res.send({
              status: "0"
            })
          } else {
            console.log('删除{平均消费}');

            usermodels.updateOne({
              'account': 'a',
              collections: {
                $elemMatch: {
                  location: newCollection.location,
                  shopName: newCollection.shopName
                }
              }
            }, {
              $pull: {
                "collections.$.orders": {
                  name: "平均消费"
                }
              }
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
            })
          }
        })
      } else {
        // 添加收藏
        usermodels.update({
          "account": "a"
        }, {
          "$push": {
            "collections": newCollection
          }
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
        })
      }
    }
  })
})
module.exports = router;