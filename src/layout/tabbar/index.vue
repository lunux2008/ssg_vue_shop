<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
const $router = useRouter()
const $route = useRoute()

import useUserStore from "@/store/modules/user"
const userStore = useUserStore()

import useLayoutSettingStore from "@/store/modules/setting"
const layoutSettingStore = useLayoutSettingStore()

const changeIcon = ()=> {
	layoutSettingStore.fold = !layoutSettingStore.fold
}

const refresh = ()=> {
	layoutSettingStore.refresh = !layoutSettingStore.refresh
}

const fullScreen = ()=> {
	let full = document.fullscreenElement
	if (!full) {
		document.documentElement.requestFullscreen()
	} else {
		document.exitFullscreen()
	}
}

defineProps(["breadcrumb"])

const $emit = defineEmits(["updateBreadcrumb"]);

const redirect = ()=> {
	$emit("updateBreadcrumb")
}

const logout = ()=> {
	console.log("logout")
	
	userStore.userLogout()
	
	$router.push({ path: "/login", query: {redirect: $route.path} })
	
	
}

</script>

<template>
	<div class="tabbar">
		<div class="tabbar_left">
			<el-icon class="icon" @click="changeIcon">
				<!-- ElIconExpand /-->
				<component :is="layoutSettingStore.fold?'ElIconFold':'ElIconExpand'">
				</component>
			</el-icon>
			<el-breadcrumb separator="/">
				<template v-for="(item,index) in breadcrumb.items">
					<template v-if="item.redirect">
						<el-breadcrumb-item :index="index" :to="item.redirect" @click="redirect">{{item.name}}</el-breadcrumb-item>
					</template>
					<template v-else>
						<el-breadcrumb-item :index="index">{{item.name}}</el-breadcrumb-item>
					</template>
				</template>
			</el-breadcrumb>
		</div>
		<div class="tabbar_right">
			<el-button  size="small" icon="ElIconRefresh" circle @click="refresh"></el-button>
			<el-button  size="small" icon="ElIconFullScreen" circle @click="fullScreen"></el-button>
			<el-button  size="small" icon="ElIconSetting" circle></el-button>
			
			<img src="@/assets/images/logo.jpeg" alt="" style="width:28px;height:28px;margin:0 10px 0 10px;" />

			<el-dropdown>
				<span class="el-dropdown-link">
				{{userStore.username}}
				  <el-icon class="el-icon--right">
					<ElIconArrowDown />
				  </el-icon>
				</span>
				<template #dropdown>
				  <el-dropdown-menu>
					<el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
				  </el-dropdown-menu>
				</template>
			  </el-dropdown>
		</div>
	</div>
</template>

<style scoped lang="scss">
.tabbar {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	padding:0 20px 0 20px;
	background-image: linear-gradient(to right, white, rgb(200, 200, 170), white);
	
	.tabbar_left {
		display: flex;
		align-items: center;
		
		.icon {
			margin-right: 10px;
		}
	}
	
	.tabbar_right {
		display: flex;
		align-items: center;
	}
}
</style>