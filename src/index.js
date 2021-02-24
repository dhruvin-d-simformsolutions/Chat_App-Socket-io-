const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000   
const publicDirectoryPath = path.join(__dirname,"../public")


app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log("New Webscoket connection");
    
    socket.emit('message', "Welcome To Server")    
    
    socket.on('sendMessage', (message) =>{
        io.emit('message',message)
    })
})

server.listen(port,()=>{
    console.log("Server is running on port ",port);
})