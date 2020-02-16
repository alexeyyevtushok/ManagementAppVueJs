<template>
  <div>
    <Table v-bind:body="body" v-bind:headers="headers" />
  </div>
</template>

<script>
import Table from "@/components/blocks/Table/Table.vue";
import { projectsHeaders } from "@/constants/tableData.js";
import { getTableData } from "@/service/getItems.service";

export default {
  name: "Projects",
  data: () => ({
    body: null,
    headers: projectsHeaders
  }),
  components: {
    Table
  },
  mounted() {
    getTableData("api/projects.json", this.projectsListToTable).then(
      value => (this.body = value)
    );
  },
  methods: {
    projectsListToTable(list) {
      return list
        .map(item => ({
          id: item.id,
          name: item.name,
          teams: item.teams,
          users: item.users.length,
          manager: item.manager || { id: null, email: "No manager" }
        }))
        .sort(item => (item.manager ? -1 : 1));
    }
  }
};
</script>
