import { useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import Title from "../components/Elements/Text/Title";
import Breadcrumbs from "../components/Fragments/Breadcrumbs";
import OrderDetailsLayout from "../components/Layouts/OrderDetailsLayout";

const OrderDetailsPages = () => {
  const { id } = useParams();

  const data = [
    { text: "Home", link: "/" },
    { text: "Pesanan", link: "/pesanan" },
    { text: "Detail", link: `/pesanan/${id}` },
  ];

  return (
    <MainLayout>
      <Title>Detail Pesanan</Title>
      <Breadcrumbs data={data} />
      <OrderDetailsLayout />
    </MainLayout>
  );
};

export default OrderDetailsPages;