import Swal from "sweetalert2";

export const formatRupiah = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

// Alert
export const showConfirmationDialog = (title, successTitle, callback) => {
  Swal.fire({
    title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(true);
      Swal.fire({
        icon: "success",
        title: successTitle,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};

export const exitConfirmationDialog = (callback) => {
  Swal.fire({
    title: "Apakah anda yakin ingin keluar?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak",
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(true);
    }
  });
};

export const warningDialog = (title) => {
  Swal.fire({
    icon: "warning",
    title,
    confirmButtonColor: "#3085d6",
  });
};
