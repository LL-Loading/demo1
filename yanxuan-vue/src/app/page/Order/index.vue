<template>
	<div class="page-wrapper">
		<div class="header"><YanTitle /></div>
		<div class="content">
			<div class="address">
				<div class="sign"></div>
				<div @click="$router.push({ path:'address', query:{ referer:'/order' } })">
					<span v-if="addressId === 0 ">
					<p>请先选择地址哦</p>
					<i class="iconfont icon-right"></i>
				</span>
					<ul v-else>
						<li>
							<div class='left'>
								<span class='name' v-text="address.receiveName"></span>
							</div>
							<div class="center">
								<span class='tel' v-text="address.receiveTel"></span>
								<p class='add'>{{address.receiveAddress}} {{address.receiveAddressDetail}}</p>
							</div>
							<div class='bottom'>
								<router-link to="/address" class='delete iconfont icon-right'></router-link>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="discounts clearfix">
				<ul>
					<li class="clearfix"><span>暂无可用优惠券</span><em class="iconfont icon-right"></em></li>
					<li class="clearfix"><i class="checkbox" @click="isShow1=!isShow1"><i class="iconfont icon-check" v-show="isShow1"></i></i><span>礼品卡余额：￥0.00</span><em class="iconfont icon-right"></em></li>
					<li class="clearfix"><i class="checkbox" @click="isShow2=!isShow2"><i class="iconfont icon-check" v-show="isShow2"></i></i><span>回馈金余额：￥0.00</span><em class="iconfont icon-right"></em></li>
				</ul>
			</div>
			<div class="total">
				<ul>
					<li class="clearfix"><span>商品合计</span><em class="price" >￥{{account}}</em></li>
					<li class="clearfix"><span>运费</span><em>￥0.00</em></li>
					<li class="clearfix"><span>优惠券</span><em>-￥0.00</em></li>
					<li class="clearfix"><i class="checkbox" @click="isShow3=!isShow3"><i class="iconfont icon-check" v-show="isShow3"></i></i><span>我要开发票</span><em class="iconfont icon-right"></em></li>
				</ul>
			</div>
			<div class="order-wrapper">
				<ul class="order">
					<li v-for="item in buyList">
						<a><img :src="item.avatar"></a>
						<div>
							<span class="top">
								<h3 v-text="item.name"></h3>
								<em v-text="item.sale"></em>
							</span>
							<span class="bottom">
								<i class="newprice">￥{{item.newprice}}</i>
								<i class="price">{{ item.price }}</i>
							</span>
						</div>
						<em class="count" v-text="`X ${item.count}`"> </em>

					</li>
				</ul>
			</div>
			<div class="deal"><i class="checkbox" @click="isShow=!isShow"><i class="iconfont icon-check" v-show="isShow"></i></i> 我已同意《网易严选服务协议》 </div>
		</div>
		<div class="footer">
			<div>
				<em>总价：￥{{ account }}</em>
				<i>优惠：-￥0.00</i>
			</div>
			<button @click="generateOrder" v-if="isShow">去付款</button>
			<button :class=" !isShow ? 'disable' : '' "  v-else>去付款</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Router from '../../router';
	import { mapActions, mapState } from 'vuex'
	import YanTitle from '../../components/YanTitle';
        export default {
                components:{ YanTitle, },
	        data() {
                        return {
				isShow1:false,
                                isShow2:false,
                                isShow3:false,
	                        isShow:true,
	                        addressId:0,
	                        disabled:true
                        }
	        },
	        computed: {
                        ...mapState('cart', ['list']),
                        buyList(){
                                return this.list.filter(item => item.select1 )
                        },
                        account(){
                                return this.buyList.reduce((sum, item) => sum + item.newprice * item.count, 0)
                        },
		        address() {
                                return this.$store.state.address.list.find(item => item.id === this.addressId)
		        },
                },
	        methods:{
		        ...mapActions('address',['addressList']),
		        ...mapActions('cart',['settlement']),
                        generateOrder() {
		                console.log(123)
                                if(this.addressId === 0 ) this.alert('必须要提供一个地址哦');
                                else this.settlement(this.addressId).then(() => {
                                        this.$router.push({path:'/payment'})
                                });
                        }

	        },
                created() {
                        if(this.$route.query.addressId) this.addressId = parseInt(this.$route.query.addressId);
                        else this.addressList().then(() => {
                                let defaultAddress = this.$store.state.address.list.find(item =>  item.isDefault);
                                this.addressId = defaultAddress ? defaultAddress.id : 0
                        })
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.page-wrapper
	height: 100%
	width: 100%
	display:flex
	flex-direction:column
	background-color #f6f6f6
	.header
		height: 0.8rem
		flex-shrink:0
	.content
		flex-grow:1
		overflow:auto
		.address
			height: 1.7rem
			div.sign
				background:url('./bc1.png')
				height:0.1rem
			ul
				border-bottom:1px solid #ccc
				li
					height: 1.5rem
					background-color: #fff
					margin-top: 0.1rem
					display:flex
					justify-content space-between
					padding: 0.2rem
					box-sizing: border-box
					.left
						flex-shrink: 0
						font-size: 0.28rem
						padding: 0.2rem 0
						display: flex
						margin-right:0.3rem
						flex-direction column
						box-sizing: border-box
						.name
							font-size:0.26rem
							text-align: center
							margin-bottom:0.2rem
						a
							color:deepskyblue
							display:inline-block
							width:0.8rem
							font-size:0.2rem
							padding: 0 0.1rem
							border:1px solid deepskyblue
							&.default
								color: darkred
								padding: 0 0.1rem
								border: 1px solid darkred
					.center
						flex-grow: 1
						.tel
							margin-bottom:0.2rem
						.add
							margin-top:0.4rem
					.bottom
						margin-top: 0.3rem
						margin-left:0.2rem
						width:0.5rem
						flex-shrink: 0
						a
							font-size: 0.32rem
		.discounts
			margin-top: 0.2rem
			background-color: #fff
			padding-bottom: 0.2rem
			ul
				padding: 0 0.2rem
				li
					height: 0.8rem
					border-top: 2px solid #eee
					&>*
						line-height: 0.8rem
					i.checkbox
						display: inline-block
						width: 0.36rem
						height: 0.36rem
						border: 1px solid #ccc
						float: left
						margin: 0.2rem 0.2rem 0 0
						i
							font-size:0.34rem
							font-weight:bold
							display:block
							margin-top: -0.2rem
							margin-left:0.03rem
					span
						float: left
					em
						float: right
						font-style: normal
		.total
			margin-top: 0.2rem
			background-color: #fff
			ul
				padding: 0 0.2rem
				li
					height: 0.8rem
					border-top: 2px solid #eee
					&>*
						line-height: 0.8rem
					span
						float: left
					em
						float: right
						font-style: normal
					i.checkbox
						display: inline-block
						width: 0.36rem
						height: 0.36rem
						border: 1px solid #ccc
						float: left
						margin: 0.2rem 0.2rem 0 0
						i
							font-size:0.34rem
							font-weight:bold
							display:block
							margin-top: -0.2rem
							margin-left:0.03rem
		.order-wrapper
			margin: 0.2rem 0
			padding: 0.2rem
			background-color: #fff
			ul
				display:flex
				flex-direction:column
				li
					height:2.5rem
					display:flex
					justify-content:space-between
					margin-bottom:0.2rem
					a
						flex-shrink:0
						width:2.5rem
						img
							width:2.5rem
							background-color #ccc
					div
						flex-grow:1
						margin-left:0.2rem
						display:flex
						flex-direction:column
						justify-content:space-between
						span.top
							font-style:normal
						span.bottom
							i
								font-style:normal
							i.newprice
								color:#B4282D
								font-size:0.32rem
							i.price
								color: #999;
								text-decoration: line-through;
					em.count
						flex-shrink:0
						margin-top:17%
						font-size:0.32rem
		.deal
			padding:0 0.2rem
			height:0.5rem
			margin-bottom:0.5rem
			line-height:0.5rem
			i.checkbox
				display: inline-block
				width: 0.36rem
				height: 0.36rem
				border: 1px solid #ccc
				float: left
				margin-right:0.2rem
				margin-top:0.06rem
				i
					font-size:0.34rem
					font-weight:bold
					display:block
					margin-top: -0.09rem
					margin-left:0.03rem



	.footer
		border-top:1px solid #ccc
		flex-shrink:0
		height: 1rem
		display:flex
		justify-content space-between
		div
			display:flex
			flex-direction:column
			em
				color:#B4282D
				font-size:0.3rem
				margin-bottom:0.1rem
			i
				font-style:normal
		button
			height:100%
			padding:0 1rem
			font-size:0.32rem
			color:#fff
			background-color:#B4282D
			border:none
			&.disable
				background-color: #ccc

</style>