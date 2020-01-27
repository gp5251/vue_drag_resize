# vue-drag-and-resize
vue 拖拽和缩放组件

### 安装方法
```shell
$ npm i vue-drag-and-resize
```

### 使用方法
```js
import DragAndResize from 'vue-drag-and-resize'

new Vue({
	template: `
		<DragAndResize @positionUpdated="positionUpdated" @clientrectUpdated="clientrectUpdated"></DragAndResize>
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

### 事件
* positionUpdated

	接受参数:当前坐标 {x, y}

* clientrectUpdated

	接受参数:当前宽高和位移 {w, h, l, t}