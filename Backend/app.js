const express = require("express");
const bodyParser = require("body-parser");
const Posts =require('./models/post')
const app = express();
const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://vishwas:YBh1JlMEP7rzuVjH@cluster0.vpma65k.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to Db")
}).catch(()=>{
  console.log("Connection failed")
})
const cors =require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.post("/api/posts", (req, res, next) => {
  const post = new Posts({
    title: req.body.title,
    content: req.body.content
  })
  console.log(post);
  post.save().then((createdPost)=>{
      res.status(201).json({
      message: 'Post added successfully',
      postId:createdPost._id
    });
  }).catch((error)=>{
    console.log(error)
  })
  
});

// app.get("/api/posts", (req, res, next) => {
//   Posts.find().
//   then(documents=>{
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   })
  
// });

app.get("/api/posts", (req, res, next) => {
  Posts.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});
app.delete("/api/posts/:id",(req,res,next)=>{
  Posts.deleteOne({_id:req.params.id}).then((result)=>{
    console.log(result)
  })
  res.status(200).json("Post with id"+req.params.id+" deleted");
})

module.exports = app;
