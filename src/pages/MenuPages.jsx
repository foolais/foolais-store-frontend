import FooterAction from "../components/Layouts/FooterAction";
import CardMenuLayout from "../components/Layouts/CardMenuLayout";
import MainLayout from "../components/Layouts/MainLayout";
import Title from "../components/Elements/Text/Title";

const MenuPages = () => {
  return (
    <MainLayout>
      <Title>Daftar Menu</Title>
      <CardMenuLayout />
      <FooterAction />
    </MainLayout>
  );
};

export default MenuPages;
