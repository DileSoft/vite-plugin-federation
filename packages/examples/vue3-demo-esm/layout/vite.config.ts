import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@dilesoft/vite-plugin-federation-dynamic'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        // host: "192.168.56.1",
        // port: 5100
    },
    cacheDir: 'node_modules/.cacheDir',
    plugins: [
        vue(),
        federation({
            name: 'layout',
            filename: 'remoteEntry.js',
            remotes: {
                home: {
                    external: `Promise.resolve('http://localhost:5001/assets/remoteEntry.js')`,
                    externalType: "promise"
                },
                'common-lib': {
                    external:`new Promise(resolve=>resolve('http://localhost:5002/assets/remoteEntry.js'))`,
                    externalType:"promise"
                },
                'css-modules': 'http://localhost:5003/assets/remoteEntry.js'
            },
            shared: ['vue', 'vuex']
        })
    ],
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                minifyInternalExports: false
            }
        }
    }
})
