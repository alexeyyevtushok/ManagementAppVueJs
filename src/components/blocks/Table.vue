<template>
  <v-card v-if="body">
    <v-card-title>
      {{ tableName }}
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
      <v-btn small>Add {{ tableName }}</v-btn>
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
export default {
  name: "Table",
  props: ["headers", "body"],
  data: () => ({
    tableName: "",
    search: ""
  }),
  mounted() {
    this.tableName = this.$route.name;
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
