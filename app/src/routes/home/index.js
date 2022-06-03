"use strict";

const express = require("express");
const router =express.Router();

const { upload } = require("./multer");
const User = require("../../model/User");

//컨트롤러: 이전으로 되감아서 컨트롤러 기능을 갖는 콜백 함수를 복사
const ctrl = require("./home.ctrl");


//처음 화면
router.get("/", ctrl.output.home);

//로그인 화면
router.get("/login",ctrl.output.login);
router.post("/login",ctrl.process.login);

//민원제기 화면
router.get("/filecivil",ctrl.output.filecivil);
router.post('/filecivil',upload.single('image'),ctrl.process.register);

//관리자 화면
router.get("/manager",ctrl.output.manager);

//디테일 화면
router.get("/detail",ctrl.output.detail);

//모어디테일
router.get("/moredetail",ctrl.output.moredetail);
router.post("/moredetail",ctrl.process.moredetail);


module.exports = router;