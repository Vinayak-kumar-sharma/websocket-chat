import express from "express" ;
import { Server } from "socket.io";
import { createServer } from "http"
import cors from "cors";

const port = 3000
const app = express()
const server = createServer(app)

const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
    credentials:true

  }
})

app.get('/', function (req, res) {
  res.send('hello world')
})

io.on("connection",(socket) => {
  console.log("USer is connected", socket.id);
  // socket.emit("welcome","welcome to the server");
  socket.on("message",(data)=>{
    console.log(data);
    socket.broadcast.emit("received-message",data);
  })


  socket.on("disconnect",()=>{
    console.log("User Disconnected",socket.id)
  })
})

app.use(cors())



server.listen(port
  ,()=>{
console.log(`Runnging http://localhost:${port}`)
})