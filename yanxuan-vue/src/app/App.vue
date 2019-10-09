<template>
	<div class="root">
		<YanLoading />
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</div>
</template>

<script type="text/ecmascript-6">
	import YanLoading from './components/YanLoading';
	import YanTitle from './components/YanTitle';
        export default {
                components: { YanLoading, YanTitle }

        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.root
		height: 100%
		width: 100%
</style>