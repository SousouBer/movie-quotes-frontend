import { ref, onMounted, onUnmounted } from "vue";

export function useDateFormatter(dateString: string) {
  const timeAgo = ref<string>("");

  const calculateTimeAgo = (): void => {
    const createdAt = new Date(dateString);
    const now = new Date();

    const diffMs = now.getTime() - createdAt.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffMinutes < 1) {
      timeAgo.value = "Just now";
    } else if (diffMinutes === 1) {
      timeAgo.value = "1 minute ago";
    } else if (diffMinutes < 60) {
      timeAgo.value = `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 120) {
      timeAgo.value = "1 hour ago";
    } else if (diffMinutes < 1440) {
      const diffHours = Math.floor(diffMinutes / 60);
      timeAgo.value = `${diffHours} hours ago`;
    } else {
      const diffDays = Math.floor(diffMinutes / 1440);
      timeAgo.value = `${diffDays} days ago`;
    }
  };

  let timer: ReturnType<typeof setInterval>;
  onMounted((): void => {
    calculateTimeAgo();
    timer = setInterval(calculateTimeAgo, 60000);
  });

  onUnmounted((): void => {
    clearInterval(timer);
  });

  return {
    timeAgo,
  };
}
