import { user } from "@/services/auth";

export default async function notAuth({ next }) {
  try {
    await user();

    return next({
      name: "newsFeed",
    });
  } catch {
    next();
  }
}
