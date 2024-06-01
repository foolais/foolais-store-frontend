import Title from "../components/Elements/Text/Title";
import Breadcrumbs from "../components/Fragments/Breadcrumbs";
import MainLayout from "../components/Layouts/MainLayout";
import OrderLayout from "../components/Layouts/OrderLayout";

const OrderPages = () => {
  const data = [
    { text: "Home", link: "/" },
    { text: "Pesanan", link: "/pesanan" },
  ];
  return (
    <MainLayout>
      <Title>Pesanan</Title>
      <Breadcrumbs data={data} />
      <OrderLayout />
    </MainLayout>
  );
};

export default OrderPages;
