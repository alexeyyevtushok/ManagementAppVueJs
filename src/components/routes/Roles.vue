<template>
  <div>
    <Table v-bind:body="body" v-bind:headers="headers" />
  </div>
</template>

<script>
import Table from "@/components/blocks/Table/Table";
import { rolesHeaders } from "@/constants/tableData";
import { getTableData } from "@/service/table.service";

export default {
  name: "Roles",
  data: () => ({
    body: null,
    headers: rolesHeaders
  }),
  components: {
    Table
  },
  mounted() {
    getTableData("api/roles.json", this.usersListToTable).then(
      value => (this.body = value)
    );
  },
  methods: {
    usersListToTable(list) {
      return list.map(item => ({
        roleId: item.roleId,
        roleName: item.roleName,
        seniorities: item.seniorities.map(item => item.title)
      }));
    }
  }
};
</script>
