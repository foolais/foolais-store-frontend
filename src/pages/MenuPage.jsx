import FooterAction from "../components/Layouts/FooterAction";
import CardMenuLayout from "../components/Layouts/CardMenuLayout";
import MainLayout from "../components/Layouts/MainLayout";

const MenuPage = () => {
  return (
    <MainLayout>
      <CardMenuLayout />
      <FooterAction />
    </MainLayout>
  );
};

export default MenuPage;
