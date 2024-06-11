import type { NavigationGuardNext } from "vue-router";

import { user } from "@/services/auth";

export default async function notAuth({ next }: { next: NavigationGuardNext }) {
  try {
    await user();

    return next({
      name: "newsFeed",
    });
  } catch {
    next();
  }
}
