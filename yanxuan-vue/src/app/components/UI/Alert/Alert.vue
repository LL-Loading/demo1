<template>
	<div class="alert">
		<div class="content">
			<h2>提 示</h2>
			<p v-text="text"></p>
			<button @click="close">确 定</button>
		</div>
	</div>

</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                        return{
                                text: '',
	                        show: true                      //因为是动态创建所以创建就显示 所以默认为true
                        }
                },
	        methods: {
                        close() {
                                this.$destroy(true);
                                this.$el.parentNode.removeChild(this.$el);
                        }
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.alert
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
			border-radius: 0.04rem
			transform translate(-50%, -50%)
			background-color: #fff
			min-width:65%
			max-width: 80%
			h2
				text-align: center
				background: linear-gradient(to right, #e4bb7e, #d1a96e)
				color: #fff
				font-weight: normal
				font-size: 0.3rem
				padding: 0.16rem 0
			p
				margin: 0.4rem 0
				color: #666
				text-indent:2em
			button
				display:block
				margin: 0 auto
				margin-bottom: 0.2rem
				background-color #0094ff
				color: #fff
				border-radius: 0.2rem
				font-size:0.24rem
				padding:0.1rem 0.3rem
</style>