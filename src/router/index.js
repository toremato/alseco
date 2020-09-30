import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NewRecord from "../views/NewRecord.vue";
import EditRecord from "../views/EditRecord.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/new",
    name: "NewRecord",
    component: NewRecord
  },
  {
    path: "/edit",
    name: "EditRecord",
    component: EditRecord
  }
];

const router = new VueRouter({
  routes
});

export default router;
