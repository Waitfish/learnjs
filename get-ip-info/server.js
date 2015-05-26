/**
 * Created by waitfish on 15/5/26.
 */
/**
 * 定义需要的模块
 */
var express = require('express');
var mongoose = require('mongoose');


var ipctl = require('./controllers/ipctrl.js');  //控制器
var config = require('./config.js');  //配置文件
var app = express();


var port = process.env.PORT || 9000; // 设置启动端口
mongoose.connect(config.database); // 连接数据库

app.get('/ip', ipctl.get_local_by_ip); //设置路由


app.listen(port);
console.log('服务器在 http://localhost:' + port + " 启动！");