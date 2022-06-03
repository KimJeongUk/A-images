"use script";

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const number = document.querySelector("#number");
const image = document.querySelector("#image");
const comment = document.querySelector("#comment");
const registerbtn = document.querySelector("#button-blue");



registerbtn.addEventListener("click", register);

function register(){
    if(!name.value){
        return alert("이름을 입력해주십시오");
    }
    if(!image.value)
    {
        return alert("파일을 넣어주십시오");
    }
    if(!number.value)
    {
        return alert("전화번호를 입력해주십시오");
    }
    if(!email.value)
    {
        return alert("이메일을 입력해주십시오");
    }
    if(!comment.value)
    {
        return alert("내용을 입력해주십시오");
    }
    

    const req ={
        name: name.value,
        number: number.value,
        email: email.value,
        comment: comment.value,
        image : image.value,
    };

    
    

    fetch("/filecivil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if(res.success) {
                location.href ="/";
            }
            else {
                if(res.err) return alert(res.err);
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error("민원 제기 중 에러 발생");
        });
}