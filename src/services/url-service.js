const { UrlRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const base62Conversion = require("./base62-conversion-service");
const AppError = require("../utils/errors/app-error");


const urlRepository = new UrlRepository();

async function createUrl(data) {
    try {
        const url = await urlRepository.create(data);
        return url;
    } catch (error) {
        console.log(error);
        if(error.name == "SequelizeValidationError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
        }
        else if(error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("Cannot create a new url", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getUrls() {
    try {
        const url = await urlRepository.getAll();
        return url;
    } catch (error) {
        Logger.error("Something went wrong in Url Service: getUrls");
        throw error;
    }
}

async function getUrl(id) {
    try {
        const url = await urlRepository.get(id);
        return url;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The url you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot fetch data of the url", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateUrl(id, data) {
    try {
        const url = await urlRepository.update(id, data);
        return url;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The url you requested is not present", error.statusCode);
        }
        throw new AppError("Cannot update url", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyUrl(id) {
    try {
        const url = await urlRepository.destroy(id);
        return url;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError("The url you requested to delete is not present", error.statusCode);
        }
        throw new AppError("Cannot delete url", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isShortCodeUnique(shortCode, isBase62 = false) {
    if(isBase62) {
        shortCode = await base62Conversion.base62ToInteger(shortCode);
    }
    const url = await urlRepository.isShortCodeUnique(shortCode);
    return url;
}

async function getLongUrl(stringShortCode) {
    const shortCode = await base62Conversion.base62ToInteger(stringShortCode);
    const longUrl = await urlRepository.getLongUrl(shortCode);
    return longUrl;
}

module.exports = {
    createUrl,
    getUrls,
    getUrl,
    updateUrl,
    destroyUrl,
    isShortCodeUnique,
    getLongUrl
}