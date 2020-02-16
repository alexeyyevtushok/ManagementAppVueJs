<template>
  <div>
    <Table v-bind:body="body" v-bind:headers="headers" />
  </div>
</template>

<script>
import Table from "@/components/blocks/Table/Table";
import { userHeaders } from "@/constants/tableData";
import { getTableData } from "@/service/getItems.service";

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
        id: item.id,
        email: item.email,
        role: item.role,
        positionName: item.positionName
      }));
    }
  }
};
</script>
