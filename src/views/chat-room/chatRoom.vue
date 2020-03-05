<template>
  <div refs="message-list">
    <Header :post-title="$route.query.name"></Header>
    <current-conversation :content="$store.state.test" />
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import CurrentConversation from "@/components/conversation/current-conversation";
export default {
  data() {
    return {
      imSdk: this.$imsdk
    };
  },
  name: "ChatRoom",
  components: {
    CurrentConversation
  },
  mounted() {
    this.imSdk.createUserConnect(
      "p" + this.$store.state.accountInfo.id,
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
