<script setup lang="ts">
import setting from "@/setting"
</script>

<template>
	<div class="logo" v-if="setting.logoShow">
		<img src="@/assets/images/logo.jpeg" alt="" />
		<p>{{setting.title}}</p>
	</div>
</template>

<style scoped lang="scss">
.logo {
	width: 100%;
	height: $base-menu-logo-height;
	display: flex;
	align-items: center;
	padding: 10px;
	
	
	img {
		width: 40px;
		height: 40px;
	}
	
	p {
		color: white;
		font-size: $base-logo-title-fontSize;
		margin-left: 10px;
	}
}
</style>