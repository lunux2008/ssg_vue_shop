export const menu = [
	{
		path: "/home",
		name: "首页",
		icon: "ElIconHomeFilled"
	},
	{
		path: "/screen",
		name: "数据大屏",
		icon: "ElIconPieChart"
	},
	{
		path: "/acl",
		name: "权限管理",
		icon: "ElIconLock",
		children: [
			{
				path: "/acl/user",
				name: "用户管理",
				icon: "ElIconUser"
			},
			{
				path: "/acl/role",
				name: "角色管理",
				icon: "ElIconAvatar"
			},
			{
				path: "/acl/permission",
				name: "菜单管理",
				icon: "ElIconMenu"
			},
		]
	},
	{
		path: "/product",
		name: "商品管理",
		icon: "ElIconLock",
		children: [
			{
				path: "/product/trademark",
				name: "商标管理",
				icon: "ElIconUser"
			},
			{
				path: "/product/attr",
				name: "属性管理",
				icon: "ElIconAvatar"
			},
			{
				path: "/product/sku",
				name: "SKU管理",
				icon: "ElIconMenu"
			},
			{
				path: "/product/spu",
				name: "SPU管理",
				icon: "ElIconMenu"
			},
		]
	},
]

