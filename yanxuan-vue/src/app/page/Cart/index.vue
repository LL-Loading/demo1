<template>
	<div class="page-wrapper">
		<div class="header">
			<h1>购物车</h1>
			<a href="#">领券</a>
			<button class="btn-toggle" v-show="list.length>0" v-text="isEdit ? '完成' : '编辑' " @click="isEdit=!isEdit"></button>
		</div>
		<div class="content-wrapper">
			<div class="content">
				<ul>
					<li v-for="item in list">
						<i class='checkbox' @click="toggleSelect1(item.id)" :class="{checked: item.select1}" v-show="!isEdit"></i>
						<i class='checkbox' @click="toggleSelect2(item.id)" :class="{checked:item.select2}" v-show="isEdit"></i>
						<a><img :src='item.avatar'/></a>
						<div class='sum'>
							<div class='top'>
								<h3 class='sale' v-text="item.sale"></h3>
								<h3 class='name' v-text="item.name"></h3>
							</div>
							<div class='center'></div>
							<div class='bottom'>
								<span><em class='newprice' v-text="`¥${ item.newprice }`"></em><em class='price' v-text="item.price"></em></span>
								<span class='amend'>
									<YanCount :count="item.count" :decrease="e => decrease({id: item.id})"  :increase="e => increase({ id: item.id })"></YanCount>
								</span>
							</div>
						</div>
					</li>
				</ul>
				<div class="hide" v-show="list.length === 0">
					<img src="./bc2.png" alt="">
					<span>购物车没有商品哦，去逛逛吧</span>
					<button><router-link to="/category">去逛逛</router-link></button>
				</div>
			</div>
			<div class="content-footer normal" v-if="!isEdit" v-show="list.length>0">
				<span class="left">
					<span class="all" @click="toggleAllSelect1(!normalChecked)"><i class="checkbox" :class="{checked: normalChecked}"></i>全选</span>
				</span>
				<span class="right">
					<em>合计:￥<em class="account" v-text="account"></em></em>
					<button class="btn-settement" @click="$router.push('/order')" :disabled="total1 === 0"  :class="{ disabled: total1 ===0 }">下单<em class='total' v-text="`(${total1})`" v-show="total1"></em></button>
				</span>
			</div>
			<div class="content-footer edit" v-else="isEdit" v-show="list.length>0">
				<span class="left">
					<span class="all" @click="toggleAllSelect2(!editChecked)"><i class="checkbox" :class="{checked: editChecked}"></i>全选</span>
				</span>
				<span class="right">
					<button class="del" @click="removeList"  :disabled="total2 === 0"  :class="{ disabled: total2 ===0 }" >删除<em class='total' v-text="`(${total2})`" v-show="total2"></em></button>
				</span>
			</div>
		</div>
		<div class="footer"><YanNav /></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import YanCount from '../../components/YanCount';
	import { createNamespacedHelpers } from 'vuex';
	let { mapState,mapGetters, mapActions, mapMutations } = createNamespacedHelpers('cart')
        import YanNav from '../../components/YanNav'
        export default {
                components: { YanNav, YanCount },
	        data() {
                        return {
                                isEdit:false,
                        }
	        },
	        computed:{
		        ...mapState(['list']),
		        normalChecked() { return this.list.every(item => item.select1) },
		        editChecked() {return this.list.every(item => item.select2)},
		        total1() { return this.list.reduce((result,item) => item.select1 ? item.count + result : result,0) },
                        total2() { return this.list.reduce((result,item) => item.select2 ? item.count + result : result,0) },
		        account() { return this.list.reduce((result,item) => item.select1 ?  item.count * item.newprice + result : result,0) }
	        },
	        methods:{
		        ...mapMutations(['reset','toggleAllSelect1', 'toggleAllSelect2','toggleSelect1', 'toggleSelect2']),
		        ...mapActions(['init','removeList','increase','decrease']),
	        },
	        created() {
                        this.init();
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
		display: flex
		flex-direction: column
		height: 100%
		width: 100%
		background-color: #f9f9f9
		.header
			flex-shrink: 0
			height: 0.8rem
			display: flex
			padding: 0 0.2rem
			align-items: center
			h1
				flex-grow: 1
			a
				padding: 0 0.4rem
				font-size: 0.32rem
				color: #B4282D
			button
				background-color: transparent
				border: 0
				outline: 0
				padding: 0 0.4rem
				font-size: 0.32rem
		.content-wrapper
			flex-grow: 1
			display: flex
			flex-direction: column
			overflow: auto
			background-color: #f3f3f3
			.content
				flex-grow: 1
				overflow:auto
				ul
					padding: 0.2rem
					overflow: auto
					li
						display: flex
						align-items: center
						margin-bottom: 0.2rem
						i
							margin-right: 0.2rem
							flex-shrink: 0
						a
							width: 1.72rem
							height: 1.72rem
							flex-shrink: 0
							img
								width: 100%
						.sum
							display: flex
							flex-grow: 1
							margin-left: 0.2rem
							flex-direction: column
							.top
								flex-shrink: 0
								font-size: 0.2rem
								font-weight: 100
								height: 0.3rem
								overflow: hidden
								text-overflow:ellipsis
								&>*
									display: inline
								.name
									margin-left: 0.1rem
									width: 4rem
								.sale
									color: #F48F18;
							.center
								height: 0.5rem
							.bottom
								flex-shrink: 0
								font-size: 0.32rem
								display: flex
								justify-content: space-between
								em
									font-style: normal
								em.newprice
									color: #B4282D
								em.price
									color: #ccc
									text-decoration: line-through
									margin-left: 0.2rem
				div.hide
					display:flex
					flex-direction column
					margin-left:32%
					margin-top:10%
					img
						width:3rem
					span
						display:block
						width:3.5rem
						font-size:0.24rem
						margin-left:-0.2rem
					button
						width:3rem
						height:0.8rem
						border:none
						border-radius:0.4rem
						margin-top:0.2rem
						margin-left:-0.1rem
						background-color:#B4282D
						a
							display:block
							width: 100%
							height:100%
							line-height:0.8rem
							font-size:0.32rem
							color:#fff
			.content-footer
				flex-shrink:0
				display: flex
				justify-content: space-between
				width: 100%
				height: 1rem
				line-height: 1rem
				.all
					font-style: normal
					font-size: 0.32rem
					margin-left: 0.2rem
				em
					font-style: normal
					font-size: 0.32rem
				button
					height: 100%
					padding: 0 0.5rem
					font-size: 0.36rem
					border: 0
					outline: 0
					background-color: #B4282D
					color: white
					&.disabled
						background-color: #ccc
		.footer
			flex-shrink:0
</style>