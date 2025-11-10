const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const userSchema = new Schema({
    username: {type:String,required: true},
    password: {type: String,required:true}
},{timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // chỉ băm nếu mật khẩu thay đổi
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});


module.exports = mongoose.model("User", userSchema)
