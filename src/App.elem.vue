<script setup lang="ts">
import {
	Plus,
	Edit,
	Star,
} from "@element-plus/icons-vue"

import request from "@/utils/request.ts"

// console.log(import.meta.env)

import { reqLogin } from "@/api/user/index"

const login = ()=> {
	reqLogin({username: "admin", password: "123456"})
}

/*
const login = ()=> {
	request({
		url: "/user/login",
		method: "post",
		data: {
			username: "admin1",
			password: "123456"
		}
	}).then(response => {
		console.log(response)
	})
}
*/

/*
import axios from "axios"

axios({
	url: "/api/user/login",
	method: "post",
	data: {
		username: "user1",
		password: "123456"
	}
})
*/
</script>

<template>
  <div>
	<h1>我是APP</h1>
  </div>
  <div>
	<el-button type="primary" :icon="Plus" size="default" @click="login">登陆按钮</el-button>
	<el-button type="primary" :icon="Plus" size="default" @click="">添加按钮</el-button>
	<el-button type="success" :icon="Edit" size="small"  @click="">编辑按钮</el-button>
	<el-button type="danger" :icon="Star" size="large" @click="">删除按钮</el-button>
  </div>
  <hr>
  <div class="demo-pagination-block">
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
  <hr>
  <div>
	<SVG name="phone" color="red" width="64px" height="64px" />
	<SVG name="phone" color="red" width="64px" height="64px" />
  </div>
</template>

<style scoped lang="scss">
div {
	h1 {
		font-size: 32px;
		color: $base-color;
	}
}
</style>
