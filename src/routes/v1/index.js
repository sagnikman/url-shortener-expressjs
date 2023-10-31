const express = require('express');

const { InfoController } = require('../../controllers');

const urlRoutes = require("./url-routes");

const router = express.Router();

router.use("/urls", urlRoutes);

router.get('/info', InfoController.info);

module.exports = router;