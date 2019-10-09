<template>
	<div class="loading" v-show="$store.state.loading.isShow">
		<img :src="LoadingImg" alt=""><p>loading...</p>
	</div>
</template>

<script type="text/ecmascript-6">
	import LoadingImg from './loading.png'
        export default {
	        data() {
	                return {
	                        LoadingImg
	                }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.loading
		position: fixed
		left: 0
		top: 0
		z-index: 1000
		width: 100%
		height: 100%
		background-color: #fff;
		img
			display block
			width: 0.9rem
			position absolute
			left: 40%
			top: 50%
			transform:translate(-50%, -50%)
		p
			position absolute
			left: 57%
			top: 50%
			color:#666
			font-size:0.32rem
			transform:translate(-50%, -50%)
</style>