<template>
	<div class="page-wrapper">
		<div class="search-wrapper">
			<el-form inline>
				<el-form-item label="商品名称">
					<el-input v-model="search.name"></el-input>
				</el-form-item>
				<el-form-item label="商品分类">
					<el-select v-model="search.mId">
						<el-option :value="0" label="-请选择-" ></el-option>
						<el-option v-for="item in mainList" :value="item.id" :kry="item.id" :label="item.name"></el-option>
					</el-select>
					-
					<el-select v-model="search.sId">
						<el-option :value="0" label="-请选择-"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item >
					<el-button>取消</el-button>
					<el-button type="primary">新增</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import { mapActions } from 'vuex';
export default {
        data() {
                return {
                        search:{ name:'', mId:0, sId:0 },
	                mainList:[],
	                subList:[],
                }
        },
	watch:{},
	methods:{
		...mapActions('category',['getData'])
	},
	created() {
                this.getData(0).then(data => this.mainList = data)
		this.getData().then(data => this.subList = data)
	}
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>