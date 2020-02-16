<template>
  <v-app id="inspire">
    <v-row justify="center">
      <v-dialog value="true" persistent max-width="600px">
        <EditModalProjects
          v-if="currentRoute.toLowerCase() === 'projects'"
          :toggleEditModal="toggleEditModal"
          :currentItem="currentItem"
        />
        <EditModalUsers
          v-if="currentRoute.toLowerCase() === 'users'"
          :toggleEditModal="toggleEditModal"
          :currentItem="currentItem"
        />
        <EditModalRoles
          v-if="currentRoute.toLowerCase() === 'roles'"
          :toggleEditModal="toggleEditModal"
          :currentItem="currentItem"
        />
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import EditModalRoles from "./EditModalRoles";
import EditModalUsers from "./EditModalUsers";
import EditModalProjects from "./EditModalProjects";

export default {
  name: "EditModal",
  props: {
    toggleEditModal: Function,
    currentItem: Object
  },
  components: { EditModalRoles, EditModalUsers, EditModalProjects },
  data: () => ({
    currentRoute: ""
  }),
  mounted() {
    this.currentRoute = this.$route.name;
  }
};
</script>
