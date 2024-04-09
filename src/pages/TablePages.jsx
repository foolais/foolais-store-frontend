import MainLayout from "../components/Layouts/MainLayout";
import CardTableLayout from "../components/Layouts/CardTableLayout";
import Title from "../components/Elements/Text/Title";

const TablePages = () => {
  return (
    <MainLayout>
      <Title>Daftar Meja</Title>
      <CardTableLayout />
    </MainLayout>
  );
};

export default TablePages;
