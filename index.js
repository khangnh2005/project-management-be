const express = require('express')
require('dotenv').config()
const route = require('./routes/client/index.route') // cú pháp để import một module trong nodejs, ở đây là file index.route.js trong thư mục routes/client
const app = express()
const port = process.env.PORT

app.set('views', './views')
app.set('view engine', 'pug')

route(app) // gọi hàm route và truyền tham số app vào để có thể sử dụng được các phương thức của expresss trong file index.route.js

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
