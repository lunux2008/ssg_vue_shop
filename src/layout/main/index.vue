<script setup lang="ts">
import { ref, watch, nextTick } from "vue"

import { useRouter, useRoute } from "vue-router"
const $router = useRouter()
const $route = useRoute()

import useLayoutSettingStore from "@/store/modules/setting"
const layoutSettingStore = useLayoutSettingStore()

let flag = ref(true)

watch(() => layoutSettingStore.refresh, () => {
	flag.value = false

	nextTick(() => {
		flag.value = true
	})
})
</script>

<template>
	<router-view v-slot="{ Component }">
		<transition name="fade">
			<component :is="Component" v-if="flag" />
		</transition>
	</router-view>
</template>

<style scoped lang="scss">

.fade-enter-from {
	opacity: 0;
	transform: scale(0.5);
}

.fade-enter-active {
	transition:all .5s;
}

.fade-enter-to {
	opacity: 1;
	transform: scale(1);
}
</style>