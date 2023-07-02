export const constantRoute = [
	{
		path: "/login",
		component:() => import("@/views/login/index.vue"),
		name: "login"
	},
	{
		path: "/screen",
		component:() => import("@/views/screen/index.vue"),
		name: "screen"
	},
	{
		path: "/",
		component: () => import("@/layout/index.vue"),
		name: "home",
		redirect: "/home",
		children: [
			{
				path: "/home",
				component: () => import("@/views/home/index.vue"),
			},
		]
	},
	{
		path: "/acl",
		component: () => import("@/layout/index.vue"),
		name: "acl",
		redirect: "/acl/user",
		children: [
			{
				path: "/acl/user",
				component: () => import("@/layout/acl/user/index.vue"),
			},
			{
				path: "/acl/role",
				component: () => import("@/layout/acl/role/index.vue"),
			},
			{
				path: "/acl/permission",
				component: () => import("@/layout/acl/permission/index.vue"),
			}
		]
	},
		{
		path: "/product",
		component: () => import("@/layout/index.vue"),
		name: "product",
		redirect: "/product/trademark",
		children: [
			{
				path: "/product/trademark",
				component: () => import("@/layout/product/trademark/index.vue"),
			},
			{
				path: "/product/attr",
				component: () => import("@/layout/product/attr/index.vue"),
			},
			
			{
				path: "/product/sku",
				component: () => import("@/layout/product/sku/index.vue"),
			},
			
			{
				path: "/product/spu",
				component: () => import("@/layout/product/spu/index.vue"),
			},
		]
	},
	{
		path: "/404",
		component: () => import("@/views/404/index.vue"),
		name: "404"
	},
	{
		path: "/:pathMatch(.*)*",
		redirect: "/404",
		name: "any"
	}
]