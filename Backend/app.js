const express = require('express');
const bodyParser =require('body-parser')
var cors = require('cors')
const app = express();

app.use(bodyParser.json())
app.use(cors())
app.post("/posts",(req,res,next)=>{
    const post=req.body
    console.log(post)
    res.status(201).json({
        message:"Post Added successfully"
    })
})
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow_Headers",
    "Origin, X_Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS")
    next();
})
app.use('/posts',(req,res,next)=>{
  const posts=[
  {
    id:"sdgsgsdgsg",
    title:"First Post",
    content:"This is coming from server"
  },
  {
    id:"ffwfqwadawe",
    title:"Second Post",
    content:"This is coming from server"
  }]
  res.status(200).json({
    message:"post fetched Successfully",
    posts:posts
  });

});

module.exports = app;