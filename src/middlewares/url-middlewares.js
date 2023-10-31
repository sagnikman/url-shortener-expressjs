const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const base62Conversion = require("../services/base62-conversion-service");
const { UrlService } = require("../services");
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


function validateCreateRequest(req, res, next) {
    if(typeof(req.body.shortCode) == 'undefined') {
        ErrorResponse.message = "Something went wrong while creating a url";
        ErrorResponse.error = new AppError(
                                ["shortCode not found in the correct form in the request body"],
                                StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

// Convert short code(slug) into integer, Example: 'abc123' -> 33536566819
async function convertShortCodeToInteger(req, res, next) {
    if(req.body.shortCode == null || req.body.shortCode == '') {
        let randomStringShortCode = '', randomIntShortCode = '';
            do {
                const generatedShortCode = await base62Conversion.generateRandomShortCode();
                randomStringShortCode = generatedShortCode.stringShortCode;
                randomIntShortCode = generatedShortCode.intShortCode;
            } while(!UrlService.isShortCodeUnique(randomIntShortCode));
            req.body.slug = randomStringShortCode
    }
    req.body.shortCode = await base62Conversion.base62ToInteger(req.body.slug);
    next();
}

async function cacheUrl(req, res, next) {
    const slug = req.params.slug;
    try {
        const cacheLongUrl = await client.get(slug);
        if (cacheLongUrl) {
            res.redirect(cacheLongUrl);
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(404);
    }
}


module.exports = {
    validateCreateRequest,
    convertShortCodeToInteger,
    cacheUrl
}