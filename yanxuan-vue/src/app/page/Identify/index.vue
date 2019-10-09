<template>
	<div class="page-wrapper">
		<div class="header"><YanTitle /></div>
		<div class="content">
			<div class="floor1">
				<img src="./images/1.jpeg" alt="">
				<img src="./images/2.jpeg" alt="">
				<img src="./images/3.jpg" alt="">
			</div>
			<img src="./images/4.jpeg" alt="">
			<div class="floor2">
				<div>
						<img src="./images/5.png" alt="">
						<ul>
							<li><img src="./images/6.png" alt=""><p>越南制造 增压节水柔肤花洒</p><em>￥89</em></li>
							<li><img src="./images/7.png" alt=""><p>金属色加厚垃圾袋超值组21卷630只</p><em>￥92.9</em></li>
							<li><img src="./images/8.png" alt=""><p>日本制造 可叠加厨房收纳盒</p><em>￥9.9</em></li>
						</ul>
				</div>
				<span>进入专题</span>
			</div>
			<div class="floor3">
				<div>
					<img src="./images/10.png" alt="">
					<ul>
						<li><img src="./images/11.png" alt=""><p>间隔 1.8米电视机柜  </p><em>￥1619</em></li>
						<li><img src="./images/12.png" alt=""><p>日式和风懒人沙发</p><em>￥599</em></li>
						<li><img src="./images/13.png" alt=""><p>致敬大师 经典艺术装饰画</p><em>￥119</em></li>
					</ul>
				</div>
				<span>进入专题</span>
			</div>
			<div class="floor4">
				<img src="./images/14.jpeg" alt="">
				<img src="./images/15.jpeg" alt="">
				<img src="./images/16.jpeg" alt="">
			</div>
		</div>
		<div class="footer"><YanNav /></div>

	</div>
</template>

<script type="text/ecmascript-6">
	import YanTitle from '../../components/YanTitle';
        import YanNav from '../../components/YanNav';
        export default {
                components: { YanNav, YanTitle },
	        data() {
                        return {
                                arr:[1,2,3],
                        }
	        },
	        beforeCreate() {
                        console.log('beforCreated调用')
	        },
	        created() {
                        console.log('created调用')
	        },
	        updated() {
			this.arr = [1,2,3,4];
                     console.log('update调用')
	        },
	        beforeRouteUpdate(to,from ,next) {
                        console.log('beforeRouterUpdate调用')
		        console.log(to);
                        console.log(from)
		        console.log(next)
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	img
		width:100%
.page-wrapper
	height: 100%
	width: 100%
	display:flex
	flex-direction column
	.header
		height: 0.8rem
		flex-shrink: 0
	.content
		flex-grow: 1
		overflow:auto
		background-color #f4f4f4
		.floor1
			img
				margin-top:-0.1rem
				width:100%
		.floor2
			padding:0 0.1rem
			div
				background-color: #f5b376
				padding:0.1rem 0.15rem
				border-radius:0.1rem
				ul
					display:flex
					justify-content:space-between
					li
						p
							background-color #fff
							padding-left:0.05rem
							box-sizing:border-box
							margin-top:-0.1rem
							white-space: nowrap
							overflow: hidden
							text-overflow: ellipsis
							width:2.26rem
						em
							display:block
							margin-top:-0.05rem
							padding:0.05rem 0
							background-color #fff
							width:2.26rem
							text-align:center
							padding-left:0.05rem
							box-sizing:border-box
							color:#C33328
			span
				display:block
				height:0.6rem
				width:2.7rem
				margin-top:0.2rem
				line-height:0.6rem
				color:#fff
				text-align: center
				margin-left: 50%
				transform translate(-50%)
				background:url('./images/9.png') no-repeat
		.floor3
			padding:0 0.1rem
			margin-top:0.2rem
			div
				background-color: #f5b376
				padding:0.1rem 0.15rem
				border-radius:0.1rem
				ul
					display:flex
					justify-content:space-between
					li
						p
							background-color #fff
							padding-left:0.05rem
							box-sizing:border-box
							margin-top:-0.1rem
							white-space: nowrap
							overflow: hidden
							text-overflow: ellipsis
							width:2.26rem
						em
							display:block
							margin-top:-0.05rem
							padding:0.05rem 0
							background-color #fff
							width:2.26rem
							text-align:center
							padding-left:0.05rem
							box-sizing:border-box
							color:#C33328
			span
				display:block
				height:0.6rem
				width:2.7rem
				margin-top:0.2rem
				line-height:0.6rem
				color:#fff
				text-align: center
				margin-left: 50%
				transform translate(-50%)
				background:url('./images/9.png') no-repeat
		.floor4
			margin-top: 0.2rem
			img
				margin-top:-0.1rem
	.footer
		flex-shrink: 0


</style>