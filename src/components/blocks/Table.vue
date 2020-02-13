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
export default {
  name: "Table",
  props: ["headers", "body"],
  data: () => ({
    search: ""
  })
};
</script>

<style scoped>
.v-btn {
  display: flex;
  align-self: flex-end;
  margin-left: 30px;
}
</style>
