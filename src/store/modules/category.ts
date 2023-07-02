import { defineStore } from "pinia"
import { reqCategory1, reqCategory2, reqCategory3 } from "@/api/product/attr"

const useCategoryStore = defineStore("Category", {
	state: () => {
		return {
			category1Arr: [],
			category2Arr: [],
			category3Arr: []
		}
	},
	actions: {
		async getCategory1() {
			let result = await reqCategory1()
			if (result.code == 200) {
				this.category1Arr = result.data.list
			}
		},
		async getCategory2(parentId: number) {
			let result = await reqCategory2()
			if (result.code == 200) {
				this.category2Arr = result.data.list
			}
		},
		async getCategory3(parentId: number) {
			let result = await reqCategory3()
			if (result.code == 200) {
				this.category3Arr = result.data.list
			}
		},
	},
	getters: {
		
	}
})

export default useCategoryStore