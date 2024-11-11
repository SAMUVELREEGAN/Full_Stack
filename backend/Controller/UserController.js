const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {  validationResult } = require('express-validator');
const UserModel = require('../Model/UserModel');
const UserValidator = require('../Validator/UserValidator')

const createToken = (id) => {
    return jwt.sign({ id }, "key_code", { expiresIn: '1h' });
};

exports.register = [
    UserValidator.insert,async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const exist = await UserModel.findOne({ email });
            if (exist) {
                return res.status(400).json({ success: false, message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword
            });

            const user = await newUser.save();

            const token = createToken(user._id);

            res.status(201).json({ success: true, message: token });

        } catch (err) {
            res.status(500).json({ success: false, message: err.message });
        }
    }
];


exports.login=[
    async(req,res)=>{
        try{
        const {email,password} = req.body

        const user = await UserModel.findOne({email})
        if(!user){
            res.json({success:false,message:"User doesn't exits"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else {
            res.json({ success: false, message: 'Invalid credentials' })
        }
        }catch(err){
            res.json({success:true,message:err.message})
        }
    }
]

exports.list=[(req,res)=>{
    UserModel.find().then((saved)=>{res.send(saved)}).catch((err)=>{res.send(err)})
}]

exports.remove = [
    async(req,res)=>{
        try{
            await UserModel.findByIdAndDelete(req.body.id)
            res.json({success:true,message:"Product Removed"})
        }catch(er){
            res.json({success:false,message:er.message})
        }
    }
]

exports.adminLogin = [
    async(req,res)=>{
        try{
            const {email,password} = req.body
            if(email === "admin@gmail.com" && password ==="123"){
                const token = jwt.sign(email+password,"key_code")
                res.json({success:true,token})
            }else{
                res.json({success:false,message:"Invalid credentials"})
            }
        }catch(er){
            res.json({success:false,message:er.message})
        }
    }
]