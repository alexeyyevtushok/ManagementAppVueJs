<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ currentItem.email }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form>
          <v-row>
            <v-col xs="12">
              <v-select
                v-model="form.role"
                :items="rolesList"
                item-text="roleName"
                label="Roles list"
                return-object
                @input="onSelect"
                required
              />
            </v-col>
          </v-row>
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
import { getItems } from "@/service/getItems.service";
import { putItems } from "@/service/putItems.service";

export default {
  name: "EditModalUsers",
  props: {
    toggleEditModal: Function,
    currentItem: Object
  },
  data: () => ({
    rolesList: [],
    form: {
      role: null
    }
  }),
  mounted() {
    this.form.role = this.currentItem.role;
    getItems("api/roles.json").then(res => (this.rolesList = res.data));
  },
  methods: {
    onClose() {
      this.toggleEditModal();
    },
    onSave() {
      if (this.currentItem.role !== this.form.role) {
        putItems(`/api/users/${this.currentItem.id}`, {
          ...this.currentItem,
          role: this.form.role
        });
      }
      this.toggleEditModal();
    },
    onSelect(value) {
      this.form.role = value;
    }
  }
};
</script>
