<script>
import * as VKID from "@vkid/sdk";
import {defineComponent, onMounted} from "vue";

export default defineComponent({
  name: "AuthButton",
  setup() {
    onMounted(() => {

      VKID.Config.init({
        app: 52867464,
        redirectUrl: "https://vue-test-vk.netlify.app",
        // responseMode: VKID.ConfigResponseMode.Callback,
      });

      const oneTap = new VKID.OneTap();
      const container = document.getElementById('vk-auth-button');

      if (container) {
        oneTap
            .render({container: container, scheme: VKID.Scheme.LIGHT, lang: VKID.Languages.RUS})
            .on(VKID.WidgetEvents.ERROR)
            .on("LOGIN_SUCCESS", (payload) => {
              console.log("Login success:", payload);
            })
            .on("ERROR", (error) => {
              console.error("VK Auth Error:", error);
            })
      }
    })
  }
})
</script>

<template>
  <div class="vk-btn" id="vk-auth-button"></div>
</template>

<style>
</style>