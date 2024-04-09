import Title from "../components/Elements/Text/Title";
import Breadcrumbs from "../components/Fragments/Breadcrumbs";
import MainLayout from "../components/Layouts/MainLayout";

const HomePages = () => {
  const data = [{ text: "Home", link: "/" }];
  return (
    <MainLayout>
      <Title>Home</Title>
      <Breadcrumbs data={data} />
    </MainLayout>
  );
};

export default HomePages;
