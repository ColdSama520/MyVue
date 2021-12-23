import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    proxy: {
        '/api': {
            target: 'http://localhost:9090',//对应自己的接口
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': '/'
            }
        }
    }

}