const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");

const {
  mongooseToObject,
  multipleMongooseToObject,
} = require("../../util/mongoose");
const Category = require("../models/Category");

class SiteController {
  async index(req, res) {
    const product = await Product.find({});
    return res.render("sites/home", {
      products: multipleMongooseToObject(product),
    });
  }

  // [GET] /register

  register(req, res) {
    res.render("sites/register");
  }

  // [POST] /register

  async registerPost(req, res, next) {
    const username = req.body.customer_username;
    const password = req.body.customer_password;
    const rpassword = req.body.customer_rpassword;
    const fullname = req.body.customer_name;
    const email = req.body.customer_email;
    const address = req.body.customer_address;
    const numberphone = req.body.customer_phone;

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
        return res.render("sites/register", {
          err_warning: "Bạn Phải Điền Đầy Đủ Thông Tin.",
        });
      }

      if (!emailRegexp.test(email)) {
        return res.render("sites/register", { email_err: "Email không đúng." });
      }

      if (!regex.test(numberphone)) {
        return res.render("sites/register", {
          phone_err: "Số điện thoại không đúng.",
        });
      }

      if (password != rpassword) {
        return res.render("sites/register", {
          password_err: "Mật Khẩu Nhập Lại Không Giống Nhau.",
        });
      }

      const userDB = await User.findOne({ username: username });
      if (userDB) {
        return res.render("sites/register", {
          user_err: "Tên đăng nhập đã được sử dụng.",
        });
      }

      const emailDB = await User.findOne({ email: email });
      if (emailDB) {
        return res.render("sites/register", {
          email_err: "Email đã được sử dụng.",
        });
      }

      if (!fullname) {
        return res.render("sites/register", {
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
        role_name : "member"
      });
      return res.render("sites/register", {
        message: "Đăng ký thành công",
      });
    } catch (err) {
      return res.json(err);
    }
  }
  // [GET] /login

  login(req, res) {
    res.render("sites/login");
  }

  //[POST] /login

  async loginPost(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    try {
      const userDB = await User.findOne({ username: username });
      if (!userDB) {
        return res.render("sites/login", {
          login_usererr: "Tên Đăng Nhập Không Tồn Tại.",
        });
      }

      if (userDB.password != password) {
        return res.render("sites/login", {
          password_err: "Tài Khoản Mật Khẩu Không Chính Xác.",
        });
      }

      req.session.User = {
        _id: userDB._id,
        username: userDB.username,
      };

      res.redirect("/");
    } catch (err) {
      console.error(err);
      return res.json(err);
    }
  }

  // [Get] /logout
  logout(req, res, next) {
    if (req.session) {
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    }
  }

  // [GET] /lien-he
  contact(req, res, next) {
    res.render("sites/contact");
  }

  // [GET] /cart
  async showCart(req, res, next) {
    const cartProduct = await Cart.findOne({
      "user.user_id": req.session.User._id,
    });
    if (!cartProduct) {
      return res.render("sites/cart", { message_cart: "Không Có Sản Phẩm" });
    } else {
      let total_price = 0;
      // let thanhtien = 0;
      cartProduct.products.forEach(function (product) {
        total_price += product.quanity * product.unit_price;
      });

      // cartProduct.products.forEach(function (product) {
      //   thanhtien = product.quanity * product.unit_price;
      //   Object.assign(product,{
      //     thanhtien : thanhtien
      //   })
      //   console.log(thanhtien);
      // });

      return res.render("sites/cart", { cart: mongooseToObject(cartProduct),total_price : total_price});
    }
  }

  // [DELETE] /:id
  deleteProductCart(req,res,next){
    Cart.deleteOne({_id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next);
  }
}

module.exports = new SiteController();
