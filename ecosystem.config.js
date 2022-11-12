module.exports = {
    apps: [
        {
            name: 'stable',
            script: 'node .output/server/index.mjs',
            watch: true,
            ignore_watch: [
                // 不用监听的文件
                'node_modules',
                'logs',
                'bin',
                'types',
            ],
            restart_delay: 10,
        },
    ],
    deploy: {
        production: {
            user: 'stable',
            host: 'localhost',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            'pre-deploy-local': '',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
            'pre-setup': '',
        },
    },
};
