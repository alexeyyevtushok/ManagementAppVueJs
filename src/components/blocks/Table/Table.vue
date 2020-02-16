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
        <v-btn @click="toggleAddModal" small>Add {{ tableName }}</v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="body"
        :items-per-page="5"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-icon
            v-if="tableName.toLowerCase() === 'projects'"
            small
            class="mr-2"
            @click="toggleInfoModal(item)"
          >
            info
          </v-icon>
          <v-icon small class="mr-2" @click="toggleEditModal(item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
    <EditModal
      v-if="editModal"
      :toggleEditModal="toggleEditModal"
      :currentItem="currentItem"
    />
    <AddModal v-if="addModal" :toggleAddModal="toggleAddModal" />
    <InfoProjectModal
      v-if="infoModal"
      :currentItem="currentItem"
      :toggleInfoModal="toggleInfoModal"
    />
  </div>
</template>

<script>
import { deleteTableItem } from "@/service/deleteItems.service";
import EditModal from "@/components/blocks/Modal/EditModal/EditModal";
import AddModal from "@/components/blocks/Modal/AddModal/AddModal";
import InfoProjectModal from "@/components/blocks/Modal/InfoProjectModal/InfoProjectModal";

export default {
  name: "Table",
  components: { InfoProjectModal, AddModal, EditModal },
  props: {
    headers: Array,
    body: Array
  },
  data: () => ({
    tableName: "",
    search: "",
    editModal: false,
    addModal: false,
    infoModal: false,
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
    toggleAddModal() {
      this.addModal = !this.addModal;
    },
    toggleInfoModal(item) {
      this.infoModal = !this.infoModal;
      this.currentItem = item;
    },
    deleteItem(item) {
      const index = this.body.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        deleteTableItem(`api/${this.tableName}`, index, this.forceUpdate);
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
