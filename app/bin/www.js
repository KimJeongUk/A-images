"use strict";
const app = require("../app");

//포트번호
const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log(`${PORT} 포트에서 서버가 가동되었습니다`);
});

// npm init : package.json 생성 