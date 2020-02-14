<template>
  <div>
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
      >
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="toggleEditModal(item)"
            >edit</v-icon
          >
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <EditModal
      v-if="editModal"
      :toggleEditModal="toggleEditModal"
      :currentItem="currentItem"
      :editModal="editModal"
    />
  </div>
</template>

<script>
import { deleteTableItem } from "@/service/table.service";
import EditModal from "@/components/blocks/Modal/EditModalProjects";
export default {
  name: "Table",
  components: { EditModal },
  props: ["headers", "body"],
  data: () => ({
    tableName: "",
    search: "",
    editModal: false,
    currentItem: null
  }),
  mounted() {
    this.tableName = this.$route.name;
  },
  methods: {
    forceUpdate() {
      this.$forceUpdate();
    },
    toggleEditModal(item) {
      this.editModal = !this.editModal;
      this.currentItem = item;
    },
    deleteItem(item) {
      const index = this.body.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        deleteTableItem("/api/projects", index, this.forceUpdate);
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
