<template>
	<div class="page-wrapper">
		<YanPopUp v-show="showRegions">
			<YanRegion  :working="showRegions" @ok="result => { model.receiveAddress = result; showRegions = false }"></YanRegion>
			<p class="back" @click="showRegions = false"></p>
		</YanPopUp>
		<div class="header"><YanTitle /></div>
		<div class="adorn"></div>
		<div class="content address-normal" v-show="!isEdit">
			<ul class="address-wrapper">
				<li v-for="item in list" @click="backOrderConfirm(item.id)">
					<div class='left'>
						<span class='name' v-text="item.receiveName"></span>
						<a class='btn-default ' :class="{default : item.isDefault}" @click.preven="setDefaultHandler(item)" v-text="item.isDefault ? '默认地址' : '设为默认'"></a>
					</div>
					<div class="center" @click.prevent="beginUpdate(false,item)">
						<span class='tel' v-text="item.receiveTel"></span>
						<p class='add'>{{item.receiveAddress}} {{item.receiveAddressDetail}}</p>
					</div>
					<div class='bottom'>
						<i class='delete iconfont icon-delete' @click.prevent="removeHandler(item.id,item.isDefault)"></i>
					</div>
				</li>
			</ul>
			<button class="btn-add" @click="beginUpdate(true)">+ 新建地址</button>
		</div>
			<div class="content address-edit" v-show="isEdit" >
				<form action="" >
					<ul>
						<li><span><label for="a">收货人姓名:</label></span><input id="a" type="text" placeholder="请输入姓名" v-model="model.receiveName"></li>
						<li><span><label for="b">手机号码:</label></span><input id="b"  type="text" placeholder="请输入手机号码" v-model="model.receiveTel"></li>
						<li class="region" @click="showRegions = true"><span><label>所在地区:</label></span><input type="text"  class="receive-address" id="c" v-model="model.receiveAddress">
						<li><span><label for="d">街道地址:</label></span><input id="d"  type="text" placeholder="请输入街道地址" v-model="model.receiveAddressDetail"></li>
					</ul>
				</form>
				<div v-show="isAdd">
					<span><button class="back" @click="back()">返回</button></span>
					<span>
						<button class="add" @click="saveAddress">增加</button>

					</span>
				</div>
				<div v-show="!isAdd">
					<span><button class="back" @click="back()">返回</button></span>
					<span>
						<button class="edit" @click="saveAddress">保存</button>
					</span>
				</div>

			</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import YanRegion from '../../components/YanRegion';
	import YanPopUp from '../../components/YanPopUp';
	import Vue from 'vue';
	import { createNamespacedHelpers } from 'vuex';
	let { mapMutations,mapActions,mapState,mapGetters } =createNamespacedHelpers('address')
	import YanTitle from '../../components/YanTitle';
        export default {
                components:{ YanTitle, YanPopUp, YanRegion },
	        data() {
                        return {
	                        isEdit: false,
	                        isAdd: true,
                                model: { id:0, receiveName:'', receiveTel: '', receiveAddress:'', receiveAddressDetail:'', isDefault:0 },
	                        showRegions:false,
                        }
	        },
	        computed: {
		        ...mapState(['list']),
	        },
	        methods: {
                        ...mapActions(['addressList','setDefault','remove','addAddress','updateAddress']),
                        removeHandler(id,isDefault) {
                                if(this.list.length > 1  && isDefault){
                                        this.$alert('请先取消默认状态再执行操作');
                                        return;
                                }
                                this.$confirm('确认删除此地址吗')
                                        .then(() => this.remove(id))
                                        .then(() => {
                                                this.isEdit = false;
                                                this.$alert('删除成功')
                                        })
                        },
		        beginUpdate(isAdd, model = {}) {
                                if(isAdd ) {
                                        this.model = { id:0, receiveName:'', receiveTel: '', receiveAddress:'', receiveAddressDetail:'', isDefault:0}
                                } else this.model =  Object.assign({} , model);
                                        console.log(123);
                                        this.isEdit = true;

					this.isAdd = isAdd;
		        },
		        saveAddress() {
                                if(this.isAdd){
                                  this.addAddress(this.model).then(() => {
                                          console.log(this.model);
                                          this.isEdit = false;
                                          this.$notice('添加成功')
                                  })
                                } else {
                                        console.log(this.model);
                                        this.updateAddress(this.model).then(() => {
                                                this.isEdit = false;
                                                this.$notice('修改成功')
                                        })
                                }
		        },
		        back() {
                                this.isEdit = false;
		        },
		        setDefaultHandler(item) {
                                console.log(item);
                                if(item.isDefault) return;
                                this.setDefault(item.id);

		        },
                        backOrderConfirm(addressId) {
                                if(this.$route.query.referer) this.$router.replace({ path:'/order', query:{ addressId } })
                        },

	        },
	        created() { this.addressList() }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		display: flex
		flex-direction: column
		height: 100%
		width: 100%
		background-color: #eee
		.header
			flex-shrink: 0
			height: 0.8rem
		.adorn
			height: 0.1rem;
			width: 100%;
			background: url('./bc1.png');
		.content
			display: flex
			flex-direction: column
			.address-wrapper
				flex-grow:1
				overflow:auto
				li
					height: 2rem
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
						margin-right:0.2rem
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
						margin-top: 0.7rem
						margin-left:0.2rem
						width:0.5rem
						flex-shrink: 0
						i
							font-size:0.32rem

			.btn-add
				flex-shrink: 0
				position: absolute
				left:10%
				bottom: 0.2rem
				width:80%
				height: 1rem
				color: #B4282D
				outline: 0
				font-size: 0.36rem
				background-color: #f4f4f4
				border: 1px solid #B4282D
				border-radius: 0.2rem
		.address-edit
			flex-grow: 1
			display: flex
			flex-direction: column
			form
				flex-grow: 1
				ul
					padding: 0 0.2rem
					background-color: #fff
					li
						height: 1rem
						font-size: 0.26rem
						line-height: 1rem
						margin-bottom: -1px
						border-bottom: 1px solid #000
						display: flex
						align-items: center
						span
							width: 1.5rem
							flex-shrink:0
							text-align:center

						input
							flex-grow: 1
							height: 0.9rem
							border: none
							padding-left:0.2rem
							outline: none
							font-size: 0.3rem
			div
				flex-shrink: 0
				display:flex
				height:1rem
				span
					flex-grow:1
					button
						width: 100%
						height:100%
						font-size:0.32rem
						border: 0
						outline:0
						&.add
							background-color:#B4282D
							color:#fff
						&.edit
							background-color:#B4282D
							color:#fff





	p.back
		position absolute
		right: 0.2rem
		background-color transparent;
		top:3%
		width: 0.9rem
		height:0.4rem
</style>