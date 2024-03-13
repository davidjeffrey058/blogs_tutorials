const { isValidObjectId } = require('mongoose');
const Blog = require('../models/blog');

const all_blogs_api = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.status(200).json(result);
        })
        .catch(() => {
            res.status(500).json({ error: "Unable to fetch data" });
        });
}

const create_post_api = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Unable to add data" });
        });
}

const single_blog_api = (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
        Blog.findById(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: "Unable to fetch data" });
            });
    } else {
        res.status(404).json({ error: 'Invalid object id' })
    }

}

const blog_delete_api = (req, res) => {
    const id = req.params.id;
    if (isValidObjectId(id)) {
        Blog.findByIdAndDelete(id)
            .then((result) => {
                res.status(200).json(result);
            })
            .catch((err) => {
                res.status(500).json({ error: "Unable to delete data" });
            })
    } else {
        res.status(404).json({ error: 'Invalid object id' })
    }

}

module.exports = {
    all_blogs_api: all_blogs_api,
    create_post_api: create_post_api,
    single_blog_api: single_blog_api,
    blog_delete_api: blog_delete_api
}