// * TABLE
export const setStatusTable = (status) => {
  switch (status) {
    case "empty":
      return "Kosong";
    case "waiting":
      return "Menunggu";
    case "eating":
      return "Makan";
    case "finished":
      return "Selesai";
    default:
      return "Tersedia";
  }
};

export const setColorTable = (status) => {
  switch (status) {
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
