<template>
	<div class="phone-wrapper">
		<div class="phone">
			<Input type="text" placeholder="请输入手机号码" @change="value => phone = value"/>
			<Input class="psd" type="password" placeholder="请输入验证码" @change="value => code = value"/>
			<button @click="getCode" v-text="haveCode === 0 ? '获取验证码' : haveCode "></button>
		</div>
		<router-link to="/register">忘记密码？</router-link>
		<router-link to="/register" class="register">立即注册</router-link>
		<Button :click="login">立即登录</Button>
	</div>
</template>

<script type="text/ecmascript-6">
	import Button from './Button.vue';
	import Input from './Input.vue';
	import API from '../../util/api.js';
        export default {
                components:{Input, Button},
                data() {
                        return {
                                phone:'',
	                        code:'',
	                        haveCode:0

                        }
                },
                methods: {
                        login(e){
                                return API.user.loginPhone(this.phone, this.code, e.target)
                                        .then(token =>{
                                                sessionStorage.setItem('token', token);
                                                this.$router.replace(this.$route.params.reference);
                                        });
                        },
	                getCode(){
                                return API.user.getCode()
	                                .then(data => {
	                                        this.haveCode = data;
	                                })
	                }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.phone-wrapper
		.phone
			.psd
				padding-right:3rem
			button
				padding: 0.2rem 0.2rem;
				font-size: 0.23rem;
				outline: 0
				border:0
				position: absolute
				right:1rem
				top:38%
				background-color: transparent;
				color: #00B7FF;
		a
			float:left
			color:#00b7ff
			margin:0.2rem 0
		a.register
			float:right
</style>