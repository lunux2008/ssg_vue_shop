import request from "@/utils/request"

enum API {
	CATEGORY1_URL = "/admin/product/category1",
	CATEGORY2_URL = "/admin/product/category2",
	CATEGORY3_URL = "/admin/product/category3"
}

export const reqCategory1 = () => request.get<any, any>(API.CATEGORY1_URL)
export const reqCategory2 = (parentId: number) => request.get<any, any>(API.CATEGORY2_URL)
export const reqCategory3 = (parentId: number) => request.get<any, any>(API.CATEGORY3_URL)