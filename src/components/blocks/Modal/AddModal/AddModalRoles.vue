<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add new role</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <form>
          <v-row>
            <v-col xs="6">
              <v-text-field
                label="Role title"
                required
                v-model="form.roleName"
              />
            </v-col>
            <v-col xs="6">
              <v-text-field
                label="Seniorities list"
                hint="Separate users by semicolon(;)"
                required
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

export default {
  name: "AddModalRoles",
  props: ["toggleAddModal"],
  data: () => ({
    form: {
      roleName: "",
      seniorities: ""
    }
  }),
  methods: {
    onClose() {
      this.toggleAddModal();
    },
    onSave() {
      this.onSubmit();
      this.toggleAddModal();
    },
    onSubmit() {
      const seniorities = this.form.seniorities.split(";");
      setRole("api/roles", {
        roleName: this.form.roleName,
        seniorities: seniorities.map((item, index) => ({
          id: index + 1,
          title: item,
          order: index + 1
        }))
      });
    }
  }
};
</script>

<style scoped>
.usersList {
  padding-left: 0;
  font-size: 18px;
  color: #1976d2;
}

li {
  list-style: none;
  color: rgba(0, 0, 0, 0.87);
}
</style>
