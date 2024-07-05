import { useState } from "react";

const useBadge = (initialBadge) => {
  const [badgeData, setBadgeData] = useState(initialBadge);

  const onBadgeChange = (value, callback) => {
    const updateBadgeData = badgeData.map((item) => {
      return {
        ...item,
        color: item.value === value ? "secondary" : "primary",
      };
    });

    setBadgeData(updateBadgeData);
    if (callback && typeof callback === "function") callback();
  };

  const badgeValue = badgeData.find(
    (item) => item.color === "secondary"
  )?.value;

  return { badgeData, badgeValue, onBadgeChange };
};

export default useBadge;
