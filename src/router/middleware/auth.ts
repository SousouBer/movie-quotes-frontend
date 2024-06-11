import type { NavigationGuardNext } from "vue-router";
import { user } from "@/services/auth";

export default async function auth({ next }: { next: NavigationGuardNext }) {
  try {
    await user();

    next();
  } catch {
    return next({
      name: "forbidden",
    });
  }
}
