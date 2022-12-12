const app = require('./app');
const { connectToMongo } = require('./db');
const http = require('http');
const Room = require('./models/Room');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
        credentials: true 
    }
})

io.on('connection', async (socket) => {

    console.log('a user connected');

    socket.on("setup", (userId) => {
        socket.join(userId);
        socket.emit("connected");
    });
    
    socket.on("join room", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("new-message", (newMessage) => {
        let chat = newMessage;
        socket.emit("get-message", chat);
    })

    socket.off("setup", (userId) => {
        console.log("user disconnected");
        socket.leave(userId);
    })
})

server.listen(process.env.PORT, () => {
    console.log('server started at ' + process.env.PORT);
})
connectToMongo();