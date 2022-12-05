// https://pm2.fenxianglu.cn/docs/general/configuration-file/
module.exports = {
    apps: [
        {
            name: 'nuxt3-tag',
            script: '.output/server/index.mjs',
            instances: '1',
            exec_mode: 'cluster',
            watch: true,
            ignore_watch: ['node_modules', 'logs', 'bin', 'types'],
            restart_delay: 10000,
        },
    ],
};
