<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ currentItem.roleName }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form>
          <v-row>
            <v-col xs="12">
              <v-text-field
                label="Role title"
                required
                :value="currentItem.roleName"
                v-model="form.roleName"
              />
            </v-col>
            <v-col xs="12">
              <v-text-field
                label="Seniorities"
                hint="Separate roles by semicolon(;)"
                required
                :value="currentItem.seniorities"
                v-model="form.seniorities"
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
import { setRole } from "@/service/roles.service";
import { unObservable, compareArrays } from "@/helpers/array.helper";

export default {
  name: "EditModalRoles",
  props: ["toggleEditModal", "currentItem"],
  data: () => ({
    rolesList: [],
    form: {
      roleName: null,
      seniorities: []
    }
  }),
  mounted() {
    this.form.roleName = this.currentItem.roleName;
    this.form.seniorities = this.currentItem.seniorities.join(";");
  },
  methods: {
    onClose() {
      this.toggleEditModal();
    },
    onSave() {
      this.onSubmit();
      this.toggleEditModal();
    },
    onSubmit() {
      const newSeniorities = this.form.seniorities.split(";");
      const prevSeniorities = unObservable(this.currentItem.seniorities);
      if (
        this.form.roleName !== this.currentItem.roleName ||
        !compareArrays(newSeniorities, prevSeniorities)
      ) {
        setRole("api/roles", {
          roleId: this.currentItem.roleId,
          roleName: this.form.roleName,
          seniorities: newSeniorities.map((item, index) => ({
            id: index + 1,
            title: item,
            order: index + 1
          }))
        });
      }
    }
  }
};
</script>
