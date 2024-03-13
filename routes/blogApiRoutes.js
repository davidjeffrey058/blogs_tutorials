const express = require('express');
const blogApiController = require('../controllers/blogApiControllers')

const apiRouter = express.Router();

apiRouter.get('', blogApiController.all_blogs_api);
apiRouter.post('', blogApiController.create_post_api);
apiRouter.get('/:id', blogApiController.single_blog_api);
apiRouter.delete('/:id', blogApiController.blog_delete_api);

module.exports = apiRouter;