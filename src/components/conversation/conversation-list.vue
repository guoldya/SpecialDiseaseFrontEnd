<template>
    <div class="list-container">
        <div class="scroll-container">
            <conversation-item
                    :conversation="item"
                    v-for="item in conversationList"
                    :key="item.conversationID"
            />
        </div>
    </div>
</template>
<script>
    import ConversationItem from './conversation-item'
    import { mapState } from 'vuex'
    export default {
        name: 'ConversationList',
        components: { ConversationItem },
        data(){
            return{

            }
        },
        computed: {
            ...mapState({
                conversationList: state => state.conversation.conversationList,
                currentConversation: state => state.conversation.currentConversation
            })
        },
        mounted() {
            window.addEventListener('keydown', this.handleKeydown)
        },
        destroyed() {
            window.removeEventListener('keydown', this.handleKeydown)
        },
        methods: {
            handleRefresh() {
                this.refreshConversation()()
            },
            refreshConversation() {
                let that = this
                return function () {
                    if (!that.timeout) {
                        that.timeout = setTimeout(() =>{
                            that.timeout = null
                            that.tim.getConversationList().then(() => {
                                that.$store.commit('showMessage', {
                                    message: '刷新成功',
                                    type: 'success'
                                })
                            })
                        }, 1000)
                    }
                }
            },
            handleAddButtonClick() {
                this.showDialog = true
            },
            handleConfirm() {
                if (this.userID !== '@TIM#SYSTEM') {
                    this.$store
                        .dispatch('checkoutConversation', `C2C${this.userID}`)
                        .then(() => {
                            this.showDialog = false
                        }).catch(() => {
                        this.$store.commit('showMessage', {
                            message: '没有找到该用户',
                            type: 'warning'
                        })
                    })
                } else {
                    this.$store.commit('showMessage', {
                        message: '没有找到该用户',
                        type: 'warning'
                    })
                }
                this.userID = ''
            },
            handleKeydown(event) {
                if (event.keyCode !== 38 && event.keyCode !== 40 || this.isCheckouting) {
                    return
                }
                const currentIndex = this.conversationList.findIndex(
                    item => item.conversationID === this.currentConversation.conversationID
                )
                if (event.keyCode === 38 && currentIndex - 1 >= 0) {
                    this.checkoutPrev(currentIndex)
                }
                if (
                    event.keyCode === 40 &&
                    currentIndex + 1 < this.conversationList.length
                ) {
                    this.checkoutNext(currentIndex)
                }
            },
            checkoutPrev(currentIndex) {
                this.isCheckouting = true
                this.$store
                    .dispatch(
                        'checkoutConversation',
                        this.conversationList[currentIndex - 1].conversationID
                    )
                    .then(() => {
                        this.isCheckouting = false
                    })
                    .catch(() => {
                        this.isCheckouting = false
                    })
            },
            checkoutNext(currentIndex) {
                this.isCheckouting = true
                this.$store
                    .dispatch(
                        'checkoutConversation',
                        this.conversationList[currentIndex + 1].conversationID
                    )
                    .then(() => {
                        this.isCheckouting = false
                    })
                    .catch(() => {
                        this.isCheckouting = false
                    })
            },
        }
    }
</script>
<style scoped>
    .list-container{
        height:100%;
        width:100%;
        margin-top: 100px;
        display:flex;
        flex-direction:column
    }
    .scroll-container{
        /*overflow-y: scroll;*/
        flex: 1
    }

</style>
