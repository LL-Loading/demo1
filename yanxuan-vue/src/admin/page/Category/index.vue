<template>
	<div class="page-wrapper">
		<el-tree :props="{isLeaf:'leaf'}" lazy :load="loadNode" :expand-on-click-node="false" ref="tree">
			<span class="icon" slot-scope="{ node,data }">
				<span v-text="data.name"></span>
				<span  >
					<el-button type="text" v-if="node.level <  3" @click="beginEdit(data,true)"><i class="el-icon-plus"></i></el-button>
					<template v-if="node.level > 1">
						<el-button type="text"><i class="el-icon-delete"></i></el-button>
						<el-button type="text" @click="beginEdit(data,false)"><i class="el-icon-edit-outline"></i></el-button>
						<el-popover trigger="hover" placement="right" :title="data.name" width="200">
							<el-image :src="data.avatar" fit="contain"></el-image>
							<el-button type="text" slot="reference" ><i class="el-icon-picture"></i></el-button>
						</el-popover>
					</template>
				</span>
			</span>
		</el-tree>
		<el-dialog :visible="isEdit" :title="`商品分类管理- ${ isAdd ? '新增' : '修改' }`" :show-close="false" height="500px">
			<el-form label-width="100px" ref="form">
				<el-form-item label="父级分类：">
					<el-select v-model="model.fid" :disabled="isAdd || model.fid ===  0 ">
						<el-option label="ROOT" :value="0"></el-option>
						<el-option v-for="item in mainList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名字：" prop="name">
					<el-input v-model="model.name" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="分类图片" prop="avatar"  class="img">
					<div class="avatar-wrapper">
						<div class="old-avatar-wrapper" v-show="!isAdd">
							<el-image :src="oldAvatar"></el-image>
							<p>原图片</p>
						</div>
					</div>
					<el-upload
						list-type="picture-card"
						accept=".jpg,.png"
						name="avatar"
						:before-upload="beforeAvatarUpload"
						action="/category/upload"
						:on-success="uploadSuccessHandler"
						ref="upload"
						:on-remove="uploadRemoveHandler"
					><i class="el-icon-plus"></i><div slot="tip">只能上传JPG| PNG格式的图片</div></el-upload>
				</el-form-item>

			</el-form>
			<span slot="footer">
				<el-button @click="cancelEdit">取消</el-button>
				<el-button type="primary" @click="save">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import { createNamespacedHelpers } from 'vuex';
	const { mapActions, mapGetters } = createNamespacedHelpers('category')
       export default {
	        data() {
	                return {
	                        isEdit:false,
		                isAdd:true,
		                oldAvatar:'',
		                model:{ id:0, fid:-1, name:'', avatar:'' },
                                rules:{
                                        name:[
                                                { required:true, trigger:'blur', message:'分类名不能为空'},
                                                { main:2, max:6 , trigger:'blur', message:'分类名长度必须为2-6个字符之间'}
                                        ],
                                        avatar:[
                                                // { required:true, trigger:'blur', message:'必须要选择一张图片'},
                                        ]
                                },
	                }
	        },
	       computed:{
		       ...mapGetters(['mainList']),
	       },
	       methods:{
		       ...mapActions(['getData','addCategory', 'updateCategory',]),
		       loadNode(node,resolve) {
				switch(node.level) {
					case 0 :
					        resolve([{ id:0,name:'ROOT' }]);
					        break;
					case 1:
					        this.getData(node.data.id).then(data => resolve(data));
					        break;
					case 2:
					        this.getData(node.data.id).then(data => resolve(data));
					        data.forEach(item => item.leaf = true)
					        break;
				}
		       },
		       beginEdit(data, isAdd) {
		               this.isAdd = isAdd;

		               this.model.id = isAdd ? 0 : data.id;
				this.model.fid = isAdd ? data.id : data.fid;
				this.model.name = isAdd ? '' : data.name;
                               this.model.avatar = '';
				this.oldAvatar = isAdd ? '' : data.avatar;

		               this.isEdit = true;
                               if(this.$refs.upload) this.$refs.upload.clearFiles();           //重置upload
                               if(this.$refs.form) this.$refs.form.clearValidate();            //重置form
		       },
                       cancelEdit() {
		               this.$confirm('确定退出编辑吗？','警告', { type:'warning' })
			               .then(() => this.isEdit = false)
			               .catch(() => {});
                       },
                       beforeAvatarUpload(file) {
                               const isJPG = file.type === 'image/jpeg';
                               const isPNG = file.type === 'image/png';
                               const isLt2M = file.size / 1024 / 1024 < 2;

                               if ((!isJPG) && (!isPNG)) {
                                       this.$message.error('上传图片只能是 JPG 格式或PNG格式!');
                               }
                               if (!isLt2M) {
                                       this.$message.error('上传图片大小不能超过 2MB!');
                               }
                               return (isJPG || isPNG) && isLt2M;
                       },
                       uploadSuccessHandler(response, file, fileList) {
                               if(response.status === 200 ) {
                                       this.model.avatar = response.data;
                                       if(fileList.length > 1 ) fileList.splice(0,1)
                               }
                       },
                       uploadRemoveHandler(file,fileList) {
                               this.model.avatar = '';
                               fileList.shift();
                       },
                       save() {
                                               if(this.isAdd) this._addCategory();
                                               else this._updateCategory();

                       },
                       _addCategory() {
                               if(this.model.avatar === '' ){
                                       this.$message({ message:'请至少选择一张图片', type:'warning' });
                                       return;
                               }
                               this.addCategory(this.model)
                                       .then(id => {
                                               this.isEdit = false;
                                               let parentNode = this.$refs.tree.getNode(this.model.fid);
                                               let newNodeData = Object.assign(
                                                       {},
                                                       this.model,
                                                       {id, leaf:this.model.fid !== 0 , avatar:'/images/category/' + this.model.avatar} );
                                               this.$refs.tree.append(newNodeData, parentNode);
                                       });
                       },
                       _updateCategory() {
                               this.updateCategory({ ...this.model,oldAvatar:this.oldAvatar })
                                       .then(data =>{
                                               let node = this.$refs.tree.getNode(data.id);
                                               if(node.data.fid === data.fid) {
                                                       node.data.name = data.name;
                                                       node.data.avatar = data.avatar;
                                               } else if( this.list.findIndex(item => item.id === data.id) === -1) {
                                                       this.$refs.tree.remove(node);
                                               } else {
                                                       let parentNode = this.$refs.tree.getNode(data.fid);
                                                       this.$refs.tree.remove(node);
                                                       this.$refs.tree.append({ ...data, leaf:true }, parentNode);
                                               }
                                       });
                               this.isEdit = false;
                       },
	       },
	       created() { this.getData(0); }
       };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width:500px
		.icon
			margin-right:10px
			flex-grow:1
			display:flex
			justify-content space-between
			align-items:center
			.el-icon-picture
				margin-left:10px
		.el-dialog
			.el-input
				width: 220px
			.avatar-wrapper
				display:flex
				align-items:flex-start
				.old-avatar-wrapper
					width: 148px
					flex-shrink: 0
					margin-right: 10px
					.el-image
						height:148px
						border:1px dashed #409eff
						box-sizing: border-box
						border-radius:6px
					p
						height:20px
						line-height:20px
						margin-top:-8px
						color:#409eff
				.upload-tip
					color:red
</style>