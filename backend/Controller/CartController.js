const UserModel = require('../Model/UserModel')

exports.addToCart = async(req,res)=>{
    try{
        const {userId , itemId , size} = req.body

        const userData = await UserModel.findById(userId)

        let cartData = await userData.cartData

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            }
            else {
                cartData[itemId][size] = 1
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await UserModel.findByIdAndUpdate(userId,{cartData})

        res.json({ success: true, message: "Added To Cart" })

    }catch(error) {
        res.json({ success: false, message: error.message })
    }
}

exports.updateCart = async(req,res)=>{
    try{
        const { userId ,itemId, size, quantity } = req.body
        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity
        await UserModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: "Cart Updated" })


    }catch(er){
        res.json({success:false,message:er.message})
    }
}

exports.getUserCart = async(req,res)=>{
    try{
        const {userId} = req.body
        const userData = await UserModel.findById(userId)
        let cartData = await userData.cartData
        res.json({ success: true, cartData })
    }catch (error) {
        res.json({ success: false, message: error.message })
    }
}