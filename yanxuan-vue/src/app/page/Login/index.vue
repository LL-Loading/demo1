
<template>
	<div class="page-wrapper">
		<div class="header"><YanTitle /></div>
		<div class="logo"><img :src="LoginLogo" alt=""></div>
		<div class="content">
			<div class="title">
				<a :class="mode ? 'mode' : '' " @click="mode=!mode">账号登录</a>
				<a @click="mode=!mode" :class="!mode ? 'mode' : '' ">手机登录</a>
			</div>
			<LoginPwd  v-if="mode"/>
			<LoginPhone v-else/>

		</div>
	</div>
</template>

<script type="text/ecmascript-6">
        import LoginLogo from './logo.png';
        import YanTitle from '../../components/YanTitle';
        import LoginPhone from './LoginPhone.vue';
        import LoginPwd from './LoginPwd.vue';



        export default {
                components: {YanTitle, LoginPhone, LoginPwd,},
                data(){
                        return {
                                LoginLogo,
                                mode: true                      //真表示密码登录，假表示手机登录
                        }
                }
        }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.page-wrapper
	height: 100%
	width: 100%
	display:flex
	flex-direction:column
	.header
		flex-shrink: 0
		height: 0.8rem
	.logo
		flex-shrink: 0
		margin: left;
		margin-left: 50%;
		transform: translate(-50%);
		margin-top: 0.73rem;
		text-align: center;
		img
			width:2.5rem
	.content
		padding:0 0.8rem
		flex-grow:1
		.title
			width: 80%;
			margin: 0.2rem auto;
			font-size: 0.4rem;
			display: flex;
			text-align: center;
			a
				flex-grow: 1;
				padding: 0.2rem;
			a.mode
				color:#B4282D

</style>