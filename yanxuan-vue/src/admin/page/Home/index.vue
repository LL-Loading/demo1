<template>
	<el-container class="root">
		<el-header height="80px">
			<h1>网易严选后台管理系统</h1>
			<div>
				<span>admin</span>
				<button @click="remove">【退出登录】</button>
			</div>
		</el-header>
		<el-container>
			<el-aside width="248px">
				<el-menu
					:default-active="key"
					@select="handleMenuSelect"
					background-color="#606266"
					text-color="#fff"
					active-text-color="#E6A23C"
				>
					<el-menu-item index="password">
						<i class="el-icon-setting"></i>
						<span>密码修改</span>
					</el-menu-item>
					<el-submenu index="message">
						<template slot="title">
							<i class="el-icon-s-goods"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item index="product">
							<i class="el-icon-s-order"></i>
							<span>商品列表管理</span>
						</el-menu-item>
						<el-menu-item index="category">
							<i class="el-icon-menu"></i>
							<span>商品分类管理</span>
						</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<el-tabs editable type="card" v-model="key" @edit="handleTabRemove">
						<el-tab-pane v-for="item in tabs" :key="item" :label="tabMap[item].label" :name="item">
							<conponent :is="tabMap[item].component"></conponent>
						</el-tab-pane>
					</el-tabs>
				</el-main>
				<el-footer>
					<span>版权所有：啦啦啦</span>
					<span>网址：www.lalala.com</span>
				</el-footer>
			</el-container>
		</el-container>
	</el-container>
</template>

<script type="text/ecmascript-6">
	import Password from '../Password';
	import Category from '../Category';
	import Product from '../Product';
	let name = sessionStorage.getItem('name')
        export default {
                data() {
                        return {
				key:'',
	                        tabs:[],
	                        tabMap:{
				        password:{
				                label:'修改密码',
					        component:Password
				        },
		                        category:{
				                label:'商品分类管理',
			                        component:Category,
		                        },
		                        product:{
				                label:'商品详情管理',
			                        component:Product,
		                        },
	                        }
                        }
                },
	        methods:{
                        handleMenuSelect(key) {
                                if(this.tabs.indexOf(key) === -1 ) this.tabs.push(key)
                                this.key = key
                        },
                        handleTabRemove(key) {
                                let i = this.tabs.indexOf(key);
                                this.tabs.splice(i,1);
                                this.key = this.tabs.length > 0 ? this.tabs[0] : '' ;
                        },
		        remove() {
                                sessionStorage.removeItem('token');
                                sessionStorage.removeItem('name');
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.root
	height: 100%
	width: 100%
	min-width:1200px
	.el-header
		background-color:#909399
		color:#000
		display:flex
		align-items:center
		justify-content:space-between
		h1
			font-size:40px
		div
			display:flex
			flex-direction:column
			span
				margin-left:13px
				margin-bottom:2px
			button
				border:none
				color:#B4282D
				background-color:transparent
	.el-aside
		background-color #545C64
		.el-menu
			border:none
	.el-main
		background-color #EBEEF5
	.el-footer
		background-color #909399
		display:flex
		align-items:center
		span
			margin-right:50px






</style>