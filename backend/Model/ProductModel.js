const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subcategory:{type:String,required:true},
    price:{type:Number,required:true},
    sizes:{type:Array,required:true},
    date:{type:String},
    bestseller:{type:Boolean,required:true},
})

const ProductModel = mongoose.model("product",productSchema)

module.exports = ProductModel