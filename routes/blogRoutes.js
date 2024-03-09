const express = require('express');
const blogController = require('../controllers/blogControllers')

const router = express.Router();

router.get('', blogController.blog_index);
router.post('', blogController.create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;