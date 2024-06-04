import AutoComplete from "../components/Elements/Input/AutoComplete";
import Title from "../components/Elements/Text/Title";
import Breadcrumbs from "../components/Fragments/Breadcrumbs";
import MainLayout from "../components/Layouts/MainLayout";

const HomePages = () => {
  const data = [{ text: "Home", link: "/" }];
  const dropdownData = [
    { name: "hello", value: "hello" },
    { name: "tes", value: "tes" },
  ];
  const handleSelect = (selectedValue) => {
    console.log({ selectedValue });
  };
  return (
    <MainLayout>
      <Title>Home</Title>
      <Breadcrumbs data={data} />
      <AutoComplete
        name="test"
        widthClassName="min-w-52 max-w-52"
        placeholder="Masukkan Nama"
        data={dropdownData}
        onSelect={handleSelect}
      />
    </MainLayout>
  );
};

export default HomePages;
