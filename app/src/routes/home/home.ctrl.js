"use strict";

const User = require("../../model/User");
// const logger = require("../../config/logger");
const multer = require("multer");
const spawn = require("child_process").spawn;
const db = require("../../../config/db");
const fs = require("fs");

const output ={
     home : (req, res)=>{
        console.log(`GET / 304  "홈 화면으로 이동"`); //index 화면
        res.render("home/index");
    },
    login : (req, res)=>{
        console.log(`GET / 304  "로그인 화면으로 이동"`); //로그인 화면
        res.render("home/login");
    },
    filecivil : (req, res) => { // 민원제기 화면
        console.log(`GET / file civil complaint 304  "민원제기 화면으로 이동"`); 
        res.render("home/filecivil");
    },

    manager : (req, res) => { //관리자 첫 화면
        console.log(`GET / manager 304  "관리자 화면으로 이동"`);
        
        fs.readdir("./src/public/predict/repair",(err,files) =>{
            if(err) throw err;
            files.forEach((item)=>{
                console.log(item);
                res.render("home/manager", {
                    data: item,
                });
            })
        })
    },
    
    detail : (req, res)=>{ // 상세화면
        console.log(`GET / detail 304 "디테일 화면으로 이동"`);
        var query = "SELECT * FROM civil WHERE name = '김정욱'";
        db.query(query, function(err, data){
            if(err) throw err;
            res.render('home/detail', {
                users : data[0],
                title: "상세정보",
            });
        });
    },

    moredetail : (req, res) => { // 더 상세한 화면
        console.log(`GET / moredetial 304 "모어디테일 화면으로 이동"`);
        var query = "SELECT * FROM civil WHERE name = '김정욱'";
        db.query(query, function(err, data){
            if(err) throw err;
            fs.readdir("./src/public/predict/repair",(err,files) =>{
                if(err) throw err;
                files.forEach((item)=>{
                    console.log(item);
                    res.render('home/moredetail', {
                        users : data[0],
                        title: "시설물 AI 판단정보",
                        img: item,
                    });
                })
            })
           
        });
    },

};

// 파이썬 코드가 한번만 돌게 하기 위한 카운트 전역변수
var count = 0;

const process ={
    login: async (req, res) => {

        const user = new User(req.body);
        const response = await user.login();

        const url = {
            method: "POST",
            path: "/login",
            status: response.err ? 400 : 200,
        };
        // log(response,url);
        return res.status(url.status).json(response);
    },
    
    register:  async (req, res) => {
            
            const user = new User(req.body);
            const response = await user.register();
            const url = {
                method: "POST",
                path: "/filecivil",
                status: response.err ? 409 : 201, //새로운 데이터 입력 성공 201
            };

            if (count ==0)
            {
            
            const result = spawn('python', ['print.py']);
            result.stdout.on('data', function(data){
                    console.log(data.toString());
                });
            result.stderr.on('data', function(data){
                console.log(data.toString());
            })

            }

            console.log(count);
            count +=1;

            if(count ==2){
                count =0;
            }
            // log(response, url);
            return res.status(url.status).json(response);
    },

    moredetail: async (req, res) => {

        const user = new User(req.body);
        const response = await user.moredetail();

        const url = {
            method: "POST",
            path: "/moredetail",
            status: response.err ? 400 : 200,
        };
        // log(response,url);
        return res.status(url.status).json(response);
    },


    
};


module.exports ={
    output,
    process,
};


// const log = (response,url) => {
//     if(response.err){
//         // logger.info(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.err}`
//     );
//     }
//     else{
//         logger.info(`${url.method} ${url.path} ${url.status} Response : ${response.success} ${response.msg || ""}`
//     );
//     }
// }