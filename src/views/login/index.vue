<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue"
import { ref, reactive } from "vue"
import { useRouter, useRoute } from "vue-router"
import { ElNotification, FormRules } from "element-plus"
import { getTime } from "@/utils/time"

import useUserStore from "@/store/modules/user"
let userStore = useUserStore()

let $router = useRouter()
let $route = useRoute()

let loading = ref(false)

let loginForm = reactive({username: "admin", password: "123456"})

let forms = ref()


const login = async ()=> {
	loading.value = true

	await forms.value.validate()
	
	try {
		await userStore.userLogin(loginForm)
		
		let redirect = $route.query.redirect
		$router.push({path: redirect || "/"})
		
		
		ElNotification({
			type: "success",
			message: "欢迎回来",
			title: getTime() + "好"
		})

		loading.value = false
	} catch (error) {
		ElNotification({
			type: "error",
			message: (error as Error).message
		})

		loading.value = false
	}
}

const validatorUsername = (rule:any, value:any, callback: any)=> {
	if (value.length >=5 && value.length <= 10) {
		callback()
	} else {
		callback(new Error("长度错误"))
	}
}

const validatorPassword = (rule:any, value:any, callback: any)=> {
	if (value.length >=6 && value.length <= 15) {
		callback()
	} else {
		callback(new Error("长度错误"))
	}
}

const rules = reactive<FormRules>({
	username: [
		/*
		{
			required: true, 
			message: "用户名不能为空",
			trigger: "blur"
		},
		*/
		{
		  // required: true, min: 6, max: 10, 
		  validator: validatorUsername,
		  message: "长度5-10", trigger: "change"
		}
	],
	password: [
		{
		  // required: true, min: 6, max: 15, 
		  validator: validatorPassword,
		  message: "长度6-15", trigger: "change"
		}
	]
})

	

</script>

<template>
	<div class="login_container">
		<el-row>
			<el-col :span="12" :xs="0"></el-col>
			<el-col :span="12" :xs="24">
				<el-form class="login_form" ref="forms" :model="loginForm" :rules="rules">
					<h1>Hello</h1>
					<h2>环形使者学前端</h2>
					<el-form-item prop="username">
						<el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
					</el-form-item>
					<el-form-item>
						<el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登陆</el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped lang="scss">
.login_container {
	width:100%;
	height:100vh;
	background:url("@/assets/images/bg.jpeg") no-repeat;
	background-size: cover;
}

.login_form {
	position:relative;
	width:80%;
	top:30vh;
	background: rgba(165, 42, 42, 0.3);
	padding:40px;
	
	h1 {
		color: white;
		font-size: 40px;
		margin-bottom: 10px;
	}
	h2 {
		color: white;
		font-size: 20px;
		margin-bottom: 10px;
	}
	.login_btn {
		width:100%;
	}
}
</style>