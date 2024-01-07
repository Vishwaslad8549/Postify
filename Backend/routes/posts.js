const express = require("express");
const router = express.Router();
const Posts =require('../models/post')

router.post("", (req, res, next) => {
    const post = new Posts({
        title: req.body.title,
        content: req.body.content
    })
    console.log(post);
    post.save().then((createdPost) => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    }).catch((error) => {
        console.log(error)
    })

});
router.put('/:id', (req, res, next) => {
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
router.delete("/:id", (req, res, next) => {
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

module.exports=router;