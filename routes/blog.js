
const express = require('express');
const router = express.Router();
const BlogControllers = require('../app/controllers/blogController');
const authMiddleware = require("../config/middleware/authmiddleware");

// 📘 Bài viết - CRUD
router.post('/create', authMiddleware, BlogControllers.create);
router.post('/update/:id', authMiddleware, BlogControllers.update);
router.get('/show', BlogControllers.showAll);
router.get('/show/:id', BlogControllers.showById);

// 🗑️ Bài viết - Xóa, khôi phục, xóa vĩnh viễn
router.post('/delete/:id', authMiddleware, BlogControllers.deletebyId);
router.post('/restore/:id', authMiddleware, BlogControllers.restorebyId);
router.post('/force-delete/:id', authMiddleware, BlogControllers.forceDeletebyId);
router.get('/trash', authMiddleware, BlogControllers.trash);

// 💬 Bình luận
router.post('/comment/:blogid', authMiddleware, BlogControllers.postcomment);
router.post("/reply/:blogid",authMiddleware,BlogControllers.replyComment)
router.post("/updateComment/:id",authMiddleware,BlogControllers.updateComment)
router.post('/deleteCmt/:id',authMiddleware,BlogControllers.deleteComment)
router.get('/comment/:blogid', BlogControllers.comment);


module.exports = router;