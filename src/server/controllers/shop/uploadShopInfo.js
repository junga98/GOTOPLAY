var express = require('express');
var router = express.Router();
const path = require('path');

const shopmodels = require('./../../models/shopModel').shopModel
var formidable = require('formidable') // 表单解析


// 图文上传
router.post('/', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, './../../public/upload')
  form.keepExtensions = true; //保存扩展名  
  form.multiples = true;

  form.parse(req, function (err, fields, files) {
    var imgPath = path.basename(files.file.path);

    let photo = []
    photo.push(imgPath)

    // 问题：1.多文件上传， 2.formData传数组
    console.log(typeof (fields.orders));

    let shopInfo = new shopmodels({
      name: fields.name,
      keyword: fields.keyword,
      costType: fields.costType,
      star: fields.star,
      type: fields.type,
      location: fields.location,
      price: fields.price,
      photo: photo,
      comment: fields.comment,
      orders: fields.orders,
      collections: fields.collections
    })

    shopmodels.create(shopInfo, function (err) {
      if (err) {
        console.log(err)
        res.send({
          status: "0"
        })
      } else {
        res.send({
          status: "1", //商家信息添加成功
        })
      }
    })
    // res.send({
    //   status: "1", //商家信息添加成功
    // })
  });

})

module.exports = router;