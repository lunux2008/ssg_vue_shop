import axios from "axios"
import { ElMessage } from "element-plus"

import useUserStore from "@/store/modules/user"


const request = axios.create({
	baseURL: "/api",//import.meta.env.VITE_SERVER + import.meta.env.VITE_APP_BASE_API,
	timeout: 5000,
})

request.interceptors.request.use((config) => {
	let userStore = useUserStore()
	
	if (userStore.token) {
		config.headers.token = userStore.token
	}
	
	return config
})

request.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		/*
		let message = "";
		
		const status = error.response.status
		
		switch (status) {
			case 401:
				message = "TOKEN过期"
				break
			case 403:
				message = "无权访问"
				break
			case 404:
				message = "请求地址错误"
				break
			case 500:
				message = "服务器内部错误"
				break
			default:
				message = "网络异常"
				break
		}
		*/
		
		/*
		ElMessage({
			type: "error",
			message
		})
		*/
		
		return Promise.reject(error)
	},
)

export default request