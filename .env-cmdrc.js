module.exports = {
    development: {
        ENV: 'development',
        VUE_APP_OPEN_PROXY: true,
        FLASK_BASE_API: ' http://127.0.0.1:5000/api',
        VUE_APP_LEXICA_API: 'https://lexica.art/api',
        GELBOORU_TOKEN: 'b8d9e7d1fa1dcc3e5116760c093be229',
    },
    release: {
        ENV: 'release',
        VUE_APP_OPEN_PROXY: false,
        FLASK_BASE_API: ' http://127.0.0.1:5000/api',
        VUE_APP_LEXICA_API: 'https://lexica.art/api',
        GELBOORU_TOKEN: 'b8d9e7d1fa1dcc3e5116760c093be229',
    },
};
