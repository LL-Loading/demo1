<template>
	<div class="mi-region">
		<div class="wrapper"><span v-text="result"></span> <span  ><i class="reset" @click="reset()">重置</i><i class="back" @click="" >关闭</i></span></div>
		<!--省级列表-->
		<ul v-show="stage === 1">
			<li v-for="(item,i) in provinces" v-text="item" :key="i" @click="region.province = item; result = item; stage = 2"></li>
		</ul>
		<!--市列表-->
		<ul v-show="stage === 2">
			<li v-for="(item,i) in cities" v-text="item" :key="i" @click="region.city = item; result = result + ' - ' + item; stage = 3"></li>
		</ul>
		<!--区列表-->
		<ul v-show="stage === 3">
			<li v-for="(item,i) in areas" v-text="item" :key="i" @click="region.area = item;result = result + ' - ' + item; stage = 4"></li>
		</ul>
		<!--街道-->
		<ul v-show="stage === 4">
			<li v-for="(item,i) in streets" v-text="item" :key="i"  @click="region.street = item; result = result + ' - ' + item; $emit('ok', result)"></li>
		</ul>
	</div>
</template>

<script type="text/ecmascript-6">
	import regions from './regions.js';
        export default {
                props:[ 'working', ],
                data() {
                        return {
                                regions,
	                        region: { province:'', city:'',area:'', street:'' },
	                        stage: 1,                               //表示当前处于地址选择的哪个阶段，1表示省，2表示市，3表示区，4表示街道
	                        result:'-请选择-',                              //P标签显示的文本
                        }
                },
	        computed:{
                        //所有省
                        provinces() { return this.regions.map(item => item.name) },
                        province() { return this.regions.find(item => item.name === this.region.province) },
                        //所有市
		        cities() { return this.province ? this.province.childs.map(item => item.name) : []; },
		        city() { return this.province ? this.province.childs.find(item => item.name === this.region.city) : null ;},
		        //所有区
		        areas() { return this.city ? this.city.childs.map(item => item.name)  : []; },
		        area() { return this.city ? this.city.childs.find(item => item.name === this.region.area) : null; },
		        //所有街道
		        streets() { return this.area ? this.area.childs.map(item => item.name) : []; },
                },
		watch:{
                        'region.province': function(newValue, oldValue) { return this.region.city = this.province.childs[0].name },
                        'region.city': function(newValue, oldValue) { return this.region.area = this.city.childs[0].name },
                        'region.area': function(newValue, oldValue) { return this.region.street = this.area.childs[0].name },
			working(newValue, oldValue) { if(!newValue) this.reset() },
		},
	        created() {
                        this.region.province = this.regions[0].name;

	        },
	        methods:{
                        reset() {
				this.stage = 1;
				this.region.province = this.regions[0].name;
				this.result='-请选择-';
		        }
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.mi-region
	div.wrapper
		color: #bf1111
		padding:0 0.2rem
		height: 0.8rem
		line-height: 0.8rem
		display:flex
		justify-content space-between
		span
			i
				font-style:normal
				padding:0 0.2rem
				&.reset
					border:1px solid #409EFF
					color:#409EFF
				&.back
					border:1px solid #F56C6C
					color:#F56C6C
					margin-left:0.2rem
	ul
		border-top:1px solid #b0b0b0
		overflow:auto
		height:4.8rem
		li
			box-sizing:border-box
			height:1rem
			line-height: 1rem
			padding:0 0.2rem
			font-size:0.26rem
			border-bottom: 1px solid #b0b0b0
</style>