import MenuLayout from "../components/Layouts/MenuLayout";
import MainLayout from "../components/Layouts/MainLayout";

const MenuPages = () => {
  return (
    <MainLayout className="pb-[8.5rem] lg:pb-[10.5rem] lg:max-h-screen lg:overflow-hidden">
      <MenuLayout />
    </MainLayout>
  );
};

export default MenuPages;
