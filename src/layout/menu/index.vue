<script setup lang="ts">
import { nextTick } from "vue" 

defineProps(["menuList"])
const $emit = defineEmits(["updateBreadcrumb"]);

import { useRouter, useRoute } from "vue-router"
const $router = useRouter()
let $route = useRoute()

import useUserStore from "@/store/modules/user"
const userStore = useUserStore()

const str = (i) => {
	return i + ""
}


const goRoute = async(vc) => {
	await $router.push(vc.index)
	
	$emit("updateBreadcrumb")
}

/*
const goRoute = (vc) => {
	let res = $router.push(vc.index)

	res.then((data) => {
		$emit("updateBreadcrumb")
	})
}
*/

</script>
<template>
	<template v-for="(item, index) in menuList">
		<template v-if="item.children && item.children.length > 0">
			<el-sub-menu :index="str(item.path)">
				<template #title>
					<el-icon>
						<component :is="item.icon"></component>
					</el-icon>
					{{item.name}}
				</template>
				
				<template v-for="(subItem, subIndex) in item.children">
					<el-menu-item :index="str(subItem.path)" @click="goRoute">
						<el-icon>
							<component :is="subItem.icon"></component>
						</el-icon>
						{{subItem.name}}
					</el-menu-item>
				</template>
			</el-sub-menu>
		</template>

		<template v-else>
			<el-menu-item :index="str(item.path)" @click="goRoute">
				<el-icon>
					<component :is="item.icon"></component>
				</el-icon>
				{{item.name}}
			</el-menu-item>
		</template>
	</template>
</template>
<style scoped lang="scss">
li.el-menu-item [class^=el-icon] {
	margin-right: 5px;
}

.el-menu--collapse>.el-sub-menu>.el-sub-menu__title [class^=el-icon] {
	margin-right: 5px;
}
</style>