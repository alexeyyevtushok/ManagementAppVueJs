import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Roles from "./components/routes/Roles.vue";
import Users from "./components/routes/Users.vue";
import Projects from "./components/routes/Projects.vue";

declare interface RouterProps extends RouteConfig {
  icon?: string;
}

Vue.use(VueRouter);

export const routes: RouterProps[] = [
  {
    path: "/",
    redirect: "/projects"
  },
  {
    path: "/projects",
    name: "Projects",
    icon: "personal_video",
    component: Projects
  },
  {
    path: "/users",
    name: "Users",
    icon: "face",
    component: Users
  },
  {
    path: "/roles",
    name: "Roles",
    icon: "grade",
    component: Roles
  }
];

export const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
