<template>
  <v-app id="inspire">
    <Header />
    <Main />
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Footer from "@/components/rootComponents/Footer.vue";
import Main from "@/components/rootComponents/Main.vue";
import Vue from "vue";
import Header from "@/components/rootComponents/Header.vue";

export default Vue.extend({
  name: "App",
  components: {
    Header,
    Main,
    Footer
  }
});
</script>
