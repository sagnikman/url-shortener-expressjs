const express = require("express");
const { WebController } = require("../controllers");
const { UrlService } = require("../services");
const { UrlMiddlewares } = require("../middlewares");
const { body } = require("express-validator");

const router = express.Router();



router.get('/', WebController.getHomePage);

router.post('/', 
    [
        body('longUrl', 'please enter a URL').isURL(),
        body('slug').custom( async value => {
            const isUnique = await UrlService.isShortCodeUnique(value, true);
            if(!isUnique) {
                throw new Error("slug already in use");
            }
        }).isLength({
            min: 0,
            max: 8
        }).withMessage("slug must be 1 to 8 characters long")
    ],
    WebController.saveUrl
);

router.get('/:slug',
UrlMiddlewares.cacheUrl,
WebController.redirectToLongUrl);

module.exports = router;