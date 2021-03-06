<template>
  <div class="dragAndResize" @mousedown="md">
		<slot></slot>
		<Sticker v-for="item in '01234567'" :key="item" :type="item" @change="change"></Sticker>
  </div>
</template>

<script>
import Sticker from './components/Sticker';
import throttle from 'lodash.throttle';

export default {
	name: 'DragAndResize',
	data() {
		return {
			width: 0,
			height: 0,
			left: 0,
			top: 0,
			x: 0,
			y: 0
		}
	},
	props: {
		w: {
			type: Number,
			default: 0
		},
		h: {
			type: Number,
			default: 0
		}
	},
	watch: {
		x(v) {
			this.$el.style.transform = `translate(${v}px, ${this.y}px)`
		},
		y(v) {
			this.$el.style.transform = `translate(${this.x}px, ${v}px)`
		},
		left(v) {
			this.$el.style.left = v + 'px';
		},
		top(v) {
			this.$el.style.top = v + 'px';
		},
		width(v) {
			this.$el.style.width = v + 'px';
		},
		height(v) {
			this.$el.style.height = v + 'px';
		}
	},
	created() {
		this._mm = throttle(this.mm, 100);
	},
	mounted() {
		if (this.w && this.h) {
			this.width = this.w;
			this.height = this.h;
		} else {
			if (this.$slots.default && this.$slots.default[0].elm.nodeType === 1) {
				const $el = this.$slots.default[0].elm;
				this.width = $el.offsetWidth;
				this.height = $el.offsetHeight;
			} else {
				this.width = this.w;
				this.height = this.h;
			}
		}

		this._w = this.width;
		this._h = this.height;
		this._l = 0;
		this._t = 0;
		this._x = 0;
		this._y = 0;
	},
	methods: {
		change({type, x, y}) {
			if (type === 'end') {
				this._w = this.width;
				this._h = this.height;
				this._l = this.left;
				this._t = this.top;
			} else {
				this['ch' + type](x, y);
				this.$emit('clientrectUpdated', {w: this.width, h: this.height, l: this.left, t: this.top});
			}
		},
		ch0(x, y) {
			// left-top
			this.left = this._l + x;
			this.top = this._t + y;
			this.width = this._w - x;
			this.height = this._h - y;
		},
		ch1(x, y) {
			// right-top
			this.top = this._t + y;
			this.width = this._w + x;
			this.height = this._h - y;
		},
		ch2(x, y) {
			// right-bottom
			this.width = this._w + x;
			this.height = this._h + y;
		},
		ch3(x, y) {
			// left-bottom
			this.left = this._l + x;
			this.width = this._w - x;
			this.height = this._h + y;
		},
		ch4(x, y) {
			// top
			this.top = this._t + y;
			this.height = this._h - y;
		},
		ch5(x, y) {
			// right
			this.width = this._w + x;
		},
		ch6(x, y) {
			// bottom
			this.height = this._h + y;
		},
		ch7(x, y) {
			// left
			this.left = this._l + x;
			this.width = this._w - x;
		},
		md(e) {
			e.stopPropagation();
			this._drag = true;
			this._x = e.pageX - this._x;
			this._y = e.pageY - this._y;

			window.addEventListener('mousemove', this._mm)
			window.addEventListener('mouseup', this.mu)
		},
		mm(e) {
			if (this._drag) {
				this.x = e.pageX - this._x;
				this.y = e.pageY - this._y;

				this.$emit('positionUpdated', {x: this.x, y: this.y})
			}
		},
		mu(e) {
			this._drag = false;
			this._x = this.x;
			this._y = this.y;

			window.removeEventListener('mousemove', this._mm)
			window.removeEventListener('mouseup', this.mu)
		}
	},
  components: {
		Sticker
  }
}
</script>

<style lang="less" scoped>
.dragAndResize {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	position: absolute;
	border: 1px solid #999;
	
	*{
		margin: 0;
		padding: 0;
	}

}
</style>
