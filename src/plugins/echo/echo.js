import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_APP_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_APP_PUSHER_APP_CLUSTER,
  forceTLS: true,
});
