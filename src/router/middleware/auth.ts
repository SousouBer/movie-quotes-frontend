import type { NavigationGuardNext } from "vue-router";

import { user } from "@/services/auth";

import { useUserStore } from "@/stores/userStore";

export default async function auth({ next }: { next: NavigationGuardNext }) {
  const userStore = useUserStore();
  try {
    await user();

    userStore.fetchUser();

    next();
  } catch {
    return next({
      name: "forbidden",
    });
  }
}
