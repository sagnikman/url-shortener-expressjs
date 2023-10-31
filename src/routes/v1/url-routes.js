const express = require("express");

const { UrlController } = require("../../controllers");
const { UrlMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post("/", 
            UrlMiddlewares.validateCreateRequest,
            UrlMiddlewares.convertShortCodeToInteger, 
            UrlController.createUrl);


router.get("/", UrlController.getUrls);


router.get("/:id", UrlController.getUrl);


router.put("/:id", UrlController.updateUrl);


router.delete("/:id", UrlController.destroyUrl);

module.exports = router;