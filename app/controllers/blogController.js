const blog = require('../models/blog')
const comments = require("../models/comments")
const mongoose = require("mongoose")
class blogController{
    async create(req,res){
        // console.log(req.user)
        try {
          req.body.author = req.user.username
        req.body.author_id = req.user.id
        const Blog = new blog(req.body)
        await Blog.save()
        
        res.status(201).json({
            blog: Blog,
            message: "Tạo thành công"
        });  
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tạo blog' });

        }
        

    }
    async showAll(req,res){
        try {
          const findBlog = await blog.find({})
        
            res.json({
                blogs: findBlog,
                message: "Có tìm được blog",
                total_blogs: findBlog.length
            })  
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tìm blog' })
        }
        
    }
    async showById(req,res){
        try {
            const findBlog = await blog.findById(req.params.id)
            res.json({
                blog: findBlog,
                message: "Có tìm được blog",
                
            })  
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi tìm blog' })
        }
        

    }
    async update(req,res){
        try {
            
            await blog.findOneAndUpdate({_id:req.params.id},req.body)
            res.status(200).json({message:"Cập nhật thành công thành công"})
        } catch (error) {
            res.status(500).json({message:"Cập nhật thất bại"})
        }
        
    }
    async deletebyId (req,res){
        try {
            await blog.delete({_id: req.params.id})
            
if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Không tìm thấy blog để xóa" });
    }

            res.status(200).json({message:"Xóa thành công"})
        } catch (error) {
            res.status(500).json({message:"Xóa thất bại"})
        }
    }
    async restorebyId(req,res){
        try {
            await blog.restore({_id:req.params.id})
            res.status(200).json({message:"Khôi phục thành công"})
        } catch (error) {
            res.status(500).json({message:"Khôi phục thất bại"})
        }
    }
    async forceDeletebyId(req,res){
        try {
            await blog.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "Xóa vĩnh viễn hoàn toàn"})
        } catch (error) {
            res.status(500).json({message:"Xóa thất bại"})
        }
    }
    async trash(req,res){
        
        try {
            const trashes = await blog.findDeleted({})
            res.status(200).json({trash:trashes, total: trashes.length, message:"Thành công"})
        } catch (error) {
            res.status(500).json({message:"Thất bại"})
        }
    }
   async postcomment(req, res) {
  try {
    
    const newcomment = new comments({
      blog_id: req.params.blogid,
      author_id: req.user.id,
      author: req.user.username,
      content: req.body.comment
    });

    await newcomment.save();

    return res.status(201).json({
      success: true,
      message: "Comment posted successfully",
      data: newcomment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to post comment",
      error: error.message
    });
  }
}
    async comment(req,res){
        const Comments = await comments.find({ blog_id: req.params.blogid })
  .sort({ createdAt: -1 }) // mới nhất trước
  .limit(20);              // chỉ lấy 20 comment
  res.json({comments:Comments, message:"Tin nhắn"})
    }
   async replyComment(req, res) {
  try {
    const newcomment = new comments({
      blog_id: req.params.blogid,
      author_id: req.user.id,
      author: req.user.username,
      content: req.body.comment,
      parentId: req.body.parentId
    });

    await newcomment.save();

    return res.status(201).json({
      success: true,
      message: "Reply posted successfully",
      data: newcomment
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to post reply",
      error: error.message
    });
  }
}
async updateComment(req,res){
    try {
        const result = await comments.updateOne(
      { _id: req.params.id },
      { content: req.body.comment  }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Comment not found or no changes made"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully"
    })

        
    } catch (error) {
      return res.status(500).json({
      success: false,
      message: "Failed to update comment",
      error: error.message
    });
  
    }
  
}
async  deleteComment(req, res) {
  console.log("deleteComment called with ID:", req.params.id);

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.warn("Invalid comment ID:", id);
      return res.status(400).json({ success: false, message: "Invalid comment ID" });
    }

    const commentId = new mongoose.Types.ObjectId(id);

    // B1: Lấy toàn bộ cây con
    const result = await comments.aggregate([
      { $match: { _id: commentId } },
      {
        $graphLookup: {
          from: "comments",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentId",
          as: "descendants",
        },
      },
      {
        $project: {
          allIds: { $concatArrays: [["$_id"], "$descendants._id"] },
        },
      },
    ]);

    console.log("GraphLookup result:", JSON.stringify(result, null, 2));

    if (!result.length || !result[0].allIds || result[0].allIds.length === 0) {
      console.warn("Comment not found or no descendants");
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    const allIds = result[0].allIds;
    console.log("Deleting IDs:", allIds);

    // B2: Xóa tất cả id trong danh sách
    const delResult = await comments.deleteMany({ _id: { $in: allIds } });

    console.log("Delete result:", delResult);

    if (delResult.deletedCount === 0) {
      console.warn("No comments were deleted");
      return res.status(404).json({
        success: false,
        message: "Không có bình luận nào được xóa",
        deletedIds: allIds,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Đã xóa ${delResult.deletedCount} bình luận (bao gồm phản hồi)`,
      deletedIds: allIds,
    });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      success: false,
      message: "Xóa bình luận thất bại",
      error: error.message,
    });
  }
}

}
module.exports =new blogController