<template>
  <v-app id="inspire">
    <v-row justify="center">
      <v-dialog v-model="editModal" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ currentItem.name }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <form>
                <v-row>
                  <v-col xs="12">
                    <v-text-field
                      label="Project name"
                      required
                      :value="currentItem.name"
                      v-model="form.name"
                    ></v-text-field>
                  </v-col>
                  <v-col xs="12">
                    <v-select
                      v-model="form.manager"
                      :items="managersList"
                      item-text="email"
                      label="Managers list"
                      @input="onSelect"
                      return-object
                      required
                    />
                  </v-col>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="onClose">Close</v-btn>
            <v-btn color="blue darken-1" text @click="onSave">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
import { getManagers } from "@/service/managers.service";
import { setProjectName, setManager } from "@/service/projects.service";

export default {
  name: "EditModalProject",
  props: ["toggleEditModal", "currentItem", "editModal"],
  data: () => ({
    managersList: [],
    form: {
      name: null,
      manager: null
    }
  }),
  mounted() {
    this.form.name = this.currentItem.name;
    this.form.manager = this.currentItem.manager;
    getManagers("api/managers.json").then(
      res => (this.managersList = res.data)
    );
  },
  methods: {
    onClose() {
      this.toggleEditModal();
    },
    onSave() {
      this.formSubmit();
      this.toggleEditModal();
    },
    onSelect(value) {
      this.form.manager = value;
    },
    formSubmit() {
      if (this.form.manager !== this.currentItem.manager) {
        setManager(`/api/projects${this.form.id}/assign-manager`, {
          id: this.form.manager.id
        });
      }
      if (this.form.name !== this.currentItem.name) {
        setProjectName("/api/projects", {
          id: this.currentItem.id,
          name: this.form.name
        });
      }
    }
  }
};
</script>
