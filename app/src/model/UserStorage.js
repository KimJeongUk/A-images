"use strict"

const db = require("../../config/db.js");


class UserStorage {
    // static으로 정적변수로서 다른 파일에서도 접근 가능 #으로 은닉화
    // 데이터를 가공하면 was 
    // 데이터를 있는 그대로 보면 Web Server
    static getUserInfo(id){
        return new Promise((resolve, reject) =>{
            const query = "SELECT * FROM manager WHERE id = ?;";
            db.query(query, [id] , (err, data) =>{
                if(err) reject(`${err}`);
                else resolve(data[0]);
                console.log(data[0]);
            });
        });
   
    }

    static async save(userInfo) {
        return new Promise((resolve, reject) =>{
            const query = "INSERT INTO civil(name,email,number,place,comment,image) VALUES(?,?,?,?,?,?);";
            db.query(query, 
                [userInfo.name, userInfo.email, userInfo.number, 
                    userInfo.place, userInfo.comment,userInfo.image], 
                (err) =>{
                if(err) reject(`${err}`);
                else resolve({ success : true });
            });
        });

    }

    static async save2(userInfo) {
        return new Promise((resolve, reject) =>{
            const query = 'UPDATE civil SET status=? WHERE name = "김정욱"';
            db.query(query, 
                [userInfo.status0], 
                (err) =>{
                if(err) reject(`${err}`);
                else resolve({ success : true });
            });
        });

    }
}

module.exports = UserStorage;