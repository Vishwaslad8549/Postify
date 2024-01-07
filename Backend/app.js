const express = require("express");
const bodyParser = require("body-parser");
const postsRoutes= require("./routes/posts");
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
    "GET, POST, PATCH,PUT,DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts",postsRoutes);
module.exports = app;
