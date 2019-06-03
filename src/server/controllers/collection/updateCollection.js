var express = require('express');
var router = express.Router();
let usermodels = require('./../../models/userModel').userModel

router.post('/', (req, res) => {
  let reqData = req.body.orders
  const countNum = reqData.length

  let count = 0

  if (countNum == 0) {
    res.send({
      status: "1"
    })
    return false
  }

  function updateDocs(_id, orders) {
    console.log(_id);

    usermodels.updateOne({
      'account': 'a',
      collections: {
        $elemMatch: {
          _id: _id
        }
      }
    }, {
      $set: {
        "collections.$.orders": orders
      }
    }, (err, doc) => {
      if (err) {
        console.log(err);

        res.send({
          status: "0"
        })
      } else {
        count += 1
        console.log(count + ':' + countNum);
        if (count == countNum) {
          console.log('发送啦');

          res.send({
            status: "1"
          })
        }
      }
    })
  }

  for (let i = 0; i < reqData.length; i++) {
    let _id = reqData[i]._id
    let orders = reqData[i].orders
    updateDocs(_id, orders)
  }

})
module.exports = router;