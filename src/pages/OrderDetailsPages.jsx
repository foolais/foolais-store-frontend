import MainLayout from "../components/Layouts/MainLayout";
import OrderDetailsLayout from "../components/Layouts/OrderDetailsLayout";

const OrderDetailsPages = () => {
  return (
    <MainLayout className="lg:max-h-screen lg:overflow-hidden">
      <OrderDetailsLayout />
    </MainLayout>
  );
};

export default OrderDetailsPages;
