<template>
	<div class="page-wrapper">
		<div class="header">
			<router-link to="/profile"><i class="iconfont icon-back"></i></router-link>
			<img src="" alt="">
			<router-link to="/home"><i class="iconfont icon-home1"></i></router-link>
		</div>
		<div class="adorn"></div>
		<div class="content">
			<div class="title">
				<ul>
					<li v-for="(item, i) in title" :key="i" @click="getItem(i)">
						<span v-text="item" :class="{ active: activeId === i }"></span>
					</li>
				</ul>
			</div>
			<div class="matter">
				<ul v-show="page === 0">
					<li v-for="(item,i) in orderList" :key="i">
						<div class="top"><div class="order">订单号：<span v-text="item.orderid"></span></div><span>包裹{{i+1}}</span></div>
						<div class="conter">
							<img :src="item.avatar" alt="">
							<div>
								<h3>{{ item.name }}</h3>
								<p>{{ item.intro }}</p>
							</div>
							<span><h3>待发货</h3></span>
						</div>
						<div class="bottom">
							<span>单价：￥{{item.newprice}}</span>
							<span>总数量：X{{ item.shopCount }}</span>
						</div>
					</li>
				</ul>
				<ul v-show="page === 1">
					<li>暂无此类信息</li>
				</ul>
				<ul v-show="page === 2">
					<li v-for="(item,i) in orderList" :key="i">
						<div class="top"><div class="order">订单号：<span v-text="item.orderid"></span></div><span>包裹{{i+1}}</span></div>
						<div class="conter">
							<img :src="item.avatar" alt="">
							<div>
								<h3>{{ item.name }}</h3>
								<p>{{ item.intro }}</p>
							</div>
							<span><h3>待发货</h3></span>
						</div>
						<div class="bottom">
							<span>单价：￥{{item.newprice}}</span>
							<span>总数量：X{{ item.shopCount }}</span>
						</div>
					</li>
				</ul>
				<ul v-show="page === 3">
					<li>暂无此类信息</li>
				</ul>
				<ul v-show="page === 4">
					<li>暂无此类信息</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
	import YanTitle from '../../components/YanTitle';
        export default {
                components:{ YanTitle },
	        data() {
                        return {
                                title:['全部', '待付款', '待发货', '待收货', '待评价'],
                                orderList:[],
	                        Token:'',
	                        activeId: 0,
	                        page: 0,
	                        account:0,
                        }
	        },
	        methods:{
			getItem(index) {
			        this.activeId = index;
			        this.page = this.activeId;
			},
	        },
	        created() {
                        return API.order.orderDetail().then(data => this.orderList = data)
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.page-wrapper
	height: 100%
	width: 100%
	diaplay:flex
	flex-direction:column
	background-color:#f5f5f5
	.header
		height: 0.8rem
		flex-shrink: 0
		background-color #fff
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
	.adorn
		height:0.1rem
		flex-shrink: 0
		background:url('./bc1.png')
	.content
		flex-grow:1
		overflow:auto
		div.title
			ul
				background-color #fff
				text-align:center
				display:flex
				padding:0.2rem
				li
					flex-grow:1
					span
						padding:0.1rem 0
						border-bottom:2px solid transparent
					span.active
						color:#B4282D
						border-color:#B4282D
		div.matter
			margin-top:0.2rem
			ul
				li
					display:flex
					flex-direction column
					margin-bottom:0.2rem
					background-color #fff
					padding: 0 0.2rem
					text-align:center
					div.top
						display:flex
						justify-content:space-between
						padding:0.2rem 0
						border-bottom:1px solid #ccc
						i
							font-size:0.32rem
					div.conter
						display:flex
						justify-content space-between
						padding:0.2rem 0
						img
							height:1.5rem
						div
							margin-left:-1.2rem
							margin-top:0.2rem
							p
								margin-top:0.2rem
								color:#B4282D
						span
							display:flex
							align-items:center
					div.bottom
						border-top:1px solid #ccc
						padding:0.1rem 0
						display:flex
						justify-content:space-between
</style>