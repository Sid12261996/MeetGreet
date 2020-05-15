const mongo = require('mongoose'),
    schema = mongo.Schema,
    entity = require('../models/base-entity').Entity,
    interactions = require('./Interactions')
;


const posts = new schema({
    baseEntity: entity,
    title: {type: String, required: true, default: 'No Title'},
    imageUrl: {type: String, required: true, default: 'default'},
    videoUrl: String,
    author: schema.Types.ObjectId,
    authorName: {type: String, required: true},
    privacy: {
        restrictedUsers: [schema.Types.ObjectId],
        CannotComment: Boolean
    },
    interactions: {
        comments: [{author: schema.Types.ObjectId, comment: String}],
        likes: {count: Number, actionBy: [schema.Types.ObjectId]},
        dislikes:{count: Number,actionBy:[schema.Types.ObjectId]}
    }
});

posts.virtual('initial').get(function () {
    let newPost = this;
    const interaction = new interactions('First', 'Sid');
    // console.log(interaction)
    // newPost.interactions.likes = interaction.likes;
    // newPost.interactions.comments.push(interaction.comment);
    newPost.interactions = {likes: interaction.likes, comments: interaction.comments};
    console.log(newPost);
    return newPost;

});
module.exports = mongo.model('posts', posts);
