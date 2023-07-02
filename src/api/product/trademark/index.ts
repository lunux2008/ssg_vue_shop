import request from "@/utils/request"

enum API {
	TRADEMARK_URL = "/admin/product/baseTrademark",
	ADDTRADEMARK_URL = "/admin/product/baseTrademark/save",
	UPDATETRADEMARK_URL = "/admin/product/baseTrademark/save",
	REMOVETRADEMARK_URL = "/admin/product/baseTrademark/remove"
}
	
// export const reqTrademark = (page:number, limit:number) => request.get<any, any>(API.TRADEMARK_URL + `${page}/${limit}`)

export const reqTrademark = (page:number, limit:number) => request.get<any, any>(API.TRADEMARK_URL)

export const reqAddOrUpdateTrademark = (data: Object) => {
	if (data.id) {
		return request.post<any,any>(API.UPDATETRADEMARK_URL, data)
	} else {
		return request.post<any,any>(API.ADDTRADEMARK_URL, data)
	}
}

export const reqRemoveTrademark = (id: number) => {
	return request.delete<any,any>(API.REMOVETRADEMARK_URL, {id: id})
}