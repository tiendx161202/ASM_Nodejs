const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../../util/mongoose");

const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");

class AdminController {
  index(req, res) {
    // res.render("admins/home");
    res.render("admins/login", { layout: "admin_no_partials" });
  }

  // [GET] /admin/login (view admin Login Form)
  loginAdmin(req, res) {
    res.render("admins/login", { layout: "admin_no_partials" });
  }

  // [POST] /admin/login
  async loginPost(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // return res.render('admins/login', { layout:'admin_no_partials'},{message : "Tài Khoản Mật Khẩu Không Chính Xác"})
    try {
      const useradminDB = await User.findOne({ username: username });
      // const roleAdmin = await User.findOne({role : {role_name : "superadmin"}});
      // return res.json(useradminDB.role_name)
      const stringRole = ["Quản lý", "Nhân viên"];
      if (
        !useradminDB ||
        useradminDB.password != password ||
        !stringRole.includes(useradminDB.role_name)
      ) {
        return res.render("admins/login", {
          layout: "admin_no_partials",
          message: "Tài Khoản Mật Khẩu Không Chính Xác",
        });
      }

      req.session.UserAdmin = {
        _id: useradminDB.id,
        useradmin: useradminDB.username,
      };

      return res.render("admins/home");
    } catch (err) {
      return res.json(err);
    }
  }

  // [GET] /admins/addAdmin
  addAdmin(req, res) {
    res.render("admins/addAdmin");
  }

  // [POST] /admins/addAdmin
  async addAdminPost(req, res) {
    const username = req.body.customer_username;
    const password = req.body.customer_password;
    const rpassword = req.body.customer_rpassword;
    const fullname = req.body.customer_name;
    const email = req.body.customer_email;
    const address = req.body.customer_address;
    const numberphone = req.body.customer_phone;
    const role_name = req.body.role_name;

    const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const emailRegexp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    try {
      if (
        !password ||
        !username ||
        !rpassword ||
        !email ||
        !address ||
        !numberphone
      ) {
        return res.render("admins/addAdmin", {
          err_warning: "Bạn Phải Điền Đầy Đủ Thông Tin.",
        });
      }

      if (!emailRegexp.test(email)) {
        return res.render("admins/addAdmin", {
          email_err: "Email không đúng.",
        });
      }

      if (!regex.test(numberphone)) {
        return res.render("admins/addAdmin", {
          phone_err: "Số điện thoại không đúng.",
        });
      }

      if (password != rpassword) {
        return res.render("admins/addAdmin", {
          password_err: "Mật Khẩu Nhập Lại Không Giống Nhau.",
        });
      }

      const userDB = await User.findOne({ username: username });
      if (userDB) {
        return res.render("admins/addAdmin", {
          user_err: "Tên đăng nhập đã được sử dụng.",
        });
      }

      const emailDB = await User.findOne({ email: email });
      if (emailDB) {
        return res.render("admins/addAdmin", {
          email_err: "Email đã được sử dụng.",
        });
      }

      if (!fullname) {
        return res.render("admins/addAdmin", {
          fullname_err: "Tên đầy đủ không được để trống.",
        });
      }

      User.create({
        username: username,
        password: password,
        rpassword: rpassword,
        fullname: fullname,
        email: email,
        address: address,
        numberphone: numberphone,
        role_name: role_name,
      });
      return res.render("admins/addAdmin", {
        message: "Thêm Nhân Viên Thành Công",
      });
    } catch (err) {
      return res.json(err);
    }
  }

  // [GET] logout admin
  logoutadmin(req, res, next) {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/admin");
      });
    }
  }

  // [GET] /admin/show-admin

  async showAdmin(req, res, next) {
    const userAdmin = await User.find({
      $or: [{ role_name: "Quản lý" }, { role_name: "Nhân viên" }],
    });

    res.render("admins/showAdmin", {
      users: multipleMongooseToObject(userAdmin),
    });
  }

  //[GET] /admin/detail-admin/:username
  async detailAdmin(req, res, next) {
    const userAdmin = await User.findOne({ username: req.params.username });
    if (!userAdmin) {
      return res.redirect("/admin/show-admin");
    }
    res.render("admins/detailAdmin", { users: mongooseToObject(userAdmin) });
  }

  // [GET] /admin/addCategory
  addCategory(req, res, next) {
    res.render("admins/sites/addCategory");
  }

  // [POST] /admin/addCategoryPost
  async addCategoryPost(req, res, next) {
    const category = new Category(req.body);
    category
      .save()
      .then(() =>
        res.render("admins/sites/addCategory", {
          message_category: "Thêm danh mục sản phẩm thành công",
        })
      )
      .catch(next);
  }

  // [GET] /admin/listCategory
  async listCategory(req, res, next) {
    const listCategory = await Category.find({});
    return res.render("admins/sites/listCategory", {
      categories: multipleMongooseToObject(listCategory),
    });
  }

  //[GET] /admin/viewEditCategory
  async viewEditCategory(req, res, next) {
    const categoryId = await Category.findOne({ id: req.params._id });
    return res.render("admins/sites/viewEditCategory", {
      categories: mongooseToObject(categoryId),
    });
  }
  // [PUT] /edit-category/:id
  editCategory(req, res, next) {
    Category.updateOne({ _id: req.params.id }, req.body)
      .then(() =>
        res.render("admins/sites/viewEditCategory", {
          message: "Cập nhập tên danh mục thành công !",
        })
      )
      .catch(next);
  }

  // [DELETE] /delete-category/:id
  deleteCategory(req, res, next) {
    Category.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [GET] /admin/addProduct
  addProduct(req, res, next) {
    return res.render("admins/sites/addProduct");
  }

  // [POST] /admin/addProduct
  addProductPost(req, res, next) {
    const product_name = req.body.product_name;
    // const product_img = req.body.product_img;
    // const categoryname = req.body.categoryname;
    let product_price = req.body.product_price;
    const product_stock = req.body.product_stock;
    const product_content = req.body.product_content;
    const product_info = req.body.product_info;
    const product_status = req.body.product_status;
    let number_productPrice = Number(product_price);
    let number_stock = Number(product_stock);
    const { product_img } = req.files;

     // If does not have image mime type prevent from uploading
     if (/^product_img/.test(product_img.mimetype)) return res.sendStatus(400);

    if (
      !product_name ||
      !product_img ||
      !product_stock ||
      // !categoryname ||
      !product_price ||
      !product_stock ||
      !product_status ||
      !product_content
    ) {
      return res.render("admins/sites/addProduct", {
        err_message: "Bạn phải đăng nhập đầy đủ thông tin !",
      });
    }

    if (!number_productPrice || isNaN(number_productPrice)) {
      return res.render("admins/sites/addProduct", {
        error: "Giá tiền phải điền số",
      });
    }

    if (isNaN(number_stock) || !number_stock){
      return res.render("admins/sites/addProduct", {
        error: "Số Lượng phải điền số",
      });
    }

    // Move the uploaded image to our upload folder
    product_img.mv(__dirname + '/upload/' + product_img.name);

    Product.create({
      product_name : product_name,
      product_img : product_img.name,
      product_price : number_productPrice,
      product_stock : number_stock,
      product_info : product_info,
      product_content : product_content,
      product_status : product_status,
    })

    return res.render("admins/sites/addProduct",{message : "Thêm sản phẩm thành công !"})
  }
}

module.exports = new AdminController();
