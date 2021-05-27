const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./server/config/mongoose.config");
require("./server/routes/deck.routes")(app);

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = require("socket.io")(server, {cors: true});

io.on("connection", socket => {
    console.log(socket.id);
    socket.on('joinChat', input => {
        console.log(input);
        socket.join(input.roomId);
        console.log(`Welcome to the study chat for ${input.roomName}`);
    });
    socket.on('leaveChat', input => {
        socket.leave(input.roomId);
        console.log(`You have left the study chat for ${input.roomName}`);
    })
    socket.on('chatMessage', input => {
        console.log("In the Chat emit on the server");
        io.to(input.roomId).emit('chat', input)});
})