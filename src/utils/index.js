export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const getActionbByType = (type) => {
  switch (type) {
    case "create":
      return "New Vesting Contract Created";
    case "claim":
      return "Claimed";
    case "release":
      return "Released";
    default:
      return "No action";
  }
};
