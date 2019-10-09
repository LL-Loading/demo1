<template>
	<ul class="nav">
		<li>
			<router-link to="/home">
				<i class="iconfont icon-home1"></i><span>主页</span>
			</router-link>
		</li>
		<li>
			<router-link to="/category">
				<i class="iconfont icon-category1"></i><span>分类</span>
			</router-link>
		</li>
		<li>
			<router-link to="/identify">
				<i class="iconfont icon-img"></i><span>识物</span>
			</router-link>
		</li>
		<li>
			<router-link to="/cart">
				<i class="iconfont icon-cart"></i><span>购物车</span>
			</router-link>
		</li>
		<li>
			<router-link to="/profile">
				<i class="iconfont icon-center"></i><span>个人</span>
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
        export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	ul.nav
		display: flex
		height: 1rem
		li
			flex-grow: 1
			a
				margin-top: 0.1rem
				text-align: center
				display: flex
				flex-direction: column
				justify-content: center
				color: #838383
				&.router-link-active
					color: #C4565A
				i
					display: block
					height: 0.5rem
					font-size: 0.42rem
				span
					font-size: 0.26rem
</style>