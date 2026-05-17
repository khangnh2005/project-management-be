
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const methodOveride = require('method-override');
const routeClient = require('./routes/client/index.route') // cú pháp để import một module trong nodejs, ở đây là file index.route.js trong thư mục routes/client
const routeAdmin = require('./routes/admin/index.route')

const port = process.env.PORT
const db = require('./config/database')
const systemConfig = require('./config/system')
db.connect()  

app.set('views', './views')
app.set('view engine', 'pug')


app.use(methodOveride('_method'));
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended : false }));

app.locals.prefixAdmin = systemConfig.prefixAdmin // khai báo một biến toàn cục có tên là prefixAdmin và gán giá trị là '/admin', biến này sẽ được sử dụng trong các file pug để tạo đường dẫn đến các trang admin

routeClient(app) // gọi hàm routeClient và truyền tham số app vào để có thể sử dụng được các phương thức của expresss trong file index.route.js
routeAdmin(app) // gọi hàm routeAdmin và truyền tham số app vào để có thể sử dụng được các phương thức của expresss trong file index.route.js


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
