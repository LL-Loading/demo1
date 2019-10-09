<template>
	<div class="page-wrapper">
		<div class="content">
			<span>请选择支付方式</span>
			<ul>
				<li  @click="check = 0"><i class="checkbox " :class="{ checked: check === 0 }"></i><em class="iconfont icon-zhifubao"></em><p>支付宝</p></li>
				<li @click="check = 1"><i class="checkbox" :class="{ checked: check === 1 }"></i><em class="iconfont icon-weixin"></em><p>微信支付</p></li>
				<li @click="check = 2"><i class="checkbox" :class="{ checked: check === 2 }"></i><em class="iconfont icon-wangyi0"></em><p>网易支付</p></li>
			</ul>
		</div>
		<div class="footer">
			<button @click="save">确定</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        export default {
                data() {
                  return {
                          check: 0
                  }
                },
		methods:{
                        checked() {

                        },
                        save() {
                                this.$router.push({path:'/orderdetail'})
                        },
		},
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	i.checkbox
		vertical-align: middle
		display: inline-block
		margin-right: 0.2rem
		width: 0.36rem; height: 0.36rem
		background-size: 100% 100%
		background-image: url(icon_checkbox_uncheck.png)
	i.checkbox.checked
		background-image: url(icon_checkbox_check.png)
.page-wrapper
	height: 100%
	width:100%
	display:flex
	flex-direction:column
	.content
		flex-grow: 1
		background-color:#f5f5f5
		span
			height: 0.7rem
			line-height:0.7rem
			color:#999
			padding: 0 0.4rem
		ul
			background-color:#fff
			padding:0 0.2rem
			li
				height:1rem
				display:flex
				align-items:center
				em
					font-size:0.36rem
					margin-right:0.2rem
				em.icon-zhifubao
					color:blue
				em.icon-weixin
					color:green
				em.icon-wangyi0
					color:#B4282D
	.footer
		flex-shrink:0
		height:1rem
		button
			height: 100%
			width: 100%
			color:#fff
			background-color #B4282D
			font-size:0.32rem
</style>