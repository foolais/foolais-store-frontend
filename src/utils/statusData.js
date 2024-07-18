// * MENU
export const setColorMenu = (category) => {
  switch (category) {
    case "all":
      return "bg-neutral";
    case "food":
      return "bg-primary-badge";
    case "drink":
      return "bg-secondary-badge";
    case "extra":
      return "bg-ternary-badge";
    default:
      return "bg-primary-badge";
  }
};

export const setCategoryMenu = (category) => {
  switch (category) {
    case "food":
      return "Makanan";
    case "drink":
      return "Minuman";
    case "extra":
      return "Tambahan";
    default:
      return "Makanan";
  }
};

// * TABLE
export const setStatusTable = (status) => {
  switch (status) {
    case "empty":
      return "Kosong";
    case "waiting":
      return "Menunggu";
    case "eating":
      return "Makan";
    default:
      return "Kosong";
  }
};

export const setColorTable = (status) => {
  switch (status) {
    case "all":
      return "bg-neutral";
    case "empty":
      return "bg-success";
    case "waiting":
      return "bg-warning";
    case "eating":
      return "bg-info";
    case "finished":
      return "bg-primary";
    default:
      return "bg-success";
  }
};

export const setTypeTable = (type) => {
  switch (type) {
    case "dine_in":
      return "Makan Ditempat";
    case "take_away":
      return "Dibawa Pulang";
    default:
      return "Makan Ditempat";
  }
};

// * ORDER
export const setColorOrder = (status) => {
  switch (status) {
    case "all":
      return "bg-neutral";
    case "onProccess":
      return "bg-warning";
    case "finished":
      return "bg-success";
    default:
      return "bg-primary";
  }
};
