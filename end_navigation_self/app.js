var createError = require('http-errors');
var express = require('express');//引入express
var path = require('path');
var logger = require('morgan');//日志模块


var bodyParser = require('body-parser');//解析post数据
var ejs = require('ejs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));//写日志
app.use(express.json());
app.use(express.urlencoded({ extended: false }));//解析传入的请求 false使用querystring library 解析

//解析post数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', ejs.__express);
app.set('view engine', 'html');


var cataRt = require("./routes/cataRt");
app.use("/cata",cataRt);
var navRt = require("./routes/navRt");
app.use("/nav",navRt);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
