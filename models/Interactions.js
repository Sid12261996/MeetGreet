const mongoose = require('mongoose');

module.exports = class Interactions {
    constructor(comment, author) {
        this.comments = new Comments(comment, author);
        this.likes = new Likes();
        this.dislikes = new Likes();
    }

};

class Likes {

    constructor() {
        this.count = 0;
        this.actionBy = mongoose.Types.ObjectId();
    }

    liked(likes, actionBy) {
        this.count = likes + 1;
        this.actionBy = actionBy;
    }

}

class Comments {
    constructor(comment, author) {
        this.author = mongoose.Types.ObjectId(author);
        this.comment = comment;
    }
}
