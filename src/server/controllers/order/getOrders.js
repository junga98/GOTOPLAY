var express = require('express');
var router = express.Router();
let ordermodels = require('./../../models/orderModel').orderModel

router.get('/', (req, res) => {
  let userName = req.query.userName
  console.log(userName);

  ordermodels.find({
    "userName": userName
  }, (err, docs) => {
    if (err) {
      console.log(err);
      res.send({
        status: 0
      })
    } else {
      console.log(docs);

      res.send({
        status: 1,
        orders: docs
      })
    }
  })
})
module.exports = router;