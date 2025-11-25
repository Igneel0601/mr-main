// SAFE: no window access during server render
export const getThreshold = () => {
  if (typeof window === "undefined") return 200;
  return Math.max(window.innerHeight * 0.2, 200);
};

export const getFadeDistance = () => {
  if (typeof window === "undefined") return 100;
  return Math.max(window.innerHeight * 0.1, 100);
};
