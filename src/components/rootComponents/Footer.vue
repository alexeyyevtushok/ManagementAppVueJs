<template>
  <v-footer color="#424041" app>
    <div class="d-flex">
      <v-img
        max-width="300px"
        max-height="30px"
        src="@/assets/images/itera_logo.png"
      />
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Footer",
  methods: {},
  data: () => ({})
});
</script>

<style scoped>
.v-footer {
  justify-content: center;
}
</style>
