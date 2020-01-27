<template>
	<span class="sticker" :class="cl" @mousedown="md"></span>
</template>

<script>
import throttle from 'lodash.throttle';

export default {
	name: 'Sticker',
	data() {
		return {
			cl: ['lt', 'rt', 'rb', 'lb', 't', 'r', 'b', 'l'][this.type] || ''
		}
	},
	props: {
		type: {
			type: String,
			default: ''
		}
	},
	created() {
		this.mm = throttle(this.mousemove.bind(this), 100) 
	},
	methods: {
		md(e) {
			e.stopPropagation();

			this.dragging = true;
			this.left = e.pageX;
			this.top = e.pageY;
			window.addEventListener('mousemove', this.mm)
			window.addEventListener('mouseup', this.mouseup)
		},

		mousemove(e) {
			if (this.dragging) {
				this.$emit('change', {
					type: this.type,
					x: e.pageX - this.left,
					y: e.pageY - this.top
				})
			}
		},

		mouseup(e) {
			this.$emit('change', {
				type: 'end',
				x: e.pageX - this.left,
				y: e.pageY - this.top
			})

			this.dragging = false;
			this.left = e.pageX;
			this.top = e.pageY;

			window.removeEventListener('mousemove', this.mm)
			window.removeEventListener('mouseup', this.mouseup)
		}
	}
}
</script>

<style lang="less" scoped>
	.sticker{
		position: absolute;
		width: 10px;
		height: 10px;
		background-color: #aaa;
		z-index: 100;
	}
	.lt{
		left: -5px;
		top: -5px;
	}
	.rt{
		right: -5px;
		top: -5px;
	}
	.lb{
		left: -5px;
		bottom: -5px;
	}
	.rb{
		right: -5px;
		bottom: -5px;
	}
	.t{
		left: 50%;
		margin-left: -5px;
		top: -5px;
	}
	.b{
		left: 50%;
		margin-left: -5px;
		bottom: -5px;
	}
	.l{
		top: 50%;
		margin-top: -5px;
		left: -5px;
	}
	.r{
		top: 50%;
		margin-top: -5px;
		right: -5px;
	}
</style>