<template>
	<el-form  :rules="rules" :model="model" :status-icon="true" ref="form" >
		<el-form-item label="初始密码" prop="oldPwd">
			<el-input type="password" v-model="model.oldPwd"></el-input>
		</el-form-item>
		<el-form-item label="新密码" prop="newPwd">
			<el-input type="password" v-model="model.newPwd"></el-input>
		</el-form-item>
		<el-form-item label="确认新密码" prop="checkPwd">
			<el-input type="password" v-model="model.checkPwd"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button @click="reset">取消</el-button>
			<el-button type="primary" @click="changePwd">确定</el-button>
		</el-form-item>
	</el-form>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
        export default {
                data() {
                        return {
				model:{ oldPwd:'', newPwd:'', checkPwd:'', },
				rules:{
				        oldPwd:[
                                                { required:true,trigger:'blur', message:'原始密码不能为空' },
                                                { min:4, max:10, trigger:'blur', message:'原始密码长度为4-10' }
				        ],
					newPwd:[
                                                { validator:this.validatorPass1, trigger:'blur' }
                                        ],
                                        checkPwd:[
                                                { validator:this.validatorPass2, trigger:'blur' }
                                        ],
				}
                        }
                },
                methods:{
                        validatorPass1(rule, value, callback) {
                                if(value === '') callback(new Error('新密码不能为空'));
                                else if(value.length<4 || value.length>10) callback(new Error('密码长度为4-10位字符'));
                                else if( this.model.checkPwd !== '' ) {
                                        this.$refs.form.validateField('checkPwd');
                                        callback();
                                }
                                else callback();
                        },
                        validatorPass2(rule, value, callback) {
                                if(value === '') callback(new Error('新密码不能为空'));
                                else if(value.length<4 || value.length>10) callback(new Error('密码长度为4-10位字符'));
                                else if( this.model.newPwd !== this.model.checkPwd ) callback(new Error('两次密码输入不一致哦'));
                                else callback();
                        },
                        changePwd() {
                                this.$refs.form.validate()
                                        .then(() => {
                                                API.user.changePwd(this.model).then(() => this.$refs.form.resetFields())
                                        })
                                        .catch(() => {})

                        },
	                reset() {
                                this.$refs.form.resetFields();
	                },
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.el-form
	width:300px
</style>