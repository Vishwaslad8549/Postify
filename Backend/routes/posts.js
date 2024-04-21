const express = require("express");
const router = express.Router();
const Posts = require('../models/post')
const checkAuth = require("../middleware/check-auth")
const multer = require("multer");

const MIME_TYPE_Map = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_Map[file.mimetype]
        let error = new Error("Invalid Mime Type");
        if (isValid) {
            error = null
            }
        cb(error,"Backend/images")
        
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(" ").join("-")
        console.log(name);
        const ext = MIME_TYPE_Map[file.mimetype]
        cb(null, name + "."+ext)
    }
})

router.post("", checkAuth,multer({storage:storage}).single("image"),(req, res, next) => {
    const url = req.protocol+ "://" + req.get("host");
    const post = new Posts({
        title: req.body.title,
        content: req.body.content,
        imagePath: url+"/images/"+ req.file.filename
        
    })
    console.log(post);
    post.save().then((createdPost) => {
        res.status(201).json({
            message: 'Post added successfully',
            post:{
                ...createdPost,
                id:createdPost._id,
                // title:createdPost.title,
                // content:createdPost.content,
                // imagePath:createdPost.imagePath
            }
        });
    }).catch((error) => {
        console.log(error)
    })

});



router.put('/:id',checkAuth, (req, res, next) => {
    const post = new Posts({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    console.log(post);
    Posts.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: "Updated successfully" })
    })
})
router.delete("/:id", checkAuth,(req, res, next) => {
    Posts.deleteOne({ _id: req.params.id }).then((result) => {
        console.log(result)
    })
    res.status(200).json("Post with id" + req.params.id + " deleted");
})

router.get("", (req, res, next) => {
    Posts.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
    });
});

router.get("/:id", (req, res, next) => {
    Posts.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

module.exports = router;