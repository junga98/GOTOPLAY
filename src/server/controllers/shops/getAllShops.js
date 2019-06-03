var express = require('express');
var router = express.Router();

const shopmodels = require('../../models/shopModel').shopModel;
// const shops = require('./../../config/items.js').json

router.get('/', (req, res) => {
  // console.log(shops.store);
  let sendArr = []
  let search = req.query.search

  shopmodels.find({},
    (err, doc) => {
      if (err) {
        res.send({
          status: 0
        })
      } else {
        console.log(doc);

        // let store = shops.store
        doc.map(function (item) {
          if (item.keyword == search) {
            sendArr.push(item)
          }
        })

        res.send({
          shops: sendArr
        })

      }

    }
  )

  // let store = shops.store
  // console.log(store);

  // store.map(function (item) {
  //   if (item.keyword == search) {
  //     sendArr.push(item)
  //   }
  // })
  // res.send({
  //   shops: sendArr
  // })


})

module.exports = router;