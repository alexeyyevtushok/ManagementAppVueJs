<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add new users</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form>
          <v-row>
            <v-text-field
              label="Users list"
              hint="Separate users by semicolon(;)"
              required
              v-model="form.usersList"
            />
          </v-row>
          <v-row v-if="getNewUsers.length > 1">
            <ul class="usersList">
              New users list:
              <li v-for="user in getNewUsers" :key="user">
                {{ user }}
              </li>
            </ul>
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
import { postItems } from "@/service/postItems.service";

export default {
  name: "AddModalUsers",
  props: {
    toggleAddModal: Function
  },
  data: () => ({
    form: {
      usersList: ""
    }
  }),
  computed: {
    getNewUsers() {
      return this.form.usersList.split(";");
    }
  },
  methods: {
    onClose() {
      this.toggleAddModal();
    },
    onSave() {
      const data = this.form.usersList.split(";");
      if (Array.isArray(data)) {
        postItems("api/users", data);
      }
      this.toggleAddModal();
    }
  }
};
</script>

<style scoped>
.usersList {
  padding-left: 0;
  font-size: 18px;
  color: #1976d2;
}

li {
  list-style: none;
  color: rgba(0, 0, 0, 0.87);
  font-size: 16px;
}

form > .row {
  margin-bottom: 10px;
}
</style>
