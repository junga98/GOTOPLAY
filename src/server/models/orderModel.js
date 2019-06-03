var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const db = require('./../config/db')

const orderSchema = new mongoose.Schema({
  _id: String,
  orderId: String,
  order: Number,
  createType: {
    type: String,
    default: 'system'
  },
  location: String,
  stars: Number,
  type: String,
  shopName: String,
  userName: String,
  cost: Number,
  orders: [],
  comment: String,
  date: String
}, {
  versionKey: false
});

orderSchema.pre('save', function (next) {
  let _this = this;
  orderModel.findByIdAndUpdate({
    _id: "order"
  }, {
    $inc: {
      order: 1
    }
  }, {
    new: true,
    upsert: true
  }, function (error, orderSchema) {
    if (error)
      return next(error);
    _this._id = "order" + orderSchema.order;

    next();
  });
});

var orderModel = mongoose.model('orderModel', orderSchema)

module.exports = {
  orderModel: orderModel
}