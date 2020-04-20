const response = require('../utils/http-utils'),
    interactions = require('../models/Interactions'),
    privacy = require('../models/privacy').Posts,
    Posts = require('../models/posts-model'),
    applicationUser = require('../models/userModel'),
    baseEntity = require('../models/base-entity'),
    moment = require('moment'),
    mongoose = require('mongoose');


function createSinglePostEntity(user,post){
    let interaction = new interactions('First', user._id);
    // console.log(userId);
    return new Posts({
        baseEntity: {CreatedAt: moment.utc().toDate(), UpdatedAt: moment.utc().toDate(), DeletedAt: null},
        title: post.title,
        imageUrl: post.imageUrl,
        videoUrl: post.videoUrl,
        interactions: {comments: interaction.comments, likes: interaction.likes},
        privacy: privacy,
        author: mongoose.Types.ObjectId(user._id),
        authorName: user.Name
    });
}

exports.Create = async (post, userId) => {

    let user = await applicationUser.findById(userId, {Name: 1});
    const newPost = createSinglePostEntity(user,post)
    try {
        let saved = await newPost.save();
        // console.log(saved, 'saved');
        return response.Ok(saved);
    } catch (e) {
        console.log(e);
        return response.BadRequest(e);
    }

};
exports.BulkPostCreate = async function(bulkPosts,userId){

    let user = await applicationUser.findById(userId, {Name: 1});
    let newPosts = []
    bulkPosts.Images.forEach(image=>{
        newPosts.push(createSinglePostEntity(user,{title:bulkPosts.name,imageUrl:image}))
    })
}

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

