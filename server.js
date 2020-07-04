let express = require('express');
let app = express();
let server = require('http').Server(app);
let port = 9091;
const io = require('socket.io')(server);

app.get('/',(req,res,next) => {
    res.sendFile(__dirname+'/public/index.html')
});

app.get('/javascript',(req,res,next) => {
    res.sendFile(__dirname+'/public/javascript.html')
});

app.get('/elk',(req,res,next) => {
    res.sendFile(__dirname+'/public/elk.html')
});

app.get('/css',(req,res,next) => {
    res.sendFile(__dirname+'/public/css.html')
});

server.listen(process.env.PORT || 9091, () => {
    console.log(`Server running on ${port}`);
})

let tech = io.of('/tech');

tech.on('connection',(socket) => {
    console.log("connetion is being tried------------------------>")
    socket.on('join',(data)=> {
        console.log("data while connection------------------->",data);
        socket.join(data.room);
        socket.emit('message',`Welcome to ${data.room} room`)
        //tech.in(data.room).emit('message',`new user joined the ${data.room} room `)
    })
    socket.on('in_message', (data) => {
        console.log("Message from client=>",data);
        tech.in(data.room).emit('message',data.msg);
    });

    socket.on('disconnect', ()=> {
        tech.emit('message', "user disconnected");
    })
})