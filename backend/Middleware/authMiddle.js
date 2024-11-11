const jwt = require('jsonwebtoken')

exports.authUser = [async(req,res,next)=>{
    const {token} = req.headers

    if(!token){
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try{
        const decode = jwt.verify(token,"key_code")
        req.body.userId = decode.id
        next()
    }catch(err){
        res.json({success:false,message:err.message})
    }

}]