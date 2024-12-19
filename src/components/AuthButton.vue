<template>
  <div id="vk-auth-button"></div>
</template>

<script>
export default {
  name: "AuthButton",
  mounted() {
    if (window.VKIDSDK) {
      const VKID = window.VKIDSDK;

      VKID.Config.init({
        app: 52867464,
        redirectUrl: "https://vue-test-vk.netlify.app/",
        responseMode: VKID.ConfigResponseMode.CallBack,
        source: VKID.ConfigSource.LOWCODE,
        scope: "",
      });

      const oneTap = new VKID.OneTap();

      oneTap
          .render({
            container: document.getElementById("vk-auth-button"),
            showAlternativeLogin: true,
          })
          .on(VKID.WidgetEvents.ERROR, this.onError)
          .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, this.onSuccess);
    }
  },
  methods: {
    onSuccess(payload) {
      console.log("Login Success:", payload);
      const { code, device_id } = payload;

      window.VKIDSDK.Auth.exchangeCode(code, device_id)
          .then((data) => {
            console.log("Token Data:", data);
          })
          .catch(this.onError);
    },
    onError(error) {
      console.error("VK Auth Error:", error);
    },
  },
};
</script>
