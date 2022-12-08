// https://pm2.fenxianglu.cn/docs/general/configuration-file/
module.exports = {
    apps: [
        {
            name: 'nuxt3-tag',
            script: 'node .output/server/index.mjs',
            exec_mode: 'cluster',
            instances: '1',
            max_memory_restart: 8,
            watch: true,
            ignore_watch: ['node_modules', 'logs', 'bin', 'types'],
            restart_delay: 20,
        },
    ],
};
