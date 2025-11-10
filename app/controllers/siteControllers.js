
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

class siteControllers{
    index(req,res){
        res.send("Hello world")
    }
async register(req, res) {
  try {
    const findUser = await User.findOne({ username: req.body.username });
    if (findUser) {
      return res.status(409).json({ response: "User already exists" });
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json({ response: "Registered successfully" });
  } catch (error) {
    return res.status(500).json({
      response: "Registration failed",
      error: error.message
    });
  }
}
    async login(req,res){
         try {
        const { username, password } = req.body;

        // Kiểm tra đầu vào
        if (!username || !password) {
            return res.status(400).json({ message: "Thiếu username hoặc password" });
        }

        // Tìm người dùng
        const user = await User.findOne({ username });
        if (!user || !user.password) {
            return res.status(404).json({ message: "Người dùng không tồn tại hoặc thiếu mật khẩu" });
        }

        // So sánh mật khẩu
        const compared = await bcrypt.compare(password, user.password);
        if (!compared) {
            return res.status(403).json({ message: "Sai mật khẩu" });
        }

        // Tạo JWT
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET || "my-secret-token",
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Đăng nhập thành công", token });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server", error: error.message });
    }

        
    }
    profile(req,res){
        
        res.json({ message: "Đây là thông tin bảo mật", user: req.user })
    }
}
module.exports = new siteControllers

