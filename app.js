const express = require('express')
const path = require('path')
const { Socket } = require('socket.io')
const app = express()
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => console.log(`Chat server on this port ${PORT}`))
const io = require('socket.io')(server)


app.use(express.static(path.join(__dirname, 'public')));

let socketconnected = new Set();
http://localhost:4000/
io.on('connection', onConnected)

function onConnected(socket){
    console.log(socket.id)
    socketconnected.add(socket.id)

    io.emit('clients-total', socketconnected.size)

    socket.on('disconnect', () =>{
        console.log('Socket Disconnected',socket.id)
        socketconnected.delete(socket.id)
        io.emit('clients-total', socketconnected.size)
    })

    socket.on('message', (data)=>{
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })

    socket.on('feedback', (data) =>{
        socket.broadcast.emit('feedback', data)
    })
}





