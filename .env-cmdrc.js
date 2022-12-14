module.exports = {
    development: {
        ENV: 'development',
        VUE_APP_OPEN_PROXY: false,
        API_DATA_FROM: 'database', // github or database
        IP_ADDRESS: 'http://localhost',
        FLASK_BASE_API: 'http://localhost:5000/api',
        // FLASK_BASE_API: 'https://www.ptg.life/stable/api',
        GELBOORU_TOKEN: 'b8d9e7d1fa1dcc3e5116760c093be229',
    },
    github: {
        ENV: 'github',
        VUE_APP_OPEN_PROXY: false,
        API_DATA_FROM: 'database', // github or database
        IP_ADDRESS: 'https://www.ptg.life',
        FLASK_BASE_API: 'https://www.ptg.life/stable/api',
        GELBOORU_TOKEN: 'b8d9e7d1fa1dcc3e5116760c093be229',
    },
    release: {
        ENV: 'release',
        VUE_APP_OPEN_PROXY: false,
        API_DATA_FROM: 'database', // github or database
        IP_ADDRESS: 'https://www.ptg.life',
        FLASK_BASE_API: 'https://www.ptg.life/stable/api',
        GELBOORU_TOKEN: 'b8d9e7d1fa1dcc3e5116760c093be229',
    },
};
