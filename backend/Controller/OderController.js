const  UserModel = require('../Model/UserModel')
const  OrderModel = require('../Model/OrderModel')


exports.placeOrder = [async(req,res)=>{
    try{
        const {userId,items, amount, address} = req.body
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date: Date.now()
        }
        const newOreder = new OrderModel(orderData)
        await newOreder.save()
        await UserModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    }catch (error) {
        res.json({success:false,message:error.message})
    }
}]

exports.allOrders = [async(req,res)=>{
    try {
        
        const orders = await OrderModel.find({})
        res.json({success:true,orders})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}]

exports.updateStatus =[async (req,res)=>{
    try {
        const { orderId, status } = req.body
        await OrderModel.findByIdAndUpdate(orderId, { status })
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}]

exports.userOrders = [async(req,res)=>{
    try{
        const { userId } = req.body

        const orders = await OrderModel.find({ userId })
        res.json({success:true,orders})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}]