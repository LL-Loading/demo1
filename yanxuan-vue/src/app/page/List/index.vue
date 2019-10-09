<template>
	<div class="page-wrapper">
		<div class="header"><YanTitle /></div>
		<div class="sub-list">
			<ul>
				<li v-for="item in subList">
					<router-link :to="`/list/${mId}/${item.id}`" v-text="item.name">
					</router-link>
				</li>
			</ul>
		</div>
		<div class="content"  ref="scroll">
			<div class="scroll" >
				<ul>
					<li v-for="item in productList" :key="item.id">
						<router-link :to='`/detail/${item.id}`'>
							<img :src="item.avatar" />
							<p class='details'>{{ item.details }}</p>
							<h3 class='name' v-text="item.name"></h3>
							<em class='newprice'>￥{{item.newprice }}</em><em class='price'>{{ item.price }}</em><br>
							<span v-text="item.sale" class='sale' v-show="item.sale.length > 0"></span>
							<span class='rest' v-text="item.rest " v-show="item.rest.length > 0"></span>
						</router-link>
					</li>
				</ul>
				<div class="info">
					<i v-if="isLoading" class="loading"></i>
					<i v-else-if="(!hasMore) && productList.length>0" class="iconfont icon-bottom"></i>
					<i v-else-if="(!hasMore) && productList.length ===0"></i>
					<p v-text="tipText"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import IScroll from 'iscroll';
