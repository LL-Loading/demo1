<template>
	<button @click="click">{{ value }}</button>
</template>

<script type="text/ecmascript-6">
        export default {
                props:{
                        value:{
                                type:String,
                                default: '确定'
                        },
                        click: Function
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	button
		display: block
		width: 100%
		height:1rem
		line-height: 1rem
		color: #fff
		border: none
		outline: none
		font-size: 0.32rem
		background-color:#DD1A21
		border-radius: 0.5rem
		margin:0.5rem 0
</style>