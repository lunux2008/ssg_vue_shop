import router from "@/router"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import userUserStore from "@/store/modules/user"
import pinia from "@/store"
let userStore = userUserStore(pinia)

nprogress.configure({ showSpinner: false })

router.beforeEach(async(to, from, next) => {
	console.log(to)
	console.log(from)
	
	nprogress.start()

	let token = userStore.token
	let username = userStore.username
	
	if (token) {
		if (to.path == "/login") {
			next({path: "/"})
		} else {
			if (!username) {
				try {
					await userStore.userInfo()
					next()
				} catch (error) {
					await userStore.userLogout()
					next({path: "/login", query:{redirect: to.path}})
				}
			} else {
				next()
			}
		}
	} else {
		if (to.path == "/login") {
			next()
		} else {
			next({path: "/login", query:{redirect: to.path}})
		}
	}
	
	// next()
})

router.afterEach((to, from) => {
	nprogress.done()
})