const express = require("express");
const router = express.Router();
const adminRouter = require("../app/controllers/AdminController");


router.get("/login", adminRouter.loginAdmin);
router.post("/login", adminRouter.loginPost);
router.get("/", adminRouter.index);

module.exports = router;
