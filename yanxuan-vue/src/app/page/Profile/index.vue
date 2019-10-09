<template>
		<div class="person-wrapper" >
			<div class="profile" v-show="name">
				<div class="header">
					<i class="imgs"></i>
					<h2 class="name"  v-text="name"></h2>
					<h3 ></h3>
				</div>
				<div class="content">
					<div class="top">
						<div class="title">我的资产</div>
						<div class="card">
							<span><i>￥0</i>回馈金</span>
							<span><i>0</i>红包</span>
							<span><i>0</i>优惠券</span>
							<span><i>￥0</i>津贴</span>
							<span><i>0</i>礼品卡</span>
						</div>
					</div>
					<table border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td><router-link to="/orderdetail"><i class="iconfont icon-indent"></i>我的订单</router-link></td>
							<td><a href="#"><i class="iconfont icon-calendar"></i>周六一起拼</a></td>
							<td><a href="#"><i class="iconfont icon-sale"></i>售后服务</a></td>
						</tr>
						<tr>
							<td><a href="#"><i class="iconfont icon-mail"></i>邀请返利</a></td>
							<td><a href="#"><i class="iconfont icon-shop"></i>优先购</a></td>
							<td><a href="#"><i class="iconfont icon-integral"></i>积分中心</a></td>
						</tr>
						<tr>
							<td><a href="#"><i class="iconfont icon-vip"></i>会员俱乐部</a></td>
							<td><router-link to="/address"><i class="iconfont icon-site"></i>地址管理</router-link></td>
							<td><a href="#"><i class="iconfont icon-defense"></i>账号安全</a></td>
						</tr>
						<tr>
							<td><a href="#"><i class="iconfont icon-service"></i>帮助与客服</a></td>
							<td><a href="#"><i class="iconfont icon-opinion"></i>意见反馈</a></td>
							<td><a href="#"><i></i></a></td>
						</tr>
					</table>
					<button class="btn-quit"  @click="removeToken">退出登录</button>
				</div>
				<div class="footer">
					<YanNav />
				</div>
			</div>
			<div class="login" v-show="!name">
				<div class="title"><YanTitle /></div>
				<div class="conter">
					<img src="./logo.png" alt="">
					<div class="top">
						<button><router-link to="/register">立即注册</router-link></button>
						<button><router-link to="/login">立即登录</router-link></button>
					</div>
					<div class="btm">
						<span>---合作账号登录---</span>
						<em><i class="iconfont icon-QQ"></i> <i class="iconfont icon-weixin"></i><i class="iconfont icon-wangyi0"></i></em>
					</div>
				</div>
				<div class="bottom"><YanNav /></div>
			</div>
		</div>
</template>

<script type="text/ecmascript-6">
	import YanTitle from '../../components/YanTitle';
        import YanNav from '../../components/YanNav';
        import API from '../../util/api.js';
        import router from '../../router'
        let name = sessionStorage.getItem('name');
        export default {
                data() {
                        return {
	                        name,
                        }
                },
                components: { YanNav, YanTitle },
                created() {},
	        methods: {
                        removeToken() {
                                sessionStorage.removeItem('name');
                                sessionStorage.removeItem('token');
                                this.name = false;
                        }
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.person-wrapper
		width: 100%
		height:100%
		.profile
			width: 100%
			height:100%
			display:flex
			flex-direction column
			background-color: #EEEEEE
			.header
				background: url('./images/1.png');
				flex-shrink: 0
				height: 2.7rem
				width: 100%
				background-size: cover
				padding: 0.6rem
				box-sizing: border-box
				i
					display: inline-block
					margin-right: 0.5rem
					float: left
					width: 1.47rem
					height: 1.47rem
					background: url(./images/person.png);
					background-size: cover
					border-radius: 50%
					h2.name
						display: block
						margin:0.1rem 0
			.content
				flex-grow: 1
				overflow: auto
				.top
					height: 2rem
					padding-left:0.2rem
					background-color: #fff
					.title
						font-size: 0.32rem
						padding: 0.2rem 0
						border-bottom: 3px solid #eee
					.card
						display: flex
						margin-top: 0.2rem
						justify-content: space-between
						text-align: center
						span
							width: 100%
							i
								display: block
								font-style: normal
				table
					margin-top: 0.5rem
					width: 100%
					height: 7rem
					border-color:#eee
					border-collapse: collapse
					td
						background-color: #fff
						border: 3px solid #eee
						text-align: center
						width: 33.33%
						a
							color: #333
							i
								display: block
								font-size: 0.62rem
				.btn-quit
					width: 100%
					height: 1rem
					margin:0.2rem 0
					border: 0
					outline: 0
					background-color: #fff
					font-size: 0.36rem
					border-radius: 0.1rem
			.footer
				flex-shrink: 0
				height: 1rem
				width: 100%
				font-size: 0

		.login
			height: 100%
			width: 100%
			display:flex
			flex-direction:column
			.title
				height:0.8rem
				flex-shrink:0
			.conter
				flex-grow:1
				background:#f5f5f5
				display:flex
				flex-direction column
				justify-content space-around
				img
					width:50%
					margin-left:25%
				div.top
					display:flex
					flex-direction column
					padding:0 0.2rem
					button
						height:0.8rem
						margin-top:0.5rem
						border-radius:0.35rem
						border:none
						background-color:#B4282D
						font-size:0.32rem
						a
							color:#fff
				div.btm
					display:flex
					text-align:center
					flex-direction column
					font-size:0.32rem
					color:#B4282D
					em
						margin-top:0.2rem
						color:#ccc
						i
							font-size:0.5rem
							margin-right:0.5rem
						i.icon-QQ
							color:blue
						i.icon-weixin
							color:#42b983
						i.icon-wangyi0
							color:#B4282D
			.bottom
				flex-shrink:0
				height:1rem
</style>