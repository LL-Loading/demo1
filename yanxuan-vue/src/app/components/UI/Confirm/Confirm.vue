<template>
	<div class="confirm" @click="close">
		<div class="content">
			<img :src="titleImg" alt="">
			<p v-text="text"></p>
			<button @click="ok">确定</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import titleImg from './icon.png';
        export default {
                data() {
			return { text:'', titleImg, resolve:null }
                },
	        methods: {
                        close() {
                                this.$destroy(true);
                                this.$el.parentNode.removeChild(this.$el);
                        },
		        ok() {
                                this.resolve();
                                this.close();
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.confirm
		position: fixed
		top: 0
		left: 0
		width: 100%
		height:100%
		z-index: 999
		background-color: rgba(0,0,0,0.5)
		.content
			position absolute
			left:50%
			top:50%
			border-radius: 0.2rem
			transform translate(-50%, -50%)
			background-color: #fff
			min-width:65%
			max-width: 80%
			img
				margin: 0.2rem auto
				display: block
			p
				color: #666
				text-align center
				padding-bottom 0.2rem
				font-size: 0.24rem
				border-bottom:1px solid #666
			button
				display:block
				margin: 0 auto
				margin-top: 0.1rem
				background-color transparent
				color: #0094ff
				border: 0
				font-size:0.28rem
				padding:0.1rem 0.3rem


</style>