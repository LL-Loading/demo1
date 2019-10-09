 <template>
	 <div class="yan-input"><input :type="type" :placeholder="placeholder" @input="e => $emit('change', e.target.value)"></div>
</template>

<script type="text/ecmascript-6">
        export default {
                props: {
                        type:{
                                type:String,
                                default: 'text'
                        },
                        placeholder: {
                                type:String,
                                default: '请输入'
                        }
                }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
div.yan-input
	display: flex
	align-items: center
	border-bottom: 1px solid #333
	height:1.1rem
	input
		border:none
		outline:none
		flex-grow:1
		font-size:0.28rem
		color: #4a4a4a
		&::-webkit-input-placeholder
			color: rgb(153,153,153)
</style>