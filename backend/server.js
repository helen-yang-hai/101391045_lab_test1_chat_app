const express = require('express')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const cors = require('cors');

const chatRoomRouter = require("./routes/ChatRoomRoutes")

const app = express()

// db connection str
const DB_URL = "mongodb+srv://rootadmin:qwer1234@cluster0.mn0pq2e.mongodb.net/comp3133_lab_test1?retryWrites=true&w=majority"
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const SERVER_PORT = process.env.PORT || 8081;


const corsOptions ={
    origin:'http://localhost:3000', 
    methods: ['GET', 'POST'],
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(chatRoomRouter);


//connect to db
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Start server
const server = app.listen(SERVER_PORT, ()=> {
    console.log(`Server started at port http://localhost:${SERVER_PORT}`)
})

const serverIO = socketIO(server);
serverIO.on('connection', (socket)=>{
    socket.on('join_room', (room)=> {
        socket.join(room);
        console.log(`Joined room ${room}`)
    })

    socket.on('chat', (data)=> {
        socket.emit('chat', data)
    })
    
    socket.on('group_chat', (data)=> {
        serverIO.to(data.room).emit('new_group_message', data)
        console.log(data)
    })

    socket.on('leave_room', (room)=> {
        socket.leave(room)
    })
})




