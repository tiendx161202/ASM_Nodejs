const express = require("express");
const router = express.Router();
const siteRouter = require("../app/controllers/SiteController");
const checkLogin = require("../app/middlewares/checkLoginSessionMiddleware");


router.get("/cart",checkLogin,siteRouter.showCart);
router.delete("/:id",siteRouter.deleteProductCart);
router.get("/lien-he",siteRouter.contact);
router.post("/register",siteRouter.registerPost);
router.get("/register",siteRouter.register);
router.post("/login", siteRouter.loginPost);
router.get("/login", siteRouter.login);
router.get("/logout", siteRouter.logout);
router.get("/", siteRouter.index);

module.exports = router;
