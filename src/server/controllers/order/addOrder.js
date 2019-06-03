var express = require('express');
var router = express.Router();
let ordermodels = require('./../../models/orderModel').orderModel


router.post('/', (req, res) => {
  const newOrder = req.body

  const createType = newOrder.createType

  const shopName = newOrder.shopName
  const userName = newOrder.userName
  const orders = newOrder.orders
  const cost = newOrder.cost
  const location = newOrder.location
  const stars = newOrder.stars
  const searchType = newOrder.searchType

  let comment
  if (newOrder.comment == undefined) {
    comment = ""
  } else {
    comment = newOrder.comment
  }



  const date = new Date()


  let dateStr = date.toLocaleDateString().split("-")
  let timeStr = date.toLocaleTimeString().split(":")

  function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
      rnd += Math.floor(Math.random() * 10);
    return rnd;
  }

  // orderId = 五位随机数+当前日期时间
  let orderId = `${RndNum(5)}${dateStr[0]}${dateStr[1]}${dateStr[2]}${timeStr[0]}${timeStr[1]}${timeStr[2]}`
  let orderDate = `${dateStr[0]}年${dateStr[1]}月${dateStr[2]}日 ${timeStr[0]}:${timeStr[1]}:${timeStr[2]}`

  let addOrder // 判断上传的商家是用户自己生成的还是 系统的商家
  if (createType == "usercreate") {
    addOrder = new ordermodels({
      orderId: orderId,
      createType: createType,
      shopName: shopName,
      userName: userName,
      orders: orders,
      cost: cost,
      date: orderDate,
      location: location,
      stars: stars,
      type: searchType,
      comment: comment
    })
  } else { // 默认情况下为系统的商家
    addOrder = new ordermodels({
      orderId: orderId,
      shopName: shopName,
      userName: userName,
      orders: orders,
      cost: cost,
      date: orderDate,
      location: location,
      stars: stars,
      type: searchType,
      comment: comment
    })
  }


  // 添加订单
  ordermodels.create(addOrder, function (err) {
    if (err) {
      console.log(err)
      res.send({
        status: "0"
      })
    } else {
      res.send({
        status: "1", //订单已生成
      })
    }
  })

})
module.exports = router;