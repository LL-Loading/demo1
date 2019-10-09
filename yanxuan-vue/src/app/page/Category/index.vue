<template>
	<div class="page-wrapper">
		<div class="header"><YanTitle></YanTitle></div>
		<div class="content">
			<div class="left">
				<ul>
					<li
						v-for="item in mainList"
						:key="item.id"
						:class="{ active : activeId === item.id }"
						@click="toggleId(item.id)"
						:data-id="item.id"
					>
						<span v-text="item.name"></span>
					</li>
				</ul>
			</div>
			<div class="right">
				<img :src="avatar" alt="">
				<ul v-if="subList.length > 0">
					<li v-for="item in subList" >
						<router-link :to="`/list/${ activeId }/${ item.id }`">
							<img :src="item.avatar" alt="">
							<span v-text="item.name"></span>
						</router-link>
					</li>
				</ul>
				<p v-else>此分类暂时没有商品，多多关注这里哦...</p>
			</div>
		</div>
		<div class="footer"><YanNav /></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import YanTitle from '../../components/YanTitle';
        import { createNamespacedHelpers } from 'vuex';
        import YanNav from '../../components/YanNav';

        let { mapState, mapActions,  mapGetters, mapMutations } =createNamespacedHelpers('category');
        export default {
                components: {YanNav, YanTitle},

                computed: {
                        ...mapState(['list', 'activeId']),
                        ...mapGetters(['subList']),
                        mainList: function(){ return this.list.filter(item => item.fid === 0); },
                        avatar: function(){ return this.activeId === 0?'':this.list.find(item => item.id === this.activeId).avatar;}
                },
                methods: mapActions(['init', 'toggleId']),
                created: function() {  this.init().then(data => this.toggleId(data[0].id)) }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		height: 100%
		display: flex
		flex-direction: column
		.header
			flex-shrink: 0
			height: 0.8rem
		.content
			flex-grow: 1
			border-top:2px solid #ccc
			border-bottom: 2px solid #ccc
			overflow: hidden
			display: flex
			.left
				width: 1.7rem
				height: 100%
				flex-shrink: 0
				border-right: 2px solid #ccc
				overflow:auto
				ul
					display: flex
					flex-direction: column
					overflow: hidden
					li
						flex-grow: 1
						padding: 0.3rem 0
						&.active>span
							border-left: 5px solid red
							color: #ab2b2b
						span
							font-size: 0.32rem
							height: 0.4rem
							text-align: center
							line-height: 0.4rem
							display: block
			.right
				padding: 0.2rem 0.3rem 0
				flex-grow: 1
				height: 100%
				img
					width: 100%
				ul
					display: flex
					flex-wrap: wrap
					li
						width: 33%
						margin-bottom: 0.2rem
						padding-right: 0.2rem
						box-sizing: border-box
						a
							display: flex
							flex-direction: column
							text-align: center
							color: black
							img
								height: 1.54rem
								width: 100%
							span
								font-size: 0.28rem
				p
					text-align center
					margin-top: 0.2rem
					font-size: 0.3rem
	.footer
			flex-shrink: 0
			height: 1rem
</style>