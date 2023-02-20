const express = require("express");
const router = express.Router();
const siteRouter = require("../app/controllers/SiteController");


router.post("/register",siteRouter.registerPost);
router.get("/register",siteRouter.register);
router.post("/login", siteRouter.loginPost);
router.get("/login", siteRouter.login);
router.get("/logout", siteRouter.logout);
router.get("/", siteRouter.index);

module.exports = router;
