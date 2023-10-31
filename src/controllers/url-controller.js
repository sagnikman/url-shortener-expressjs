const { UrlService } = require("../services");
const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createUrl(req, res) {
    try {
        const url = await UrlService.createUrl({
            shortCode: req.body.shortCode,
            slug: req.body.slug,
            longUrl: req.body.longUrl
        });
        SuccessResponse.data = url;
        SuccessResponse.message = "Successfully created a url";
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getUrls(req, res) {
    try {
        const url = await UrlService.getUrls();
        return res
                .status(StatusCodes.OK)
                .json({
                    success: true,
                    message: "Successfully got all urls",
                    data: url,
                    error: {}     
                });
    } catch (error) {
        res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                success: false,
                message: "Something went wrong while getting all urls",
                data: {},
                error: error    
            });
    }
}

async function getUrl(req, res) {
    try {
        const url = await UrlService.getUrl(req.params.id);
        SuccessResponse.data = url;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while getting a url";
        ErrorResponse.error = error;
        res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function updateUrl(req, res) {
    try {
        const url = await UrlService.updateUrl(req.params.id, {
            shortCode: req.body.shortCode,
            longUrl: req.body.longUrl
        });
        SuccessResponse.data = url;
        SuccessResponse.message = "Successfully updated the url"
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while updating a url";
        ErrorResponse.error = error;
        res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function destroyUrl(req, res) {
    try {
        const url = await UrlService.destroyUrl(req.params.id);
        SuccessResponse.data = url;
        SuccessResponse.message = "Successfully deleted the url"
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while deleting a url";
        ErrorResponse.error = error;
        res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}


module.exports = {
    createUrl,
    getUrls,
    getUrl,
    updateUrl,
    destroyUrl
}