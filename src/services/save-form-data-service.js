const axios = require('axios');
const { ServerConfig } = require('../config')

async function saveUrlFormData(req, res) {
    
    let data = JSON.stringify({
        shortCode: req.body.slug,
        slug: req.body.slug,
        longUrl: req.body.longUrl
    });
    
    let url = ''
    if(ServerConfig.APP_ENV == 'development') {
        url = req.protocol + '://' + req.hostname + ':' + ServerConfig.PORT + '/api/v1/urls';
    }
    else {
        url = req.protocol + '://' + req.hostname + '/api/v1/urls';
    }
    let config = {
    method: 'post',
    url: url,
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };
    let savedSlug;
    await axios.request(config)
    .then((response) => {
    savedSlug = response.data.data.slug;
    })
    .catch((error) => {
    console.log(config);
    console.log(error.message);
    });
    return savedSlug;
}    
    
module.exports = { 
	saveUrlFormData
};