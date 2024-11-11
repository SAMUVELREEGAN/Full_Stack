const multer = require('multer');
const path = require('path');
const ProductModel = require('../Model/ProductModel')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const uploader = multer({storage:storage})

exports.insert=[
    uploader.fields([
        {name:"image1",maxCount:1},
        {name:"image2",maxCount:1},
        {name:"image3",maxCount:1},
        {name:"image4",maxCount:1},
    ]),async(req,res)=>{
        try{
            const images =  [
                req.files["image1"]?req.files["image1"][0].filename:null,
                req.files["image2"]?req.files["image2"][0].filename:null,
                req.files["image3"]?req.files["image3"][0].filename:null,
                req.files["image4"]?req.files["image4"][0].filename:null,
            ]

            const {name,description,category,subcategory,price,sizes,bestseller} = req.body
            const productData ={
                name,
                description,
                image:images,
                category,
                subcategory,
                price:Number(price),
                sizes:JSON.parse(sizes),
                date:Date.now(),
                bestseller:bestseller === "true" ? true : false,
            }
            const product = new ProductModel(productData)
               await product.save()
            res.json({success:true,message:"Product Added Successfully"})
        }catch(err){
            res.json({success:false,message:err.message})
        }
    }
]

exports.list=[async(req,res)=>{
    try{
        const products = await ProductModel.find({})
        res.json({success:true,products})

    }catch(err){
        res.json({success:false,message:err.message})
    }
}]

exports.remove = [
    async(req,res)=>{
        try{
            await ProductModel.findByIdAndDelete(req.body.id)
            res.json({success:true,message:"User Removed"})
        }catch(er){
            res.json({success:false,message:er.message})
        }
    }
]