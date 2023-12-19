const express = require('express');
const path =  require('path');
const http = require('http');
const socketio = require('socket.io');




const app = express();
const server = http.createServer(app);
const io = socketio(server);



// Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Run when the client connects:
io.on('connection',(socket)=>{
    console.log('New websockets connection');

    socket.emit('message','Welcome to ChatCord');

    // Broadcast when a user connects:
    socket.broadcast.emit('message','A user has joined the chat!');

    // Runs when Client disconnects

    socket.on('disconnect',()=>{
        io.emit('message', 'A user has left the Chat');
    })

    // Listen for Chat message;
    socket.on('chatMessage',(msg)=>{
        console.log(msg);
        io.emit('message',msg)
    })




})






const PORT = 3000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})