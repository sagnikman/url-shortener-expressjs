const CrudRepository = require("./crud-repository");
const { Url } = require("../models");


class UrlRepository extends CrudRepository {
    constructor() {
        super(Url);
    }

    async isShortCodeUnique(shortCode) {
        const shortCodeData = {
            shortCode: shortCode
        };
        const response = await Url.findOne({ where: shortCodeData});
        if(response == null) {
            return true;
        }
        else return false;
    }

    async getLongUrl(shortCode) {
        const shortCodeData = {
            shortCode: shortCode
        };
        const response = await Url.findOne({ where: shortCodeData});
        if(response == null) {
            return null;
        }
        else return response.longUrl;
    }
}

module.exports = UrlRepository;