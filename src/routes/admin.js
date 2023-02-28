const express = require("express");
const router = express.Router();
const adminRouter = require("../app/controllers/AdminController");

router.get("/detail-admin/:username", adminRouter.detailAdmin);
router.get("/detail-admin", adminRouter.detailAdmin);
router.get("/show-admin", adminRouter.showAdmin);
router.get("/login", adminRouter.loginAdmin);
router.post("/login", adminRouter.loginPost);
router.post("/addAdmin", adminRouter.addAdminPost);
router.get("/addAdmin", adminRouter.addAdmin);
router.get("/logout", adminRouter.logoutadmin);
router.get("/", adminRouter.index);

module.exports = router;
