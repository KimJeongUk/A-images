"use strict"

const button = document.querySelector("#button");
var elements = document.getElementsByName("status");

button.addEventListener("click",moredetail);

function moredetail(){
    var s=0;
    var status;

    var count = elements.length;

    
    for (var i =0; i < count; i++)
    {
        if(elements[i].checked === true)
        {
            s = i;
        }

    }

    if(s===0){
        status ="처리 전";
    }
    else if(s ===1)
    {
        status = "처리 중"
    }
    else if(s ===2)
    {
        status = "처리 완료"
    }
    else if(s ===3)
    {
        status = "반려"
    }

    console.log(status);
        
    const req = {
        status0: status,
    }

    fetch("/moredetail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json()) // response 스트림을 가져와 완료될때까지 읽어서 반환값이 promise
        .then((res) => {
            if(res.success) {
                location.href ="/detail";
            }
            else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("에러 발생");
        });
}