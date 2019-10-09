<template>
	<div class="page-wrapper">
		<div class="header">
			<div class="title">
				<i></i>
				<input class="sheek" type="text" name="" id="" value="" placeholder="搜索商品" />
				<span v-if="!Token"><router-link to="/login" >登录</router-link></span>
			</div>
			<div class="list">
				<ul>
					<li v-for="item in mainList" :key="item.id" :class="{active : activeId === item.id}" @click="toggleId(item.id)">
						<a>{{item.name}}</a>
					</li>
				</ul>
			</div>
			
		</div>
		<div class="content">
			<img :src="avatar" alt="">
			<div class="floor1">
				<div class="top"><i></i><span>新人专享礼</span><i></i></div>
				<div class="bottom">
					<div class="left"><img src="./images/1.png"></div>
					<div class="right">
						<div class="bottom-1">
							<span>福利社</span>
							<span>今日特价</span>
							<img src="./images/2.png">
						</div>
						<div class="bottom-2">
							<span>新人拼团</span>
							<span>一元起包邮</span>
							<img src="./images/3.png">
						</div>
					</div>
				</div>
			</div>
			<div class="floor2">
				<div class="top clearfix">
					<span>品牌制造商直供</span><a href="">更多&gt;</a>
					<div class="bottom">
						<div class="bottom-1"><span>海外制造商</span><p>9.9元起</p></div>
						<div class="bottom-2"><span>CK制造商</span><p>29.9元起</p></div>
						<div class="bottom-3"><span>新秀丽制造商</span><p>159元起</p></div>
						<div class="bottom-4"><span>Armani制造商</span><p>199元起</p></div>
					</div>
				</div>
			</div>
			<div class="floor3">
				<div class="header">类目热销榜</div>
				<div class="top"><span class="top-1"><em>热销榜</em><p></p><i></i></span><span class="top-2"><em>好评榜</em><p></p><i></i></span></div>
				<div class="conter">
					<span class="conter-1"><a href="#"><p>居家生活榜</p><i></i></a></span>
					<span class="conter-2"><a href="#"><p>美食酒水榜</p><i></i></a></span>
					<span class="conter-3"><a href="#"><p>服饰鞋包榜</p><i></i></a></span>
					<span class="conter-4"><a href="#"><p>个护清洁榜</p><i></i></a></span>
				</div>
				<div class="bottom">
					<span class="bottom-1"><a href="#"><p>数码家电榜</p><i></i></a></span>
					<span class="bottom-2"><a href="#"><p>运动旅行榜</p><i></i></a></span>
					<span class="bottom-3"><a href="#"><p>母婴亲子榜</p><i></i></a></span>
					<span class="bottom-4"><a href="#"><p>全球特色榜</p><i></i></a></span>
				</div>
			</div>
			<div class="text">——暂无更多数据——</div>
			<div class="base">
				<div class="top"><span>下载APP</span> <span>电脑版</span></div>
				<p>网易公司版权所有 © 1997-2019</p>
				<p>食品经营许可证：JY13301080111719</p>
			</div>
		</div>
		<div class="footer"><YanNav /></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import YanNav from '../../components/YanNav';
	import { createNamespacedHelpers } from 'vuex';
	let { mapState,mapActions } = createNamespacedHelpers('category')
        export default {
		components: { YanNav },
	        data() {
		        return {
		                Token:false,
		        }
	        },
	        computed: {
		        ...mapState(['list','activeId']),
                        mainList() { return this.list.filter(item => item.fid === 0); },
                        avatar: function(){ return this.activeId === 0?'':this.list.find(item => item.id === this.activeId).avatar;}
	        },
	        methods:{
		        ...mapActions(['init','toggleId']),
			getToken() {
		                this.Token = sessionStorage.getItem('token');
			}
	        },
	        created() {
		        this.init().then(data => this.toggleId(data[0].id));
		        this.getToken();
	        },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		height: 100%
		width: 100%
		background-color: #f3f3f3
		.header
			flex-shrink: 0
			height: 1.5rem
			background-color: #fff
			.title
				height: 0.75rem;
				padding: 0 0.2rem;
				display: flex;
				align-items: center;
				i
					flex-shrink: 0;
					background: url('./images/yanxuanlogo.png')
					display: inline-block;
					width: 1.38rem;
					height: 0.4rem;
					margin-right: 0.5rem;
					background-size: 100%;
				input
					background: url('./images/seek.png') no-repeat
					background-position: 0.15rem 0.1rem
					flex-grow: 1
					width: 100%
					height: 0.5rem
					font-size: 0.24rem
					padding: 0 0.5rem
					border-radius: 0.15rem
					border: 0
					outline: 0
					background-color: #ededed
				span
					flex-shrink: 0
					border-radius: 0.1rem
					margin-left: 0.4rem
					height: 0.4rem
					padding: 0 0.2rem
					font-size: 0.26rem
					line-height: 0.4rem
					border: 1px solid #B4282D
					a
						color: #B4282D
			.list
				margin-top: 0.1rem;
				height: 0.75rem;
				padding: 0 0.2rem;
				ul
					display: flex
					overflow: auto
					li
						flex-shrink: 0
						padding: 0 0.3rem
						margin-right: 0.3rem
						line-height: 0.5rem
						border: 1px solid transparent
						a
							color: #333
						&.active
								border-color: #B4282D
						&.active>a
							color: #B4282D
		.content
			flex-grow:1
			overflow:auto
			img
				width: 100%
			.floor1
				margin-top: 0.2rem;
				width: 100%;
				height: 4rem;
				display: flex;
				padding: 0 0 0.1rem;
				flex-direction: column;
				background-color: #fff;
				.top
					height: 0.5rem;
					flex-shrink: 0;
					text-align: center;
					 i
						display: inline-block;
						height: 2px;
						width: 1rem;
						margin-top: 0.4rem;
						background-color: #000000;
					 span
						font-size: 0.32rem;
						margin: 0 0.2rem;
				.bottom
					padding: 0 0.2rem
					margin-top: 0.2rem
					flex-grow: 1
					display: flex
					.left
						width: 45%
						height: 100%
						background-color: #F9E9CF
					img
						margin: 0.2rem 0
					.right
						width:70%
						margin-left: 5%
						display: flex
						flex-direction: column
						height: 100%
						div.bottom-1
							width: 100%
							height: 1.5rem
							padding: 0.2rem
							box-sizing: border-box
							position: relative
							background-color: #FBE2D3
							span
								display: block
							img
									position: absolute
									right: 0
									bottom: 0
									width:2rem
						div.bottom-2
							width: 100%
							height:1.5rem
							margin-top: 4%
							padding: 0.2rem
							box-sizing: border-box
							position: relative
							background-color: #FFECC2
							span
									display: block
							img
									display: block
									width: 2rem
									height: 1.5rem
									position: absolute
									right: 0
									bottom: -0.2rem
			.floor2
				height: 6rem
				margin-top: 0.2rem
				padding: 0.2rem
				background-color: #fff
				.top
					height: 1rem
					font-size: 0.32rem
					line-height: 1rem
					a
						float: right
						color: #333
				.bottom
					display: flex
					height: 5rem
					flex-wrap: wrap
					div.bottom-1
						width: 48%;
						flex-grow: 1;
						margin-right: 4%;
						margin-bottom: 0.2rem;
						background: url('./images/floor2-1.png') no-repeat;
						background-size:100%
					div.bottom-2
						width: 48%
						flex-grow: 1
						margin-bottom: 0.2rem
						background: url('./images/floor2-2.png') no-repeat
						background-size:100%
					div.bottom-3
						width: 48%
						margin-right: 4%
						background: url('./images/floor2-3.png') no-repeat
						background-size:100%
					div.bottom-4
						width: 48%
						background: url('./images/floor2-4.png') no-repeat
						background-size:100%
					&>div
						text-align: center
						span
							font-size: 0.3rem
							color: #333
							margin-top: -2rem
						p
							margin-top: -0.6rem
							font-size: 0.26rem
							color: #7f7f7f
			.floor3
				margin-top: 0.2rem
				padding: 0.2rem
				background-color: #fff
				.header
					height: 1rem
					line-height: 1rem
					font-size: 0.32rem
				.top
					height: 2rem
					display: flex
					justify-content: space-between
					span
						display: inline-block
						width: 48%
						background-color :#F9F3E4
						position: relative
					span.top-1
						background-color: #f9f3e4
						em
							float: left
							font-size: 0.26rem
							font-style: normal
							margin-left: 0.2rem
							margin-top: 0.6rem
						p
							display: inline-block
							height: 3px
							width: 0.6rem
							float: left
							position: absolute
							left: 0.2rem
							top: 1rem
							background-color: #333
						i
							display: inline-block
							width: 2rem
							height: 100%
							float: right
							position absolute
							top:5%
							right:0.02rem
							background: url('./images/floor3-1.png') no-repeat
					span.top-2
						background-color: #EBEFF6
						em
							float: left
							font-size: 0.26rem
							font-style: normal
							margin-left: 0.2rem
							margin-top: 0.6rem
						p
							display: inline-block
							height: 3px
							width: 0.6rem
							float: left
							position: absolute
							left: 0.2rem
							top: 1rem
							background-color: #333
						i
							display: inline-block
							width: 2rem
							height: 100%
							float: right
							position absolute
							top:5%
							right:0.02rem
							background: url('./images/floor3-2.png') no-repeat
				.conter
					margin-top: 0.2rem
					height: 1.8rem
					display: flex
					justify-content: space-between
					span
						width: 1.65rem
						background-color: #f5f5f5
					p
						text-align: center
						color: #333
					i
						display: block
						height: 1.2rem; width: 1.2rem
						margin-left: 0.2rem
						margin-top: 0.1rem
					span.conter-1
						i
							background: url('./images/floor3-3.png') no-repeat
							background-size: 100%
					span.conter-2
						i
							background: url('./images/floor3-4.png') no-repeat
							background-size: 100%
					span.conter-3
						i
							background: url('./images/floor3-5.png') no-repeat
							background-size: 100%
					span.conter-4
						i
							background: url('./images/floor3-6.png') no-repeat
							background-size: 100%
				.bottom
						margin-top: 0.2rem
						height: 1.8rem
						display: flex
						justify-content: space-between
					span
						width: 1.65rem
						background-color: #f5f5f5
						p
							text-align: center
							color: #333
						i
							display: block
							height: 1.2rem
							width: 1.2rem
							margin-left: 0.2rem
							margin-top: 0.1rem
					span.bottom-1
						i
							background: url('./images/floor3-7.png') no-repeat
							background-size: 100%
					span.bottom-2
						i
							background: url('./images/floor3-8.png') no-repeat
							background-size: 100%
					span.bottom-3
						i
							background: url('./images/floor3-9.png') no-repeat
							background-size: 100%
					span.bottom-4
						i
							background: url('./images/floor3-10.png') no-repeat
							background-size: 100%
			.text
				text-align: center
				margin-top: 0.2rem
			.base
				height: 2rem
				color: #999
				text-align: center
				font-size: 0.32rem
				margin-top: 0.2rem
				padding-top: 0.2rem
				background-color: #333
				.top
					display:flex
					justify-content: space-around
					margin-bottom: 0.2rem
				span
					color: #999
					line-height: 0.6rem
					height: 0.6rem
					text-align: center
					font-size: 0.32rem
					border: 2px solid #999
					width: 1.5rem; display: block
		.footer
			flex-shrink:0
</style>