<template>
  <div>
    <v-app id="inspire">
      <v-row justify="center">
        <v-dialog value="true" persistent max-width="600px">
          <AddModalUsers
            v-if="currentRoute.toLowerCase() === 'users'"
            :toggleAddModal="toggleAddModal"
          />
          <AddModalRoles
            v-if="currentRoute.toLowerCase() === 'roles'"
            :toggleAddModal="toggleAddModal"
          />
          <AddModalProjects
            v-if="currentRoute.toLowerCase() === 'projects'"
            :toggleAddModal="toggleAddModal"
          />
        </v-dialog>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import AddModalUsers from "./AddModalUsers";
import AddModalRoles from "./AddModalRoles";
import AddModalProjects from "@/components/blocks/Modal/AddModal/AddModalProjects";

export default {
  name: "AddModal",
  props: {
    toggleAddModal: Function
  },
  components: { AddModalUsers, AddModalRoles, AddModalProjects },
  data: () => ({
    currentRoute: ""
  }),
  mounted() {
    this.currentRoute = this.$route.name;
  }
};
</script>
