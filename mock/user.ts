function createUserList() {
	return [
		{
			userId: 1,
			avatar: "",
			username: "admin",
			password: "123456",
			desc: "平台管理员",
			roles: ["admin"],
			buttons: ["cuser.detail"],
			routes: ["home"],
			token: 'Admin Token123',
		},
		{
			userId: 2,
			avatar: "",
			username: "user1",
			password: "123456",
			desc: "平台管理员",
			roles: ["admin"],
			buttons: ["cuser.detail"],
			routes: ["home"],
			token: 'user1 Token123',
		},
	]
}

export default [
	{
		url: "/api/user/login",
		method: "post",
		response: ({ body }) => {
			const { username, password } = body;
			
			const checkUser = createUserList().find(
				(item) => item.username === username && item.password === password
			)
			
			if (!checkUser) {
				return { code: 201, data: { message: "账号密码不正确" } }
			}
			
			const { token } = checkUser
			return { code: 200, data: { token } }
		}
	},
	{
		url: "/api/user/info",
		method: "get",
		response: (request) => {
			const token = request.headers.token
			
			const checkUser = createUserList().find((item) => item.token === token)
			if (!checkUser) {
				return { code: 201, data: { message: "获取用户信息失败" } }
			}
			
			return { code: 200, data: { checkUser } }
		}
	}
]