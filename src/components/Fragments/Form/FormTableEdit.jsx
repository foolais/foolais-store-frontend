/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import useTable from "../../../hooks/useTable";
import FormInput from "./FormInput";
import Button from "../../Elements/Button/Button";
import useOrder from "../../../hooks/useOrder";
import { successDialog } from "../../../utils/utils";

/* eslint-disable react/prop-types */
const FormTableEdit = ({ closeModal }) => {
  const { table, loading, getAllTableData } = useTable();
  const { onSetSingleOrderTable, setShowTableEditModal } = useOrder();

  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    getAllTableData();
  }, []);

  useEffect(() => {
    const mappedTable = table?.map((item) => {
      return {
        text: item?.name,
        value: item?._id,
      };
    });
    setTableData(mappedTable);
  }, [table]);

  const handleSelectedTable = (selectedData) => {
    if (selectedData) {
      const getTable = table?.find((item) => item?._id === selectedData.value);
      setSelectedTable(getTable);
    } else {
      setSelectedTable(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await onSetSingleOrderTable(selectedTable);
    if (response) {
      successDialog("Berhasil Mengedit Meja Pesanan");
      closeModal();
    }
  };

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>;
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4">
      <FormInput
        isAutoComplete={true}
        title="Meja"
        name="table"
        data={tableData}
        placeholder="Pilih Meja..."
        value={selectedTable?.name}
        onSelect={(selectedData) => handleSelectedTable(selectedData)}
      />
      <FormInput
        isInput={true}
        title="Kategori"
        name="category"
        defaultValue={selectedTable?.category}
        placeholder="Autofill Kategori..."
        isDisabled={true}
      />
      <Button
        className="bg-secondary text-white mt-4 w-full"
        disabled={selectedTable === null}
      >
        Edit Meja
      </Button>
    </form>
  );
};

export default FormTableEdit;
