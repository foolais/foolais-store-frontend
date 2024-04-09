import MainLayout from "../components/Layouts/MainLayout";
import CardTableLayout from "../components/Layouts/CardTableLayout";
import Title from "../components/Elements/Text/Title";
import Breadcrumbs from "../components/Fragments/Breadcrumbs";

const TablePages = () => {
  const data = [
    { text: "Home", link: "/" },
    { text: "Meja", link: "/meja" },
  ];
  return (
    <MainLayout>
      <Title>Daftar Meja</Title>
      <Breadcrumbs data={data} />
      <CardTableLayout />
    </MainLayout>
  );
};

export default TablePages;
