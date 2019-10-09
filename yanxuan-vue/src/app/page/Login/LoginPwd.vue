<template>
	<div>
		<Input type="text" placeholder="请输入账户名" @change="value => name = value"/>
		<i class="iconfont icon-eyes" @click="toggle = !toggle" :class="!toggle ? 'active' : '' "></i>
		<Input ref="toggle"  :type="toggle ? 'password' : 'text' " placeholder="请输入密码" @change="value => pwd = value"/>
		<router-link to="/register">忘记密码？</router-link>
		<router-link to="/register" class="register">立即注册</router-link>
		<Button :click="login">立即登录</Button>
	</div>
</template>

<script type="text/ecmascript-6">
	import Input from './Input.vue';
        import API from '../../util/api.js';
        import Button from './Button.vue';
        export default {
                components:{ Input, Button },
                data() {
                        return {
                                name:'',
                                pwd: '',
	                        toggle:true,
                        }
                },
                methods: {
                        login(e) {
                                return API.user.loginPwd(this.name, this.pwd, e.target)
                                        .then(token =>{
                                                sessionStorage.setItem('token', token);
                                                this.$router.replace(this.$route.params.reference);
                                                sessionStorage.setItem('name', this.name);
                                        });
                        },
                },
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	a
		float:left
		color: #00b7ff
		margin:0.2rem 0
	a.register
		float:right
	i
		font-size:0.32rem
		position: absolute
		right:1rem
		top:40%
	i.active
		color:#B4282D
</style>