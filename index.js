
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('./middlewares/flash.middleware')
const app = express()
require('dotenv').config()
const methodOveride = require('method-override');
const moment = require('moment')
const routeClient = require('./routes/client/index.route') // cú pháp để import một module trong nodejs, ở đây là file index.route.js trong thư mục routes/client
const routeAdmin = require('./routes/admin/index.route')

const port = process.env.PORT
const db = require('./config/database')
const systemConfig = require('./config/system')

db.connect()  

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')


app.use(methodOveride('_method'));
app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({extended : false }));

// Flash
app.use(cookieParser('TBCNSPWRJG'));
app.use(session({ 
    secret: 'TBCNSPWRJG',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
// End Flash


// TinyMCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End TinyMCE

//Socket IO
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected' , socket.id);
});
global._io = io
// end Socket IO

app.locals.prefixAdmin = systemConfig.prefixAdmin // khai báo một biến toàn cục có tên là prefixAdmin và gán giá trị là '/admin', biến này sẽ được sử dụng trong các file pug để tạo đường dẫn đến các trang admin
app.locals.moment = moment


routeClient(app) // gọi hàm routeClient và truyền tham số app vào để có thể sử dụng được các phương thức của expresss trong file index.route.js
routeAdmin(app) // gọi hàm routeAdmin và truyền tham số app vào để có thể sử dụng được các phương thức của expresss trong file index.route.js
app.get(/.*/,(req,res)=>{
  res.render("client/pages/error/404",{
    tiltePage : "404 Not Fount"
  })
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
