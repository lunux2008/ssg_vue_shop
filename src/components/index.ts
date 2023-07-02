import SVG from "@/components/icon/SVG.vue"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
// console.log(ElementPlusIconsVue)

const components = { SVG }

export default {
	install(app) {
		Object.keys(components).forEach(key => {
			app.component(key, components[key])
		})
		
		for (const [key ,component] of Object.entries(ElementPlusIconsVue)) {
			app.component("ElIcon" + key, component)
		}
	}
}