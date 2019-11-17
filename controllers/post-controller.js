const response = require('../utils/http-utils'),
    interactions = require('../models/Interactions'),
    privacy = require('../models/privacy').Posts,
    Posts = require('../models/posts-model'),
    mongoose = require('mongoose');

exports.Create = async (post, userId) => {
    let interaction = new interactions('First', '5dd04caa2387b90c44020caf');
    // console.log(userId);
    let errorMessage = {};
    let newPost = new Posts({
        title: post.title,
        imageUrl: post.imageUrl,
        videoUrl: post.videoUrl,
        interactions: {comments: interaction.comments, likes: interaction.likes},
        privacy: privacy,
        author: mongoose.Types.ObjectId(userId),
    });
    // let newPost =  posts.initial;
    try {
        let saved = await newPost.save();
        // console.log(saved, 'saved');
        return response.Ok(saved);
    } catch (e) {
        return response.BadRequest(e);
    }

};

exports.getAll = async (userId) => {
    try {
        // let allPosts = await Posts.find({'privacy.restrictedUsers': {$nin: mongoose.Types.ObjectId(userId)}});
        let allPosts = await Posts.find({}).limit(20);
        // console.log(allPosts);
        return response.Ok(allPosts);
    } catch (e) {
        return response.BadRequest(e);
    }
};

exports.get = async (id, userId) => {
    try {
        // let allPosts = await Posts.find({'privacy.restrictedUsers': {$nin: mongoose.Types.ObjectId(userId)}});
        let allPosts = await Posts.find({_id: id});
        // console.log(allPosts);
        return response.Ok(allPosts);
    } catch (e) {
        return response.BadRequest(e);
    }
};
