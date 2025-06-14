// const express = require('express')

const socket = io()

const clientsTotal = document.getElementById('clients-total')
const messagecontainer = document.getElementById('message-container')
const nameinput = document.getElementById('name-input')
const messageform = document.getElementById('messageform')
const messageinput = document.getElementById('message-input')

messageform.addEventListener('submit', (e) => {
    e.preventDefault()
    sendmessage()
})
 

socket.on('clients-total', (data) => {
    clientsTotal.innerText = `Total Clients : ${data}`
})

function sendmessage() {
    if(messageinput.value == '') return
    console.log(messageinput.value)
    const data = {
        name : nameinput.value,
        message : messageinput.value,
        dateTime : new Date()
    }

    socket.emit('message', data)
    addmessageToUI(true, data)
    messageinput.value = ''


}

socket.on('chat-message', (data)=>{
    // console.log(data) 
    addmessageToUI(false, data)
})

function addmessageToUI(isownmessage, data){
    clearfeedbackmessages()

    const element  = `
    <li class="${isownmessage ? "message-right" : "message-left"}">
        <p class="message">
            ${data.message}
            <span>${data.name}... ${moment(data.dateTime).fromNow()}

            </span>

        </p>

    </li>`

    messagecontainer.innerHTML += element

    scrolltoBottom()
}

function scrolltoBottom(){
    messagecontainer.scrollTo(0, messagecontainer.scrollHeight)
}

messageinput.addEventListener('focus', (e) =>{ 

    socket.emit('feedback', {
        feedback : `${nameinput.value} is typing a message`,
    })

})

messageinput.addEventListener('keypress', (e) =>{

    socket.emit('feedback', {
        feedback : `${nameinput.value} is typing a message`,
    })

})

messageinput.addEventListener('blur', (e) =>{

    socket.emit('feedback', {
        feedback : '',
    })

})

socket.on('feedback', (data)=>{
    clearfeedbackmessages()

    const element = `
            <li class="message-feedback">
                <p class="feedback" id="feedback">
                    ${data.feedback}
                </p>
            </li>
    `
    messagecontainer.innerHTML += element

})

function clearfeedbackmessages(){
    document.querySelectorAll('li.message-feedback').forEach(element =>{
        element.parentNode.removeChild(element)
    })
}
