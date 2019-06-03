var express = require('express');
var router = express.Router();
let ordermodels = require('./../../models/orderModel').orderModel

router.get('/', (req, res) => {
  let type = req.query.type
  let userName = req.query.userName

  if (type == "all") { // 获取全部未旅游地点的名字
    console.log("获取未旅游");

    ordermodels.find({
      "userName": userName
    }, {
      "location": 1,
    }, (err, docs) => {
      if (err) {
        console.log(err);
        res.send({
          status: 0
        })
      } else {
        console.log(docs);

        let locNames = []

        let col = docs
        col.map(function (item, index) {
          locNames[index] = item.location
        })
        console.log(locNames);

        res.send({
          status: 1,
          notravelNames: locNames
        })
      }
    })
  } else { // 获取特定收藏内容
    console.log(type + "else");
    ordermodels.aggregate().unwind('collections')
      .match({
        'account': "a",
        'collections.location': locName
      }).exec(
        (err, doc) => {
          // console.log(doc);
          if (err) {
            res.send({
              status: 0
            })
          } else {
            let docs = doc
            let cols = []

            for (let i in docs) {
              cols[i] = docs[i].collections
            }
            // console.log(cols);
            res.send({
              collections: cols
            })
          }

        }
      )
  }
})
module.exports = router;