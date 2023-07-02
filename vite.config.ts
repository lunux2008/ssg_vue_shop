import { defineConfig, loadEnv } from "vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from "vite-plugin-mock"
import path from "path"


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	let env = loadEnv(mode, process.cwd())

	console.log(env)
	
	return {
	  plugins: [
		vue(),
		createSvgIconsPlugin({
		  iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
		  symbolId: "icon-[dir]-[name]"
		}),
		

		viteMockServe({
			localEnabled: true, // command === "serve",
			watchFile: false
		})


	  ],
	  resolve: {
		alias: {
		  "@": path.resolve("./src")
		}
	  },
	  css: {
		preprocessorOptions: {
		  scss: {
			javascriptEnabled: true,
			additionalData: "@import './src/styles/variable.scss';"
		  }
		}
	  },
	  /*
	  server: {
		  proxy: {
			  "/api": {
				  target: "http://baidu.com",
				  changeOrigin: true,
				  rewrite: path => "/xxx"
			  }
		  }
	  },
	  */
	  
	}
})
