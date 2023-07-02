<script setup lang="ts">
import { ref, reactive, onMounted } from "vue"
import useCategoryStore from "@/store/modules/category.ts"
let categoryStore = useCategoryStore()

let category1Id = ref<string>("")
let category2Id = ref<string>("")
let category3Id = ref<string>("")

const getCategory1 = async() => {
	await categoryStore.getCategory1()
	console.log(categoryStore.category1Arr)
}

const getCategory2 = async(parentId: number) => {

}

const getCategory3 = async(parentId: number) => {

}

onMounted(() => {
	getCategory1()
})
</script>

<template>
	<div>
		<el-card>
			<el-form :inline="true">
				<el-form-item label="一级分类">
					<el-select v-model="category1Id">
						<el-option v-for="(c1,idx) in categoryStore.category1Arr" :label="c1.name" :key="c1.id" :value="c1.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="二级分类">
					<el-select>
						<el-option v-for="(c2,idx) in categoryStore.category2Arr" :label="c2.name" :key="c2.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="三级分类">
					<el-select>
						<el-option v-for="(c3,idx) in categoryStore.category3Arr" :label="c3.name" :key="c3.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</el-card>
		<el-card style="margin:10px 0;">
			<el-button type="primary" size="default" icon="ElIconPlus">添加属性</el-button>
			<el-table border style="margin:10px 0px;">
				<el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
				<el-table-column label="属性名称" align="center" width="120"></el-table-column>
				<el-table-column label="属性值" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="120"></el-table-column>
			</el-table>
		</el-card>
		<el-card>
		789
		</el-card>
	</div>
</template>

<style scoped lang="scss">

</style>