<template>
	<div class="password">
		<el-dialog width="500px" :visible="true" :show-close="true" :modal="false" :center="true">
			<div slot="title" >
				<h1>网易严选后台管理登录</h1>
			</div>
			<el-form label-width="80px" :rules="rules" :model="model"  ref="form"  :status-icon="true">
				<el-form-item label="用户名：" prop="name">
					<el-input placeholder="请输入用户名" v-model="model.name" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<el-form-item label="密码：" prop="pwd">
					<el-input type="password" v-model="model.pwd" placeholder="请输入密码" prefix-icon="el-icon-lock"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer">
				<el-button size="medium" round @click="$refs.form.resetFields()">取消</el-button>
				<el-button type="primary" size="medium" round @click="login">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
        export default {
                data() {
                        return {
                                model:{ name:'', pwd:'', },
				rules:{
                                        name:[
	                                        { required:true, trigger:'blur', message:'用户名不能为空哦' },
	                                        { min:3, max:6, trigger:'blur', message:'用户名长度为3-6个字符之间' }
                                        ],
					pwd:[
						{ required:true, trigger:'blur', message:'密码不能为空哦' },
                                                { min:3, max:6, trigger:'blur', message:'密码长度为3-6个字符之间' }
					],
				}
                        }
                },
	        methods:{
                        login() {
                                console.log(this.model);
                                this.$refs.form.validate()
	                                .then(() => API.user.admin(this.model))
                                        .then(token=>{
                                                sessionStorage.setItem('token',token);
                                                sessionStorage.setItem('name',this.model.name);
                                                this.$router.replace('/home')
                                        })
                                        .catch(() => {})
                        }
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.password
	height:100%
	width: 100%
	background:url(./preview.jpg)
	background-size:cover
</style>