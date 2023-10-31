const urlPostApi = require("../services/save-form-data-service");
const { UrlService } = require("../services");
const { validationResult } = require("express-validator");
const { ServerConfig } = require("../config");

const { createClient } = require("redis");


let client;

async function connectRedis() {
    client = await createClient({
        url: `redis://${ServerConfig.REDIS_USERNAME}:${ServerConfig.REDIS_PASSWORD}@${ServerConfig.REDIS_HOST}:${ServerConfig.REDIS_PORT}`,
        pingInterval: 1000
    })
      .on('error', err => console.log('Redis Client Error', err))
      .connect();
    
    console.log(client.isReady);
}

connectRedis();



async function getHomePage(req, res) {
    const formData = {
        urlInput: "",
        slugInput: "",
        hostName: null,
        slug: null,
        slugError: null
    };
    res.render("home", formData);
}


async function saveUrl(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const formData = {
            urlInput: req.body.longUrl,
            slugInput: req.body.slug,
            hostName: null,
            slug: null,
            slugError: errors.array()[0].msg
        };
        res.render("home", formData);
    }
    else {
        let savedSlug = await urlPostApi.saveUrlFormData(req, res);
        const formData = {
            urlInput: req.body.longUrl,
            slugInput: savedSlug,
            hostName: req.hostname,
            slug: savedSlug,
            slugError: null    
        };
        res.render("home", formData);
    }
}

async function redirectToLongUrl(req, res) {
    const slug = req.params.slug;
    
    try {
        const longUrl = await UrlService.getLongUrl(slug);
        if(!longUrl) {
            res.render("404", {slug: req.params.slug});
        }
        await client.set(slug, longUrl, {
            EX: 86400,
            NX: true,
        });
        res.redirect(longUrl);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
}

module.exports = {
    getHomePage,
    saveUrl,
    redirectToLongUrl
}