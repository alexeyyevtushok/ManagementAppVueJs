<template>
  <v-card v-if="body">
    <v-card-title>
      Projects
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
      <v-btn small>Add project</v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="body"
      :items-per-page="5"
      :search="search"
      class="elevation-1"
    />
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Projects",
  data() {
    return {
      search: "",
      headers: [
        { text: "Name", value: "name" },
        { text: "Manager", value: "manager" },
        { text: "Teams", value: "teams" },
        { text: "Team size", value: "users" }
      ],
      body: null
    };
  },
  mounted() {
    axios.get("api/projects.json").then(res => {
      this.body = this.projectsListToTable(res.data);
    });
  },
  methods: {
    projectsListToTable(list) {
      return list
        .map(item => ({
          id: item.id,
          name: item.name,
          teams: item.teams,
          users: item.users.length,
          manager: item.manager ? item.manager.email : "No manager"
        }))
        .sort(item => (item.manager ? -1 : 1));
    }
  }
};
</script>

<style scoped>
.v-btn {
  display: flex;
  align-self: flex-end;
  margin-left: 30px;
}
</style>
