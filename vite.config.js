import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9090',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

}