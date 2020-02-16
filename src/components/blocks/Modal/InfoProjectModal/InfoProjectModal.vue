<template>
  <v-app id="inspire">
    <v-row justify="center">
      <v-dialog value="true" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ currentItem.name }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              Project data is going to be here.
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: "InfoProjectModal",
  props: {
    currentItem: Object,
    toggleInfoModal: Function
  },
  methods: {
    onClose() {
      this.toggleInfoModal();
    }
  }
};
</script>
