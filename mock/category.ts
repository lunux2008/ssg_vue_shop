function getCategory1() {
	return [
		{
			id: 1,
			name: "aa"
		},
		{
			id: 2,
			name: "bb"
		},
		{
			id: 3,
			name: "cc"
		},
	]
}

function getCategory2() {
	return [
		{
			id: 1,
			name: "aaa"
		},
		{
			id: 2,
			name: "bbb"
		},
		{
			id: 3,
			name: "ccc"
		},
	]
}

function getCategory3() {
	return [
		{
			id: 1,
			name: "aaaa"
		},
		{
			id: 2,
			name: "bbbb"
		},
		{
			id: 3,
			name: "cccc"
		},
	]
}

export default [
	{
		url: "/api/admin/product/category1",
		method: "get",
		response: () => {
			const list = getCategory1()

			return { code: 200, data: { list, total: list.length } }
		}
	},
	{
		url: "/api/admin/product/category2",
		method: "get",
		response: () => {
			const list = getCategory2()

			return { code: 200, data: { list, total: list.length } }
		}
	},
	{
		url: "/api/admin/product/category3",
		method: "get",
		response: () => {
			const list = getCategory3()

			return { code: 200, data: { list, total: list.length } }
		}
	},
]