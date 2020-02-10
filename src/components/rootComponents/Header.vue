<template>
  <div>
    <v-navigation-drawer v-if="drawer" app>
      <v-list dense>
        <v-list-item
          @click="toggleNavigation"
          v-for="route in routesList"
          v-bind:key="route.path"
          :to="route.path"
        >
          <v-list-item-action>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ route.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#424041" dark>
      <v-app-bar-nav-icon @click="toggleNavigation"></v-app-bar-nav-icon>
      <v-toolbar-title>Projects management app</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { routes } from "@/routerConfig";

export default Vue.extend({
  name: "Header",
  methods: {
    toggleNavigation() {
      this.drawer = !this.drawer;
    }
  },
  data: () => ({
    routesList: routes.filter(item => item.name),
    drawer: false
  })
});
</script>

<style scoped></style>
