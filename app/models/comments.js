const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    blog_id:{type:String,required:true},
    author_id:{type:String,required:true},
    author:{type:String,required:true} ,
    content:{type:String, required:true,minlength:5},
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }
})

module.exports = mongoose.model("comments",commentSchema)