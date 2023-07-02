<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue"
import type { UploadProps } from "element-plus"
import { ElMessage } from "element-plus"
import { reqTrademark, reqAddOrUpdateTrademark, reqRemoveTrademark } from "@/api/product/trademark"

let pageNO = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<any>([])


let dialogFormVisible = ref(false)

let tmname = ref<string>("")
let imageUrl = ref<string>("")
let formRef = ref()

const trademarkForm = reactive({
	id: 0,
	tmName: "",
	logoUrl: ""
})

const getTrademark = async(curPage = 1)=> {
	let result = await reqTrademark(curPage, limit.value)

	if (result.code == 200) {
		total.value = result.data.total
		trademarkArr.value = result.data.list
	}
}

const ClearTrademarkForm = ()=> {
	trademarkForm.id = 0
	trademarkForm.tmName = ""
	trademarkForm.logoUrl = ""
}

const changePageNo = ()=> {
	getTrademark(pageNO.value)
}

const sizeChange = ()=> {
	pageNO.value = 1
	getTrademark()
}

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile)=> {
	const allowTypes = ["image/png", "image/jpeg", "image/gif"]

	if (allowTypes.indexOf(rawFile.type) > -1) {
		if (rawFile.size / 1024 / 1024 > 4) {
				ElMessage({
				type: "error",
				message: "上传文件必须小于4M"
			})
			return false
		}
	} else {
		ElMessage({
			type: "error",
			message: "上传文件格式必须为PNG,JPG,GIF"
		})
		return false
	}
	
	return true
}


const handleAvatarSuccess: UploadProps["onSuccess"] = (response, uploadFile)=> {
	trademarkForm.logoUrl = response.data.imageUrl
	
	formRef.value.clearValidate("logoUrl")
}


const doCancel = () => {
	dialogFormVisible.value = false
	ClearTrademarkForm()
}

const doConfirm = async()=> {
	await formRef.value.validate()
	
	let result: any = await reqAddOrUpdateTrademark(trademarkForm)
	console.log(result)
	
	if (result.code == 200) {
		dialogFormVisible.value = false
		
		ElMessage({
			type: "success",
			message: trademarkForm.id ? "修改品牌成功" : "添加品牌成功"
		})
		
		if (trademarkForm.id) {
			getTrademark(pageNO.value)
		} else {
			pageNO.value = 1
			getTrademark()
		}
		
		ClearTrademarkForm()
	} else {
		ElMessage({
			type: "success",
			message: trademarkForm.id ? "修改品牌失败" : "添加品牌失败"
		})
	}
}

const showAdd = ()=> {
	ClearTrademarkForm()
	
	dialogFormVisible.value=true
	
	nextTick(() => {
		formRef.value?.clearValidate("tmName")
		formRef.value?.clearValidate("logoUrl")
	})
}

const showEdit = (row)=> {
	nextTick(() => {
		formRef.value?.clearValidate("tmName")
		formRef.value?.clearValidate("logoUrl")
	})

	ClearTrademarkForm()

	// Object.assign(trademarkForm, row)
	
	trademarkForm.id      = row.id
	trademarkForm.tmName  = row.name
	trademarkForm.logoUrl = row.logoUrl
	
	dialogFormVisible.value = true
}

const doRemove = async(row)=> {
	console.log(row.id)
	let result = await reqRemoveTrademark(row.id)
	if (result.code == 200) {
		ElMessage({
			type: "success",
			message: "删除品牌成功"
		})

		let p = trademarkArr.value.length > 1 ? pageNO.value : pageNO.value - 1
		p = Math.max(p, 1)
		getTrademark(p)
	} else {
		ElMessage({
			type: "error",
			message: "删除品牌失败"
		})
	}
}

const upload = ()=> {
	return "http://192.168.1.51/upload"
}

onMounted(() => {
	getTrademark()
})

const validatorTmName = (rule:any, value:any, callback:any)=> {
	if (value.trim().length >= 2) {
		callback()
	} else {
		callback(rule.message)
	}
}

const validatorLogoUrl = (rule:any, value:any, callback:any)=> {
	if (value.trim().length > 0) {
		callback()
	} else {
		callback(rule.message)
	}
}

const rules = {
	tmName: [
		{
			required: true, trigger: "blur", message: "品牌名称必须大于2位",
			validator: validatorTmName
		}
	],
	logoUrl: [
		{
			required: true, trigger: "change", message: "品牌LOGO必须上传",
			validator: validatorLogoUrl
		}
	]
}
</script>

<template>
	<div>
		<el-card class="box-card">
			<el-button type="primary" size="default" icon="ElIconPlus" @click="showAdd">添加品牌</el-button>
		</el-card>
		<el-table style="margin:10px 0;" border :data="trademarkArr">
			<el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
			<el-table-column label="名词" prop="name">
			</el-table-column>
			<el-table-column label="LOGO">
				<template #="{row,$index}">
					<img :src="row.logoUrl" />
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template #="{row,$index}">
					<el-button type="primary" size="small" icon="ElIconEdit" @click="showEdit(row)">编辑</el-button>

					<el-popconfirm :title="`确定要删除[${row.name}] 吗?`" icon="ElIconDelete" @confirm="doRemove(row)">
						<template #reference>
							<el-button type="primary" size="small">删除</el-button>
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		  v-model:current-page="pageNO"
		  v-model:page-size="limit"
		  :page-sizes="[3, 5, 7, 9]"
		  :small="false"
		  :disabled="false"
		  :background="true"
		  layout="prev, pager, next, jumper, ->, sizes, total"
		  :total="total"
		  @current-change="changePageNo"
		  @size-change="sizeChange"
		/>
		
		<el-dialog v-model="dialogFormVisible" :title="trademarkForm.id?'修改品牌':'添加品牌'">
			<el-form :model="trademarkForm" :rules="rules" ref="formRef">
				<el-form-item label="品牌名称" label-width="80px" prop="tmName">
					<el-input placeholder="输入品牌名词" v-model="trademarkForm.tmName" />
				</el-form-item>
				<el-form-item label="品牌LOGO" label-width="80px" prop="logoUrl">
					<el-upload
					class="avatar-uploader"
					:action="upload()"
					:show-file-list="false"
					:on-success="handleAvatarSuccess"
					:before-upload="beforeAvatarUpload"
					>
					<img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
					<el-icon v-else class="avatar-uploader-icon"><ElIconPlus /></el-icon>
				  </el-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="doCancel">取消</el-button>
					<el-button type="primary" @click="doConfirm">
					  确定
					</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss">
.el-button--text {
  margin-right: 15px;
}

.el-input {
  width: 400px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>

<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>