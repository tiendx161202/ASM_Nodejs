const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../../util/mongoose");

const User = require("../models/User");


class AdminController {
  index(req, res) {
    res.render("admins/home");
  }

  // [GET] /admin/login (view admin Login Form)
  loginAdmin(req, res) {
    res.render("admins/login" , {layout: "admin_no_partials"});
  }

  // [POST] /admin/login
  loginPost(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    // return res.render('admins/login', { layout:'admin_no_partials'},{message : "Tài Khoản Mật Khẩu Không Chính Xác"})

    if (!username || !password) {
      return res.render("admin/login", {
        message: "Tài Khoản Mật Khẩu Không Chính Xác",
      });
    }
  }
}

module.exports = new AdminController();
