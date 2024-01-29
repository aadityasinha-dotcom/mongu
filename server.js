const express = require('express')
const app = express()


// routes

app.get('/', (req, res) => {
  res.send("Hello node")
})

app.listen(3000, ()=>{
  console.log("running")
})
