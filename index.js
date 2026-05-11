const express = require('express')
require('dotenv').config()

const routeClient = require('./routes/client/index.route') // cú pháp để import một module trong nodejs, ở đây là file index.route.js trong thư mục routes/client
const routeAdmin = require('./routes/admin/index.route')
const app = express()
const port = process.env.PORT
const db = require('./config/database')
db.connect()  
app.set('views', './views')
app.set('view engine', 'pug')

routeClient(app) // gọi hàm routeClient và truyền tham số app vào để có thể sử dụng được các phương thức của expresss trong file index.route.js
routeAdmin(app) // gọi hàm routeAdmin và truyền tham số app vào để có thể sử dụng được các phương thức của expresss trong file index.route.js

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
