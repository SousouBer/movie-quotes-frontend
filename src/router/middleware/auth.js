import { user } from "@/services/auth";

export default async function auth({ next }) {
  try {
    await user();

    next();
  } catch {
    return next({
      name: "forbidden",
    });
  }
}
