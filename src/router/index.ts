import { createRouter, createWebHistory } from "vue-router";

import LandingView from "@/views/LandingView.vue";
import ProfileView from "@/views/ProfileView.vue";
import MoviesView from "@/views/MoviesView.vue";
import MainAuthView from "@/views/MainAuthView.vue";
import MovieDetailView from "@/views/MovieDetailView.vue";
import NewsFeedView from "@/views/NewsFeedView.vue";
import ForbiddenView from "@/views/ForbiddenView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

import auth from "@/router/middleware/auth.js";
import notAuth from "@/router/middleware/notAuth.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "landing",
    },
    {
      path: "/landing",
      name: "landing",
      meta: { middleware: [notAuth] },

      component: LandingView,
    },
    {
      path: "/",
      name: "main",
      component: MainAuthView,
      children: [
        {
          path: "profile",
          name: "profile",
          component: ProfileView,
          meta: { middleware: [auth] },
        },
        {
          path: "movies",
          name: "movies",
          component: MoviesView,
          meta: { middleware: [auth] },
        },
        {
          path: "movie/:id",
          name: "movie",
          component: MovieDetailView,
          meta: { middleware: [auth] },
        },
        {
          path: "news",
          name: "newsFeed",
          component: NewsFeedView,
          meta: { middleware: [auth] },
        },
      ],
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: ForbiddenView,
    },
    {
      path: "/forbidden",
      name: "forbidden",
      component: ForbiddenView,
    },
    {
      path: "/:notFound(.*)",
      name: "notFound",
      component: NotFoundView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware: any = to.meta.middleware;

  const context = {
    to,
    from,
    next,
  };
  return middleware[0]({
    ...context,
  });
});

export default router;
