<template>
  <div refs="message-list">
    <Header :isOpen='isOpen' :post-title="$route.query.name"></Header>
    <current-conversation :content="$store.state.test" />
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import CurrentConversation from "@/components/conversation/current-conversation";
export default {
  data() {
    return {
      imSdk: this.$imsdk,
      chooseId: '',
      isOpen:false
    };
  },
  name: "ChatRoom",
  components: {
    CurrentConversation
  },
  mounted() {
    if (this.$route.query.isOpen) {
      this.isOpen = true;
    }
    if (typeof (this.$store.state.accountInfo) == 'string') {
      this.chooseId = JSON.parse(this.$store.state.accountInfo).id;
    } else {
      this.chooseId = this.$store.state.accountInfo.id;
    }
    console.log(this.imSdk,"ssssssss")
    this.imSdk.createUserConnect(
      "p" + this.chooseId,
      "123456",
      {
        userConnectCallback: () => {
          // 拿到消息列表之后的回调
          this.imSdk.openSession(
            this.$store.state.userInfo.nickname,
            "d" + this.$route.query.id,
            this.$route.query.name,
            {
              getMessageCallback: () => {
                // 拿到消息列表之后的回调
              }
            }
          );
        }
      }
    );
  },
  computed: {}
};
</script>
