<template>
  <div>
    <Table v-bind:body="body" v-bind:headers="headers" />
  </div>
</template>

<script>
import Table from "@/components/blocks/Table/Table";
import { userHeaders } from "@/constants/tableData";
import { getTableData } from "@/service/table.service";

export default {
  name: "Users",
  data: () => ({
    body: null,
    headers: userHeaders
  }),
  components: {
    Table
  },
  mounted() {
    getTableData("api/users.json", this.usersListToTable).then(
      value => (this.body = value)
    );
  },
  methods: {
    usersListToTable(list) {
      return list.map(item => ({
        email: item.email,
        roleId: item.role.roleId,
        roleName: item.role.roleName
      }));
    }
  }
};
</script>
