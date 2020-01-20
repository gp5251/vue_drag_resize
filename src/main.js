import Vue from 'vue/dist/vue.esm'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
	// render: h => h(App),
	template: `<App style="margin: 100px"><div style="width: 300px;height: 150px;"></div></App>`,
	components: {App}
}).$mount('#app')
