const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    },
    public_id: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
    }
});


const Blog = new mongoose.model("BLOG", blogSchema);
module.exports = Blog;