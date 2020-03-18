const response = require('../utils/http-utils'),
    interactions = require('../models/Interactions'),
    privacy = require('../models/privacy').Posts,
    Posts = require('../models/posts-model'),
    applicationUser = require('../models/userModel'),
    mongoose = require('mongoose');

exports.Create = async (post, userId) => {
    let interaction = new interactions('First', '5dd04caa2387b90c44020caf');
    // console.log(userId);
    let user = await applicationUser.findById(userId, {Name: 1});
    let newPost = new Posts({
        title: post.title,
        imageUrl: post.imageUrl,
        videoUrl: post.videoUrl,
        interactions: {comments: interaction.comments, likes: interaction.likes},
        privacy: privacy,
        author: mongoose.Types.ObjectId(userId),
        authorName: user.Name
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
        let aggregate = [];
        if (userId.toLowerCase() === 'all') {
            aggregate = [{
                $lookup: {
                    from: 'users',
                    let: {authorId: "$author"},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$_id", "$$authorId"]}}},
                        {$project: {Name: 1, LastName: 1, CoverUrl: 1, ImageUrl: 1}}
                    ],
                    as: 'authorInfo'
                }
            }, {
                $unwind: {
                    path: '$authorInfo'
                }
            }]
        } else {
            aggregate = [{
                $lookup: {
                    from: 'users',
                    let: {authorId: "$author"},
                    pipeline: [
                        {$match: {$expr: {$eq: ["$_id", "$$authorId"]}}},
                        {$project: {Name: 1, LastName: 1, CoverUrl: 1, ImageUrl: 1}}
                    ],
                    as: 'authorInfo'
                }
            }, {
                $unwind: {
                    path: '$authorInfo'
                }
            }, {
                $match: {
                    author: mongoose.Types.ObjectId(userId)
                }
            }]
        }
        let allPosts = await Posts.aggregate(aggregate).limit(50);
        // console.log(allPosts);
        allPosts.reverse();
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
