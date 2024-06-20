const express = require("express");
const { addBlog, getBlogs, deleteBlog, updateBlog } = require("../controller/blogController");
const router = express.Router();

router.route("/add_blog").post(addBlog);
router.route("/get_blog").get(getBlogs);
router.route("/delete_blog").post(deleteBlog);
router.route("/update_blog").post(updateBlog);

module.exports = router