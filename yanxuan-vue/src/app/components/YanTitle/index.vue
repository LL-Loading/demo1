<template>
	<div class="title">
		<a @click="$router.back()"><i class="iconfont icon-back"></i></a>
		<img src="" alt="">
		<router-link to="/home"><i class="iconfont icon-home1"></i></router-link>
	</div>
</template>

<script type="text/ecmascript-6">
        export default { };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.title
		height: 0.8rem
		width:100%
		display: flex
		justify-content space-between
		a
			color:#333
			i
				width: 1rem
				flex-shrink: 0
				padding: 0 0.2rem
				text-align center
				line-height:0.8rem
				font-size: 0.42rem
		img

			background: url(yanxuanlogo.png) no-repeat center center;
			flex-grow: 1;

</style>