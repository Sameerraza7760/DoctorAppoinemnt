export const formatTime = (timeString: number) => {
  const date = new Date(timeString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
