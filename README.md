# vue-drag-and-resize
vue 拖拽和缩放组件
组件默认大小为100*100，如果传入slot，则大小为slot大小

### 安装方法
```shell
$ npm i vue-drag-and-resize
```

### 使用方法
```js
import DragAndResize from 'vue-drag-and-resize'
import 'vue-drag-and-resize/dist/DragAndResize.css'

new Vue({
	template: `
		<DragAndResize @positionUpdated="positionUpdated" @clientrectUpdated="clientrectUpdated" :w="100" :h="100"></DragAndResize>
	`,
	methods: {
		positionUpdated({x, y}) {
			// 位置更新
			console.log('positionUpdated', x, y);
		},
		clientrectUpdated({w, h, l, t}) {
			// 大小和缩放更新
			console.log('clientrectUpdated', w, h, l, t);
		}
	},
	components: {DragAndResize}
}).$mount('#app')
```
`w, h 为初始化宽高`

### 事件
* positionUpdated

	接受参数:当前坐标 {x, y}

* clientrectUpdated

	接受参数:当前宽高和位移 {w, h, l, t}