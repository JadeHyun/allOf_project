"use strict"

const socket = io();
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting_list");
const chatInput = document.querySelector(".chatting_input");
const sendButton = document.querySelector(".send_button")

sendButton.addEventListener("click", ()=>{
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)

})


socket.on("chatting", (data)=>{
    const li = document.createElement("li")
    li.innerHTML = `${data.name}님이  - ${data.msg}`;
    chatList.appendChild(li)
})

console.log(socket)