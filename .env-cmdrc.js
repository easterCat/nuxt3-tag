module.exports = {
    development: {
        ENV: 'development',
        VUE_APP_OPEN_PROXY: true,
        FLASK_BASE_API: 'http://localhost:5000/stable/api',
        GELBOORU_TOKEN: 'b8d9e7d1fa1dcc3e5116760c093be229',
    },
    release: {
        ENV: 'release',
        VUE_APP_OPEN_PROXY: false,
        FLASK_BASE_API: 'http://www.ptg.life/stable/api',
        GELBOORU_TOKEN: 'b8d9e7d1fa1dcc3e5116760c093be229',
    },
};
