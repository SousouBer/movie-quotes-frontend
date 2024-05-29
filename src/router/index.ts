import { createRouter, createWebHistory } from "vue-router";

import LandingView from "@/views/LandingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MoviesView from "@/views/MoviesView.vue";
import MainAuthView from "@/views/MainAuthView.vue";
import SingleMovieView from "@/views/SingleMovieView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/landing",
      name: "landing",
      component: LandingView,
    },
    {
      path: "/main",
      name: "main",
      component: MainAuthView,
      children: [
        {
          path: "profile",
          name: "profile",
          component: ProfileView,
        },
        {
          path: "movies",
          name: "movies",
          component: MoviesView,
        },
        {
          path: "movie",
          name: "movie",
          component: SingleMovieView,
        },
      ],
    },
  ],
});

export default router;