import imagesLoaded from 'imagesloaded';
import Vue from 'vue';
import YanTitle from '../../components/YanTitle';
import { mapGetters, mapState,mapActions, mapMutations } from 'vuex';
        export default {
                components:{ YanTitle },
                data() {
                        return {
                                mId:0,
	                        sId:0,
	                        name:'',
	                        count:6,
                                isLoading: false,                          //是否正在请求商品数据
                                hasMore: true,                            //是否还有更多的商品可供加载
                                isTriggerLoadMore: false,          //标识是否触发了加载更多
                                showRocket: false,                             //是否返回顶部
                        }
                },
	        computed:{
		        ...mapState('product', {productList: 'list'}),
		        ...mapGetters('category', ['subList']),
                        tipText() {
                                if(this.isLoading) return '加载中..';
                                if(!this.hasMore) return this.productList.length > 0 ?  '已到达底部..' : '暂无相关商品,敬请期待..';
                                return '上拉加载..';
                        }
	        },
	        methods:{
		        ...mapActions('category',['init', 'toggleId']),
		        ...mapActions('product',['getData']),
                        _getAjaxParams(loadMore) {
                                return {
                                        cid: this.sId,
                                        name: this.name,
                                        start: loadMore ? this.productList.length : 0,
                                        count: this.count,
                                };
                        },
                        _getProductData(loadMore = false) {
                                if(!loadMore) this.showRocket = false;                //每次请求数据（不是加载更多），都要把返回顶部隐藏
                                this.isLoading = true;
                                //setTimeout(() => {
                                this.getData(this._getAjaxParams(loadMore))                              //通知仓库请求商品数据
                                        .then(length => {
                                                this.isLoading = false;
                                                this.hasMore = length === this.count ? true : false;
                                        });
                                //}, 1000)
                        },
                        //创建更新滚动对象
                        _initOrRefreshScroll() {
                                imagesLoaded(this.$refs.scroll, () => {
                                        this.$nextTick(() => {
                                                if(this.scroll) this.scroll.refresh();
                                                else {
                                                        this.scroll = new IScroll(this.$refs.scroll, {
                                                                click: true,
                                                                //bounce: false,                      //关闭边界回弹，因为惯性滚动会触发边界回弹影响用户体验
                                                                deceleration: 0.003,            //滚动阻尼系数，值越大惯性滚动越大，惯性滚的距离越短（值小于0.01，默认0.0006）
                                                                probeType: 2                   //不管是触摸滚动还是触摸导致的惯性滚动都出发scroll事件
                                                        });
                                                        this.scroll.on('scroll', () => {
//                                                                console.log(this.scroll.maxScrollY, this.scroll.y);
                                                                if(this.hasMore && (!this.isLoading) && !this.isTriggerLoadMore)
                                                                        this.isTriggerLoadMore = this.scroll.y < 0 && this.scroll.maxScrollY === this.scroll.y;
//					                        if(this.scroll.y < 0 && this.scroll.maxScrollY - this.scroll.y >50) this.isTriggerLoadMore = true;
//					                        else this.isTriggerLoadMore = false;
                                                        });
                                                        this.scroll.on('scrollEnd', () => {
                                                                if(this.scroll.y === 0) this.showRocket = false;
                                                                if(this.scroll.y < 0 && !this.showRocket) this.showRocket = true;
                                                                if(this.isTriggerLoadMore = true) {
                                                                        this.isTriggerLoadMore = false;
                                                                        this._getProductData(true);
                                                                }
                                                        });
                                                }
                                        });
                                });
                        },

	        },
	        watch:{
                        sId(newValue, oldValue) {
                                if(this.isLoading) {
                                        alert('您的操作太频繁了...');
                                        return;
                                }
                                this.hasMore = true;
                                this._getProductData()
                        },
                        productList: function(newValue, oldValue) {
                                this.$nextTick(() => this._initOrRefreshScroll());
                        },
	        },
	        created() {
                        this.init().then(() => this.toggleId(parseInt(this.$route.params.mId)));
	        },
	        activated() {
                        this.mId = parseInt(this.$route.params.mId);
                        this.sId = parseInt(this.$route.params.sId);

	        },
	        updated() {
                        this._initOrRefreshScroll();
	        },
	        beforeRouteUpdate(to, from, next) {
                        console.log(to)
		        console.log(from)
                        if(this.isLoading) {
                                this.$notice('您的操作太频繁了');
                                return
                        }
                        if(to.params.sId !== from.params.sId) { 			//自己判断变没变
                                this.sId = parseInt(to.params.sId);
                                next();
                        }

	        },
                destroyed: function() {
                        if(this.scroll) this.scroll;
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction column
		height: 100%
		.header
			flex-shrink:0
			height:0.8rem
		.sub-list
			flex-shrink: 0
			height: 0.6rem
			padding:0 0.2rem
			background-color: #fff
			ul
				display: flex
				overflow: auto
				li
					flex-shrink: 0
					padding: 0.2 1rem
					margin-right: 0.3rem
					line-height: 0.6rem
					a
						padding:0.1rem
						color:#333
						border-bottom: 3px solid transparent
					a.router-link-active
						color: red
						border-bottom: 3px solid #B4282D
		.content
			flex-grow:1
			overflow: hidden
			touch-action:pan-y
			.scroll
				padding: 0.22rem 0.22rem 0
				overflow:hidden
				ul
					display: flex
					justify-content: space-between
					flex-wrap: wrap
					padding-bottom: 0.5rem
					li
						width: 49%
						border: 1px solid #f9f9f9
						position: relative
						margin-bottom: 0.3rem
						&>*
							white-space: nowrap
							overflow: hidden
							text-overflow: ellipsis
							img
								width: 100%
								background-color: #f4f4f4
							p
								position: absolute
								left: 0
								top: 65%
								background-color: #F1ECE2
								color: #9F8A60
								width: 100%
								height:0.4rem
								line-height:0.4rem
								white-space: nowrap
								overflow: hidden
								text-overflow: ellipsis
							h3
								margin-top: 0.4rem
								color: #333
								font-style: normal
								white-space: nowrap
								overflow: hidden
								text-overflow: ellipsis
								font-weight: 600
							em
								font-style: normal
								display: inline-block
								margin: 0.1rem 0
								font-size: 0.28rem
							em.newprice
								color: #b4282d
								margin-right: 0.2rem
							em.price
								color: #999
								font-size:0.24rem
								text-decoration: line-through
							span
								margin-top: 0.3rem
							span.sale
								color: #ce2424
								padding: 0 0.1rem
								border-radius: 0.2rem
								border: 1px solid #ce2424
								margin-right: 0.2rem
							span.rest
								color: #ce2424
								padding: 0 0.1rem
								border-radius: 0.2rem
								border: 1px solid #ce2424
			.info
				height: 1rem
				display: flex
				justify-content: center
				align-items: center
				color: #666
				i
					font-size: 0.24rem
					margin-right: 0.1rem
					&.loading
						background-image: url(./loading.gif)
						width: 0.3rem
						height: 0.3rem
						background-position: center center
						background-size: 130% 130%
</style>