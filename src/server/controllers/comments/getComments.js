var express = require('express');
var router = express.Router();
let ordermodels = require('./../../models/orderModel').orderModel

router.get('/', (req, res) => {
  let shopName = req.query.shopName

  console.log(shopName);

  // 获取商家的名字
  ordermodels.find({
      'shopName': shopName
    }, {
      'userName': 1,
      "comment": 1,
      "date": 1,
      "stars": 1
    },
    (err, doc) => {
      if (err) {
        res.send({
          status: 0
        })
      } else {
        res.send({
          comments: doc,
          status: "1"
        })
      }

    }
  )

})
module.exports = router;