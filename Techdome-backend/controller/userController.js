const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
   try {
      const { name, email, password } = req.body;
      const userfind = await User.findOne({ email });

      if (userfind) {
         res.status(400).json({ success: false, message: "email is already registered !" });
      } else {
         const user = await User.create({ name, email, password });
         res.status(201).json({ sucess: true, user });
      }

   } catch (error) {
      console.log(error);
   }
}


exports.login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email }).select("+password");

      if (user) {
         const valid = await bcrypt.compare(password, user.password);

         if (valid) {
            const token = await user.generateToken();
            res.status(200).json({ success: true, token, user });
         } else {
            res.status(400).json({ success: false, message: "Invalid password" })
         }

      } else {
         res.status(400).json({ success: false, message: "Invalid email" });
      }

   } catch (error) {
      console.log(error);
   }
}


exports.getUserData = async (req, res) => {
   try {
      const { token } = req.body;
      const { id } = jwt.verify(token, process.env.SECRET);
      const user = await User.findOne({ _id: id });
      if(user){
         res.status(200).json({ success: true, user });
      }else{
         res.status(400).json({success:false, message:"user not present"});
      }
   } catch (error) {
      console.log(error);
   }
}
