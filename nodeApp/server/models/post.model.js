/*jslint node: true, es6: true,esversion: 6 */

const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    postId: String,
    title: String,
    body: String,
    date: Date,
    userName: String,
    userEmail: String,
    userId: String,
    comments: [{userId: String, userName: String, content: String, date: Date}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);
