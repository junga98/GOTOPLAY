var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const db = require('./../config/db')

const userSchema = new mongoose.Schema({
    _id: String,
    user: Number,
    account: String,
    password: String,
    user_item: [],
    user_like: [],
    notes: [{
        location: String,
        costType: String,
        shopName: String,
        orders: [{
            name: String,
            price: String,
            count: String
        }]
    }],
    collections: [{
        location: String,
        costType: String,
        shopName: String,
        orders: [{
            name: String,
            price: String,
            count: Number
        }]
    }],
    comments: []
}, {
    versionKey: false
});



userSchema.pre('save', function (next) {
    const _this = this;
    userModel.findByIdAndUpdate({
        _id: "user"
    }, {
        $inc: {
            user: 1
        }
    }, {
        new: true,
        upsert: true
    }, function (error, userSchema) {
        if (error)
            return next(error);
        _this._id = "user" + userSchema.user;

        next();
    });
});

var userModel = mongoose.model('userModel', userSchema)

module.exports = {
    userModel: userModel
}