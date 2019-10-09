<template>
	<div class="page-wrapper">
		<YanPopUp :is-show="isShow" @close="isShow = false">
			<div class="select">
				<div class="top">
					<img class="avatar" :src="model.avatar" alt="">
					<div class="right"><span class="price">价格: ￥{{ model.newprice }}</span> <span>请选择规格</span></div>
					<div class="delete iconfont icon-baseline-close-px" ></div>
				</div>
				<div>规格</div>
				<div class="bottom"><YanCount :count="count" :decrease="() => count = count -1 "  :increase="() => count = count + 1" /></div>

				<button class="btn-add-cart" @click="buy">确定</button>
			</div>
		</YanPopUp>
		<div class="header"><YanTitle /></div>
		<div class="content">
			<div class="banner" ref="banner">
				<ul v-if="banner.length > 0" :style="{width: (banner.length + 2) + '00%'}">
					<li><img :src="banner[banner.length-1]" alt=""></li>
					<li v-for="( item,i ) in banner" :key="i">
						<img :src="item" alt="">
					</li>
					<li><img :src="banner[0]" alt=""></li>
				</ul>
			</div>
			<span class="hint">{{bannerIndex}} / {{banner.length}}</span>
			<div class="key">
				<em class="price">￥{{ model.newprice }}</em>
				<h2 class="name">{{ model.name }}</h2>
				<span class="sale">{{ model.sale }} <i class="iconfont icon-right"></i> </span>
			</div>
			<div class="sort">
				<ul>
					<li><span>购物返：</span><em></em></li>
					<li><span>限制：</span><em>特价商品不可与优惠券叠加使用</em></li>
					<li><span>配送：</span><router-link to="/order" class="iconfont icon-right"></router-link></li>
					<li><span>服务：</span>支持30天无忧退换货  48小时快速退款</li>
				</ul>
			</div>
			<div class="deploy">
				<h2>商品参数</h2>
				<ul>
					<li><span>品名：</span><em v-text="model.name"></em></li>
					<li><span>产地：</span><em>山东青岛</em></li>
					<li><span>材料：</span><em v-text="model.materials"></em></li>
					<li><span>适用人群：</span><em>大众</em></li>
				</ul>
			</div>

		</div>
		<div class="footer">
			<router-link to="/cart"><span class="iconfont icon-cart"><em v-if="cartCount > 0" v-text="cartCount"></em></span></router-link>
			<button class="btn-buy">立即购买</button>
			<button class="btn-cart" @click="isShow = true">加入购物车</button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import IScroll from 'iscroll';
	import API from '../../util/api.js';
	import imagesLoaded from 'imagesloaded';
	import YanCount from '../../components/YanCount';
	import YanPopUp from '../../components/YanPopUp';
	import YanTitle from '../../components/YanTitle';
	import { mapState, mapActions,  mapGetters, mapMutations } from 'vuex';
        export default {
                components:{ YanTitle, YanPopUp, YanCount },
	        data() {
			return {
			        id:0,
				model:{},
				bannerIndex:1,
                                count: 1,
				isShow:false,
				cartCount:0,
			}
	        },
                computed: {
                        banner() { return this.model.banner ? this.model.banner.split(',') : []; }
                },
                methods:{
                        ...mapActions('product',['getItem']),
                        _initBannerScroll() {
                                this.$nextTick(() => {                                                  //保证banner对应的html元素更新完毕
                                        imagesLoaded(this.$refs.banner, () => {           //保证iscroll区域所有图片加载完毕
                                                this.$nextTick(() => {                                  //保证了iscroll区域所有样式渲染完毕
                                                        this.bannerScroll = new IScroll(this.$refs.banner, {
                                                                scrollY: false,                                  // 关闭纵向滚动
                                                                scrollX: true,
                                                                click:true,                                        // 开启横向滚动
                                                                momentum: false,                          // 关闭惯性滚动
                                                                snap: true                                       // 开启轮播图模式滚动
                                                        });
                                                        this.bannerScroll.on('scrollStart', () => {
                                                                clearTimeout(this.timer);                      // 停止自动播放
                                                        });
                                                        this.bannerScroll.on('scrollEnd', () => {
                                                                // 调整整个滚动的位置，以实现无缝滚动
                                                                let len = this.banner.length + 2 ;
                                                                if(this.bannerScroll.currentPage.pageX === 0) {
                                                                        this.bannerScroll.disable();     // 调整期间，不允许滚动
                                                                        setTimeout(() => {
                                                                                this.bannerScroll.goToPage(len - 2, 0, 0);
                                                                                this.bannerScroll.enable();  // 调整结束，恢复滚动
                                                                        }, 10);
                                                                }
                                                                if(this.bannerScroll.currentPage.pageX === len - 1) {
                                                                        this.bannerScroll.disable();     // 调整期间，不允许滚动
                                                                        setTimeout(() => {
                                                                                this.bannerScroll.goToPage(1, 0, 0);
                                                                                this.bannerScroll.enable();  // 调整结束，恢复滚动
                                                                        }, 10);
                                                                }
                                                                let curPage = this.bannerScroll.currentPage.pageX;
                                                                if(curPage === 0) this.bannerIndex= len - 2;
                                                                else if(curPage === len - 1) this.bannerIndex = 1;
                                                                else this.bannerIndex = curPage;
                                                                this.timer = setTimeout(() => this.bannerScroll.next(),3000);                         // 再次开启自动播放
                                                        });
                                                        this.bannerScroll.goToPage(1,0,0);       // 初始化显示第二页(第一张图片)
                                                        this.bannerIndex = 1 ;                            //记录更新当前是第几张
                                                        this.timer = setTimeout(() => this.bannerScroll.next(),3000);           //开始自动播放
                                                });
                                        });
                                });
                        },
	                buy(){
				API.cart.product(this.id, this.count)
					.then(data => {
                                                this.isShow = false;
                                                if(data !== '') this.$notice(data);
                                                else {
                                                        this.$notice('加入购物车成功');
                                                        this.cartCount = this.cartCount + this.count;
                                                        this.count = 1;
                                                }
					})
	                },
                        _updateCartCount() {
                                if(sessionStorage.getItem('token')){ API.cart.getCount().then(data => this.cartCount = data);}
                                else this.cartCount = 0;
                        },
	                close() {
	                        this.isShow = false
	                },
                },
                watch:{
                        id(newValue,oldValue) {
                                this.getItem(newValue)
                                        .then(data => this.model = data)
                        },
                        banner(newValue) {
                                if(newValue.length === 0 ) return;
                                this._initBannerScroll();
                        },
                },
                created() {
                        this.id = parseInt(this.$route.params.id);
                        this._updateCartCount();
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.select
		background-color: #fff
		padding: 0.2rem
		div.top
			display: flex
			margin-top:0.2rem
			.avatar
				height: 2.5rem
				flex-shrink: 0
			.delete
				font-size:0.4rem
			.right
				margin-left: 0.2rem
				flex-grow: 1
				display: flex
				flex-direction: column
				font-size: 0.32rem
				span:first-child
					color: #B4282D
					margin-bottom: 1rem
					margin-top: 0.2rem
		.bottom
			margin-top: 0.2rem
			.iconfont
				font-size: 0.32rem
			.count
				padding: 0.05rem 0.2rem
				background-color: #666
				margin: 0 0.2rem
				color: #fff
		.btn-add-cart
			width: 80%
			border:none
			outline:none
			margin:0.5rem 10%
			height: 0.8rem
			background-color: #B4282D
			font-size: 0.32rem
			color: #fff
	.page-wrapper
		display: flex
		flex-direction: column
		height: 100%
		width: 100%
		.header
			flex-shrink: 0;
			font-size: 0;
			height: 0.8rem;
		.content
			flex-grow: 1
			overflow:auto
			position relative
			&>*
				padding: 0 0.2rem
			.banner
				overflow: hidden
				padding: 0
				margin-bottom: 0.3rem
				touch-action: pan-x
				position: relative
				height:7.5rem
				ul
					display: flex
					li
						flex-grow: 1
						font-size: 0
			.hint
				position: absolute
				top: 50%
				right: 10%
				background-color: rgba(0, 0, 0, 0.4)
				padding: 0.1rem 0.2rem
				border-radius: 0.1rem
				color: white
			div.key
				margin-top: 0.2rem
				.price
					font-size: 0.46rem
					color: #B4282d
				.name
					margin:0.1rem 0
				.sale
					border:1px solid #B4282D
					padding:0.05rem 0.2rem
					i
						color:#B4282D
			div.sort
				margin:0.2rem 0
				ul
					li
						font-size:0.32rem
						height:1rem
						border-bottom:1px solid #ccc
						line-height:1rem
						em
							text-align:center
			div.deploy
				margin-bottom: 0.2rem
				ul
					li
						line-height:1rem
						font-size:0.32rem
						border-bottom:2px  dashed #ccc
		.footer
			flex-shrink: 0
			border-top:1px solid #666
			height: 1rem
			background-color: #fff
			display: flex
			align-items: center
			a
				position:relative
				span
					flex-shrink: 0
					padding: 0 0.6rem
					font-size: 0.5rem
					color: #000
					em
						position:absolute
						right:0.2rem
						top:-0.2rem
						color: #fff
						text-align:center
						line-height:0.5rem
						font-size:0.26rem
						display:block
						width: 0.5rem
						height: 0.5rem
						border-radius:50%
						background-color #B4282D
			button
				font-size: 0.32rem
				border: 0
				outline: 0
			.btn-buy
				flex-grow: 1
				height: 100%
				border-left: 1px solid #666
				background-color: #fff
			.btn-cart
				flex-grow: 1
				height: 100%
				color: white
				background-color: #B4282D

</style>