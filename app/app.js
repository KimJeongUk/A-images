"use strict";

//모듈
const express = require("express")
const bodyParser = require("body-parser");
//환경변수
const dotenv = require("dotenv"); 
dotenv.config();
const app = express();

//라우팅
const home = require("./src/routes/home");




//앱 세팅
app.set("views","./src/views");
app.set("view engine", "ejs");
//ejs 에서 js파일로 접근 가능하게 해주는 미들웨어
app.use(express.static(`${__dirname}/src/public`));
//url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 제대로 인식되지 않는 문제 해결
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 



// use -> 미들웨어 등록
app.use("/",home);

module.exports = app;