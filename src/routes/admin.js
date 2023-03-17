const express = require("express");
const router = express.Router();
const adminRouter = require("../app/controllers/AdminController");

// Show all list product 
router.get("/showListProduct" , adminRouter.showListProduct);
// Show view addPRoduct in admin
router.get("/addProduct" , adminRouter.addProduct);
router.post("/addProduct" , adminRouter.addProductPost);

// Delete category
router.delete("/delete-category/:id", adminRouter.deleteCategory);
// View and function edit category in admin
router.get("/viewEditCategory/:id", adminRouter.viewEditCategory);
router.put("/edit-category/:id", adminRouter.editCategory);
// show all list category
router.get("/listCategory", adminRouter.listCategory);
// view and function add category in admin
router.get("/addCategory", adminRouter.addCategory);
router.post("/addCategory", adminRouter.addCategoryPost);

// View show all admin and function detailAdmin
router.get("/detail-admin/:username", adminRouter.detailAdmin);
router.get("/show-admin", adminRouter.showAdmin);

// View and function Login admin
router.get("/login", adminRouter.loginAdmin);
router.post("/login", adminRouter.loginPost);

// View and function Register admin
router.post("/addAdmin", adminRouter.addAdminPost);
router.get("/addAdmin", adminRouter.addAdmin);

// Function Logout
router.get("/logout", adminRouter.logoutadmin);

// Index admin
router.get("/", adminRouter.index);

module.exports = router;
