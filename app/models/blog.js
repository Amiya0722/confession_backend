const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const blogSchema = new Schema({
    title:{type: String, required: true},
    description:{type: String,required:true},
    content:{type:String,required:true},
    author:{type:String},
    author_id:{type:String}
},{timestamps: true})
blogSchema.plugin(mongoose_delete,{deletedAt: true, overrideMethods: 'all'})
module.exports = mongoose.model("Blog", blogSchema)