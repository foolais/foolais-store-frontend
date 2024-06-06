import Title from "../components/Elements/Text/Title";
import Breadcrumbs from "../components/Fragments/Breadcrumbs";
import CardCartLayout from "../components/Layouts/CardCartLayout";
import FooterCartAction from "../components/Layouts/Footer/FooterCartAction";
import MainLayout from "../components/Layouts/MainLayout";

const CartPages = () => {
  const data = [
    { text: "Home", link: "/" },
    { text: "Keranjang", link: "/keranjang" },
  ];
  return (
    <MainLayout className="pb-[8.5rem]">
      <Title>Keranjang</Title>
      <Breadcrumbs data={data} />
      <CardCartLayout />
      <FooterCartAction />
    </MainLayout>
  );
};

export default CartPages;
