var express = require('express');
var router = express.Router();
let usermodels = require('./../../models/userModel').userModel

router.get('/', (req, res) => {
  let locName = req.query.locName

  if (locName == "all") { // 获取全部收藏的名字
    usermodels.findOne({
      "account": "a"
    }, {
      "collections": 1,
      "_id": 0
    }).exec((err, docs) => {
      if (err) {
        console.log(err);
        res.send({
          status: 0
        })
      } else {

        // console.log(type()
        let locNames = []

        let col = docs.collections
        col.map(function (item, index) {
          locNames[index] = item.location
        })

        res.send({
          status: 1,
          collections: locNames
        })
      }
    })
  } else { // 获取特定收藏内容
    console.log(locName);
    usermodels.aggregate().unwind('collections')
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