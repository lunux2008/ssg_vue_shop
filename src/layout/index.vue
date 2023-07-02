<script setup lang="ts">
import Logo from "./logo/index.vue"
import Menu from "./menu/index.vue"
import Main from "./main/index.vue"
import Tabbar from "./tabbar/index.vue"
import { reactive, onMounted } from "vue"
import { useRoute } from "vue-router"
const $route = useRoute()

import useUserStore from "@/store/modules/user"
const userStore = useUserStore()

import useLayoutSettingStore from "@/store/modules/setting"
const layoutSettingStore = useLayoutSettingStore()

const breadcrumb = reactive({items: []})

const makeBreadcrumb = () => {
	const matched = $route.matched
	let result = []
	let root = userStore.menu

	for (let i in matched) {
		let match = matched[i]

		let found = root.find(item => item.path == match.path)
		if (found) {
			if (match.redirect) {
				found.redirect = match.redirect
			}
			
			result.push(found)
			root = found.children
		}
	}
	
	return result
} 

const updateBreadcrumb = () => {
	breadcrumb.items = makeBreadcrumb()
}

updateBreadcrumb()


</script>

<template>
	<div class="layout_container">
		<div class="layout_slider" :class="{fold:layoutSettingStore.fold?true:false}">
			<Logo />
			<el-scrollbar class="scrollbar">
				<el-menu :collapse="layoutSettingStore.fold?true:false" :default-active="$route.path" background-color="#001529" text-color="white">
					<Menu :menuList="userStore.menu" @updateBreadcrumb="updateBreadcrumb"></Menu>
				</el-menu>
			</el-scrollbar>
		</div>
		<div class="layout_tabbar" :class="{fold:layoutSettingStore.fold?true:false}"><Tabbar :breadcrumb="breadcrumb" @updateBreadcrumb="updateBreadcrumb" /></div>
		<div class="layout_main" :class="{fold:layoutSettingStore.fold?true:false}">
			<Main />
		</div>
	</div>
</template>

<style scoped lang="scss">
.layout_container {
	width: 100%;
	height: 100vh;
	
	.layout_slider {
		width: $base-menu-width;
		height: 100vh;
		background: $base-menu-background;
		transition: all 0.3s;
				
		.scrollbar {
			width: calc(100% - 0px);
			height: calc(100vh - $base-menu-logo-height);
			overflow: auto;
		}
		
		&.fold {
			width: $base-menu-min-width;
		}
		
		
	}

	.layout_tabbar {
		width: calc(100% - $base-menu-width);
		height: $base-tabbar-height;
		position: fixed;
		top:0;
		left: $base-menu-width;
		transition: all 0.3s;
		
		&.fold {
			width: calc(100% - $base-menu-min-width);
			left: $base-menu-min-width;
		}
	}
	
	.layout_main {
		width: calc(100% - $base-menu-width);
		height: calc(100vh - $base-tabbar-height);
		background: yellowgreen;
		position: fixed;
		top: $base-tabbar-height;
		left: $base-menu-width;
		padding: 20px;
		overflow: auto;
		transition: all 0.3s;
		
		&.fold {
			width: calc(100% - $base-menu-min-width);
			left: $base-menu-min-width;
		}
	}
}
</style>