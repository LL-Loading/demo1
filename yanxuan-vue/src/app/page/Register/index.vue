<template>
	<div class="page-wrapper">
		<div class="header"><YanTitle /></div>
		<div class="logo"><img src="./logo.png" alt=""></div>
		<div class="content">
			<Input placeholder="请输入用户名" @change="value => model.name = value"/>
			<Input placeholder="请输入手机号" @change="value => model.phone = value"/>
			<Input placeholder="请输入验证码" @change="value => model.code = value"/>
			<button class="code" @click="getCode" v-text="haveCode === 0 ? '获取验证码' : haveCode ">点击获取验证码</button>
			<Input placeholder="请输入密码" type="password" @change="value => model.pwd = value" />
			<Button :click="register">立即注册</Button>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import API from '../../util/api.js';
	import Button from '../Login/Button.vue'
	import Input from '../Login/Input.vue'
	import YanTitle from '../../components/YanTitle';
        export default {
                data() {
                        return {
                                model:{ name:'', phone:'', code:'', pwd:'', },
                                haveCode:0
                        }
                },
                components:{ YanTitle, Input, Button },
                methods: {
                        register() {
                                return API.user.register(this.model).then()
                        },
                        getCode(){
                                return API.user.getCode()
                                        .then(data => {
                                                this.haveCode = data;
                                        })
                        },
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.page-wrapper
	height: 100%
	width: 100%
	display:flex
	flex-direction:column
	.header
		height: 0.8rem
		flex-shrink: 0
	.logo
		flex-shrink: 0
		margin: left;
		margin-left: 50%;
		transform: translate(-50%);
		margin-top: 0.5rem;
		text-align: center;
		img
			width:2.5rem
	.content
		padding:0 0.2rem
		button.code
			padding: 0.2rem 0.2rem;
			font-size: 0.23rem;
			outline: 0
			border:0
			position: absolute
			right:0.5rem
			top:35%
			background-color: transparent;
			color: #00B7FF;


</style>