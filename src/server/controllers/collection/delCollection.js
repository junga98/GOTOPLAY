var express = require('express');
var router = express.Router();
let usermodels = require('./../../models/userModel').userModel

router.post('/', (req, res) => {
  let reqData = req.body

  let del = reqData.del_id

  let countNum = del.length
  let count = 0

  if (countNum == 0) {
    res.send({
      status: "1"
    })
    return false
  }

  function delDocs(_id) {
    usermodels.updateOne({
      'account': 'a'
    }, {
      $pull: {
        collections: {
          _id: _id
        }
      }
    }, (err, doc) => {
      if (err) {
        res.send({
          status: "0"
        })
      } else {
        count += 1
        console.log(count + ':' + count);

        if (count == countNum) {
          console.log('发送');

          res.send({
            status: "1"
          })
        }
      }
    })
  }

  for (let i = 0; i < del.length; i++) {
    let _id = del[i]
    delDocs(_id)

    // .then(a => {
    // })
  }

})
module.exports = router;