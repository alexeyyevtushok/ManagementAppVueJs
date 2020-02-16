<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ currentItem.name }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form>
          <v-row>
            <v-col xs="6">
              <v-text-field
                label="Project name"
                required
                :value="currentItem.name"
                v-model="form.name"
              />
            </v-col>
            <v-col xs="6">
              <v-select
                v-model="form.manager"
                :items="managersList"
                item-text="email"
                label="Managers list"
                @input="value => onSelect(form.manager, value)"
                return-object
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-text-field
                label="Teams list"
                hint="Separate roles by semicolon(;)"
                required
                :value="currentItem.teams"
                v-model="form.teams"
              />
            </v-col>
          </v-row>
          <div class="headline addUserHeader">Add/Change a user</div>
          <v-row>
            <v-col xs="6">
              <v-select
                v-model="form.user.newUser"
                :items="usersList"
                item-text="email"
                label="Set user"
                @input="value => onSelect(form.user.newUser, value)"
                return-object
                required
              />
            </v-col>
            <v-col xs="6">
              <v-select
                v-model="form.user.newTeam"
                :items="teamsList"
                item-text="email"
                label="Set user team"
                @input="value => onSelect(form.user.newTeam, value)"
                return-object
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="6">
              <v-select
                v-model="form.user.newRole"
                :items="rolesList"
                item-text="roleName"
                label="Set user role"
                @input="value => onSelect(form.user.newRole, value)"
                return-object
                required
              />
            </v-col>
            <v-col xs="6">
              <v-select
                v-model="form.user.newSeniority"
                :items="seniorityList"
                item-text="title"
                label="Set user seniority"
                @input="value => onSelect(form.user.newSeniority, value)"
                return-object
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col xs="12">
              <v-text-field
                label="Position name"
                required
                v-model="form.user.newPosition"
              />
            </v-col>
          </v-row>
        </form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
      <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { compareArrays, unObservable } from "@/helpers/array.helper";
import { getItems } from "@/service/getItems.service";
import { postItems } from "@/service/postItems.service";
import { detectIsEmpty } from "@/helpers/objects.helper";

export default {
  name: "EditModalProject",
  props: {
    toggleEditModal: Function,
    currentItem: Object
  },
  data: () => ({
    managersList: [],
    usersList: [],
    teamsList: [],
    seniorityList: [],
    rolesList: [],
    form: {
      name: null,
      manager: null,
      teams: null,
      user: {
        newUser: null,
        newTeam: null,
        newRole: null,
        newSeniority: null,
        newPosition: null
      }
    }
  }),
  mounted() {
    // Get and set text values
    this.form.name = this.currentItem.name;
    this.form.manager = this.currentItem.manager;
    this.form.teams = this.currentItem.teams.join(";");
    this.teamsList = this.currentItem.teams;
    // Get and set arrays
    getItems("api/managers.json").then(res => (this.managersList = res.data));
    getItems("api/users.json").then(res => (this.usersList = res.data));
    getItems("api/roles.json").then(res => {
      this.rolesList = res.data;
    });
  },
  updated() {
    this.setSeniorities();
  },
  methods: {
    setSeniorities() {
      if (this.form.user.newRole) {
        const pickedRole = this.rolesList.find(
          item => item.roleId === this.form.user.newRole.roleId
        );
        this.seniorityList = pickedRole.seniorities;
      }
    },
    submitManager() {
      if (this.form.manager !== this.currentItem.manager) {
        postItems(`/api/projects/${this.currentItem.id}/assign-manager`, {
          id: this.form.manager.id
        });
      }
    },
    submitName() {
      if (this.form.name !== this.currentItem.name) {
        postItems("/api/projects", {
          id: this.currentItem.id,
          name: this.form.name
        });
      }
    },
    submitTeams() {
      const newTeams = this.form.teams.split(";");
      const prevTeams = unObservable(this.currentItem.teams);
      if (
        this.form.roleName !== this.currentItem.roleName ||
        !compareArrays(newTeams, prevTeams)
      ) {
        postItems(`/api/projects${this.form.id}/team`, {
          teams: newTeams
        });
      }
    },
    submitUser() {
      if (!detectIsEmpty(this.form.user)) {
        const api = `api/projects/${this.currentItem.id}/team/${this.form.user.newTeam}/assign-employee`;
        const data = {
          teamName: this.form.user.newTeam,
          roleId: this.form.user.newRole.roleId,
          seniorityId: this.form.user.newSeniority.id,
          positionName: this.form.user.newPosition,
          employeeId: this.form.user.newUser.id
        };
        postItems(api, data);
      }
    },
    onClose() {
      this.toggleEditModal();
    },
    onSave() {
      this.formSubmit();
      this.toggleEditModal();
    },
    onSelect(prop, value) {
      prop = value;
    },
    formSubmit() {
      this.submitManager();
      this.submitName();
      this.submitTeams();
      this.submitUser();
    }
  }
};
</script>

<style scoped>
.addUserHeader {
  color: #1976d2;
}
</style>
