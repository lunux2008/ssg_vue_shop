function createTrademarkList() {
	return [
		{
			id: 1,
			name: "华为",
			logoUrl: "https://www.baidu.com/img/flexible/logo/pc/result.png"
		},
		{
			id: 2,
			name: "苹果",
			logoUrl: ""
		},
		{
			id: 3,
			name: "OPPO",
			logoUrl: "https://www.baidu.com/img/flexible/logo/pc/result.png"
		},
		{
			id: 4,
			name: "小米",
			logoUrl: "https://www.baidu.com/img/flexible/logo/pc/result.png"
		},
		{
			id: 5,
			name: "红米",
			logoUrl: "https://www.baidu.com/img/flexible/logo/pc/result.png"
		},
		{
			id: 6,
			name: "VIVO",
			logoUrl: "https://www.baidu.com/img/flexible/logo/pc/result.png"
		},

	]
}

export default [
	{
		url: "/api/admin/product/baseTrademark",
		method: "get",
		response: () => {
			const list = createTrademarkList()
			
			return { code: 200, data: { list, total: list.length } }
		}
	},
	{
		url: "/api/admin/product/baseTrademark/save",
		method: "post",
		response: (data) => {
			return { code: 200, data: data }
		}
	},
	{
		url: "/api/admin/product/baseTrademark/remove",
		method: "delete",
		response: (data) => {
			return { code: 200, data: data }
		}
	},
]