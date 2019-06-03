var express = require('express');
var router = express.Router();
let ordermodels = require('./../../models/orderModel').orderModel

router.get('/', (req, res) => {
  const userName = req.query.userName
  const location = req.query.location

  ordermodels.find({
    'userName': userName,
    'location': location
  }, (err, docs) => {
    // console.log(doc);
    if (err) {
      res.send({
        status: 0
      })
    } else {
      res.send({
        orders: docs
      })
    }
  })
})

module.exports = router;