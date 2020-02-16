<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add new project</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form>
          <v-text-field label="Project name" required v-model="form.name" />
        </form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
      <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { postItems } from "@/service/postItems.service";

export default {
  name: "AddModalProjects",
  props: {
    toggleAddModal: Function
  },
  data: () => ({
    form: {
      name: ""
    }
  }),
  methods: {
    onClose() {
      this.toggleAddModal();
    },
    onSave() {
      postItems("api/projects", { name: this.form.name });
      this.toggleAddModal();
    }
  }
};
</script>
