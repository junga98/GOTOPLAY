var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new mongoose.Schema({
  _id: String,
  shop: Number,
  name: String,
  keyword: String,
  costType: String,
  type: String,
  location: String,
  price: Number,
  star: Number,
  photo: [],
  comment: [],
  orders: [],
  collections: Number
}, {
  versionKey: false
});



shopSchema.pre('save', function (next) {
  const _this = this;
  shopModel.findByIdAndUpdate({
    _id: "shop"
  }, {
    $inc: {
      shop: 1
    }
  }, {
    new: true,
    upsert: true
  }, function (error, shopSchema) {
    if (error)
      return next(error);
    _this._id = "shop" + shopSchema.shop;
    next();
  });
});

var shopModel = mongoose.model('shopModel', shopSchema)

module.exports = {
  shopModel: shopModel,
}