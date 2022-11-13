const router = require("express").Router();
const Post = require("../models/Post")

//create a new post
router.post("/",async(req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err)
    }
});

//update post
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.updateOne({$set:req.body});
            res.status(200).json("your post has been updated")
        } else {
            res.status(403).json("Oops! wrong id")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId) {
            await post.deleteOne({$set:req.body});
            res.status(200).json("your post has been deleted")
        } else {
            res.status(403).json("Oops! wrong id")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// like/dislike a post
router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push:{likes : req.body.userId}})
            res.status(200).json("liked post")
        } else {
            await post.updateOne({$pull : {likes : req.body.userId}})
            res.status(200).json("unliked post")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get post
router.get(":/id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline (get all posts)

module.exports = router;