<template>
    <div class="conversation-item-container" @click="selectConversation">
        <div class="close-btn">
            <span class="tim-icon-close" title="删除会话" @click="deleteConversation"></span>
        </div>
        <div class="warp">
            <avatar :src="avatar" :type="conversation.type"/>
            <div class="content">
                <div class="row-1">
                    <div class="name">
                        <div class="text-ellipsis">
                            <span :title="conversation.userProfile.nick || conversation.userProfile.userID"
                                  v-if="conversation.type ===  TIM.TYPES.CONV_C2C"
                            >{{conversation.userProfile.nick || conversation.userProfile.userID}}</span>
                            <span v-else-if="conversation.type === TIM.TYPES.CONV_SYSTEM">系统通知</span>
                            <!--<span title="冉有钱">冉有钱</span>-->
                        </div>
                    </div>
                    <div class="unread-count">
                      <span class="badge" v-if="showUnreadCount">
                        {{conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}}
                      </span>
                        <!--<span class="badge">-->
                            <!--6-->
                        <!--</span>-->
                    </div>
                </div>
                <div class="row-2">
                    <div class="summary">
                        <div v-if="conversation.lastMessage" class="text-ellipsis">
                            <span class="remind" style="color:red;" v-if="hasMessageAtMe">[有人提到我]</span>
                            <span class="text" :title="conversation.lastMessage.messageForShow">
                                {{messageForShow}}
                            </span>
                        </div>
                        <!--<div class="text-ellipsis">-->
                            <!--<span class="remind" style="color:red;">[有人提到我]</span>-->
                            <!--<span class="text" title="你好">-->
                                <!--你好-->
                            <!--</span>-->
                        <!--</div>-->
                    </div>
                    <div class="date">
                        {{date}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapState} from 'vuex'
    import {isToday, getDate, getTime} from '../../utils/date'

    export default {
        name: 'conversation-item',
        props: ['conversation'],
        data() {
            return {
                popoverVisible: false,
                hasMessageAtMe: false
            }
        },
        computed: {
            showUnreadCount() {
                if (this.$store.getters.hidden) {
                    return this.conversation.unreadCount > 0
                }
                // 是否显示未读计数。当前会话和未读计数为0的会话，不显示。
                return (
                    this.currentConversation.conversationID !==
                    this.conversation.conversationID && this.conversation.unreadCount > 0
                )
            },
            date() {
                if (
                    !this.conversation.lastMessage ||
                    !this.conversation.lastMessage.lastTime
                ) {
                    return ''
                }
                const date = new Date(this.conversation.lastMessage.lastTime * 1000)
                if (isToday(date)) {
                    return getTime(date)
                }
                return getDate(date)
            },
            avatar: function () {
                switch (this.conversation.type) {
                    case 'GROUP':
                        return this.conversation.groupProfile.avatar
                    case 'C2C':
                        return this.conversation.userProfile.avatar
                    default:
                        return ''
                }
            },
            conversationName: function () {
                if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
                    return this.conversation.userProfile.nick || this.conversation.userProfile.userID
                }
                if (this.conversation.type === this.TIM.TYPES.CONV_GROUP) {
                    return this.conversation.groupProfile.name || this.conversation.groupProfile.groupID
                }
                if (this.conversation.type === this.TIM.TYPES.CONV_SYSTEM) {
                    return '系统通知'
                }
                return ''
            },
            messageForShow() {
                if (this.conversation.lastMessage.isRevoked) {
                    if (this.conversation.lastMessage.fromAccount === this.currentUserProfile.userID) {
                        return '你撤回了一条消息'
                    }
                    if (this.conversation.type === this.TIM.TYPES.CONV_C2C) {
                        return '对方撤回了一条消息'
                    }
                    return `${this.conversation.lastMessage.fromAccount}撤回了一条消息`
                }
                return this.conversation.lastMessage.messageForShow
            },
            ...mapState({
                currentConversation: state => state.conversation.currentConversation,
                currentUserProfile: state => state.user.currentUserProfile
            }),
            ...mapGetters(['toAccount'])
        },
        mounted() {
            this.$bus.$on('new-messsage-at-me', event => {
                if (
                    event.data.conversationID === this.conversation.conversationID &&
                    this.conversation.conversationID !==
                    this.currentConversation.conversationID
                ) {
                    this.hasMessageAtMe = true
                }
            })
        },
        methods: {
            selectConversation() {
                //点击好友与当前好友不相同
                // if (this.conversation.conversationID !== this.currentConversation.conversationID) {
                //     this.$store.dispatch(
                //         'checkoutConversation',//切换会话
                //         this.conversation.conversationID  //点击的好友id
                //     )
                // }
                this.$router.push({
                    name:'chatRoom'
                })
                this.$store.dispatch(
                    'checkoutConversation',//切换会话
                    this.conversation.conversationID  //点击的好友id
                )
            },
            deleteConversation(event) {
                // 停止冒泡，避免和点击会话的事件冲突
                event.stopPropagation()
                this.tim
                    .deleteConversation(this.conversation.conversationID)
                    .then(() => {
                        this.$store.commit('showMessage', {
                            message: `会话【${this.conversationName}】删除成功!`,
                            type: 'success'
                        })
                        this.popoverVisible = false
                        this.$store.commit('resetCurrentConversation')
                    })
                    .catch(error => {
                        this.$store.commit('showMessage', {
                            message: `会话【${this.conversationName}】删除失败!, error=${error.message}`,
                            type: 'error'
                        })
                        this.popoverVisible = false
                    })
            },
        },
        watch: {
            currentConversation(next) {
                if (next.conversationID === this.conversation.conversationID) {
                    this.hasMessageAtMe = false
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .conversation-item-container {
        padding: 15px 20px;
        cursor: pointer;
        /*overflow: hidden;*/
        transition: .2s;

        &:hover {
            background: #404953;

            .close-btn {
                right: 3px;
            }
        }
    }

    .close-btn {
        position: absolute;
        right: -25px;
        top: 103px;
        color: #76828c;
        transition: all .2s ease;

        &:hover {
            color: #f35f5f;
        }
    }

    .warp {
        display: flex;
    }

    .avatar {
        width: 100px;
        height: 100px;
        margin-right: 20px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .content {
        flex: 1;
        height: 50px;
        /*overflow: hidden;*/

        .row-1 {
            display: flex;
            line-height: 50px;

            .name {
                color: #76828c;
                flex: 1;
                min-width: 0px;
                font-size: 40px;
            }

            .unread-count {
                padding-left: 10px;
                flex-shrink: 0;
                color: #76828c;
                font-size: 14px;

                .badge {
                    vertical-align: bottom;
                    background-color: #f35f5f;
                    border-radius: 15px;
                    color: #FFF;
                    display: inline-block;
                    font-size: 30px;
                    height: 30px;
                    max-width: 30px;
                    line-height: 30px;
                    padding: 0 6px;
                    text-align: center;
                    white-space: nowrap;
                }
            }
        }

        .row-2 {
            display: flex;
            font-size: 26px;
            padding-top: 3px;

            .summary {
                flex: 1;
                overflow: hidden;
                min-width: 0;
                color: #a5b5c1;

                .remind {
                    color: #f35f5f;
                }
            }

            .date {
                padding-left: 10px;
                flex-shrink: 0;
                text-align: right;
                color: #76828c;
            }

        }

    }

    .choose {
        background-color: #404953;
    }

    .context-menu-button {
        padding: 10px;
        border: 2px solid #2d8cf0;
        border-radius: 8px;
    }
</style>
