var express = require('express');
var router = express.Router();
let usermodels = require('./../../models/userModel').userModel

router.post('/', (req, res) => {
  let newCollection = req.body

  usermodels.count({
    "account": 'a',
    "collections": {
      "$elemMatch": {
        "location": newCollection.location,
        "shopName": newCollection.shopName
      }
    }
  }).exec(
    (err, docs) => {
      if (err) {
        res.send({
          status: "0"
        })
      } else {
        if (docs >= 1) {
          // 已在收藏内
          console.log("已在收藏内");
          
          res.send({
            status: "-1"
          })
        } else {
          // 添加收藏
          usermodels.update({
            "account": "a"
          }, {
            "$push": {
              "collections": newCollection
            }
          }).exec((err) => {
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
    }
  )
})
module.exports = router;