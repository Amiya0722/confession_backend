const express = require('express');
const router = express.Router();
const SiteControllers = require('../app/controllers/siteControllers');
const authMiddleware = require("../config/middleware/authmiddleware")
router.post('/register',SiteControllers.register)
router.post('/login',SiteControllers.login)
router.get('/profile',authMiddleware,SiteControllers.profile)
router.get('/', SiteControllers.index);

module.exports = router;