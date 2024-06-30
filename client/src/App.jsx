import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";


const App = () => {

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [ message , setMessage ] = useState("");

  useEffect(()=>{

    socket.on("connect",()=>{
      console.log("connected",socket.id);
    });

    socket.on("message",(data)=>{
      console.log(data)
    })

    socket.on("welcome",(s)=>{
      console.log(s)
    })
    
    return ()=>{
      socket.disconnect();  
    }
    
  }, [])

  const handlerSubmit = (e)=>{
    e.preventDefault();
    socket.emit("message",message);
    setMessage("");
  }


  

  return <Container maxWidth="sm">

    <Typography variant="h1" component="div" gutterBottom>
      Welcome
    </Typography>

    <form onSubmit={handlerSubmit}>
      <TextField value={message} onChange={(e)=>setMessage(e.target.value)} 
      id="outlined-basic" label="outlined" variant="outlined" />

      <Button type="submit" variant="contained" color="primary">
        send
      </Button>

    </form>
    </Container>
  
};
export default App