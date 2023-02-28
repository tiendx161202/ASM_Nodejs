const siteRouter = require('./site');
const adminRouter = require('./admin');
const productRouter = require('./product');

function route(app){
    app.use('/san-pham',productRouter)
    app.use('/admin',adminRouter);
    app.use('/', siteRouter);
}

module.exports = route; 