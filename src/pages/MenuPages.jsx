import FooterMenuAction from "../components/Layouts/FooterMenuAction";
import CardMenuLayout from "../components/Layouts/CardMenuLayout";
import MainLayout from "../components/Layouts/MainLayout";
import Title from "../components/Elements/Text/Title";
import Breadcrumbs from "../components/Fragments/Breadcrumbs";

const MenuPages = () => {
  const data = [
    { text: "Home", link: "/" },
    { text: "Menu", link: "/menu" },
  ];
  return (
    <MainLayout className="pb-[8.5rem]">
      <Title>Daftar Menu</Title>
      <Breadcrumbs data={data} />
      <CardMenuLayout />
      <FooterMenuAction />
    </MainLayout>
  );
};

export default MenuPages;
