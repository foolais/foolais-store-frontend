import Swal from "sweetalert2";

export const formatRupiah = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
};

export const sortDataByArray = (data, sortOrder) => {
  data.sort(
    (a, b) => sortOrder.indexOf(a.category) - sortOrder.indexOf(b.category)
  );
  return data;
};

export const getToken = () => {
  return JSON.parse(localStorage.getItem("user"))?.token || "";
};

export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Alert
export const showConfirmationDialog = (text, successTitle, callback) => {
  Swal.fire({
    icon: "warning",
    title: "Warning",
    text,
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
        title: "Success",
        text: successTitle,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
};

export const exitConfirmationDialog = (callback) => {
  Swal.fire({
    icon: "warning",
    title: "Warning",
    text: "Apakah anda yakin ingin keluar?",
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

export const warningDialog = (text) => {
  Swal.fire({
    icon: "warning",
    title: "Warning",
    text,
    confirmButtonColor: "#3085d6",
  });
};

export const successDialog = (text) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text,
    showConfirmButton: false,
    timer: 1500,
  });
};
