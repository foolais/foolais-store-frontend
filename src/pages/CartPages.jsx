import CartLayout from "../components/Layouts/CartLayout";
import MainLayout from "../components/Layouts/MainLayout";

const CartPages = () => {
  return (
    <MainLayout className="pb-[8.5rem] lg:pb-[10.5rem] min-h-screen lg:max-h-screen lg:overflow-hidden">
      <CartLayout />
    </MainLayout>
  );
};

export default CartPages;
