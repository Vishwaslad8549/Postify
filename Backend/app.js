const path = require("path");
const express = require("express");
const functions = require('firebase-functions');
const bodyParser = require("body-parser");
const postsRoutes= require("./routes/posts");
const userRoutes= require("./routes/user");
const app = express();
const mongoose =require("mongoose")


mongoose.connect("mongodb+srv://vishwas:"+process.env.Mongo_DB_PW+"@cluster0.vpma65k.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to Db")
}).catch(()=>{
  console.log("Connection faileddddd")
})

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
const cors =require('cors')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("Backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH,PUT,DELETE, OPTIONS"
  );
  next();
});
app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes)
module.exports = app;
exports.app = functions.https.onRequest(app);