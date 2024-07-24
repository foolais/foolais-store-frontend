import Title from "../components/Elements/Text/Title";
import ChartOverview from "../components/Layouts/ChartOverview";
import DashboardStatsCard from "../components/Layouts/DashboardStatsCard";
import MainLayout from "../components/Layouts/MainLayout";

const HomePages = () => {
  return (
    <MainLayout>
      <Title>Halaman Utama</Title>
      <DashboardStatsCard />
      <ChartOverview />
    </MainLayout>
  );
};

export default HomePages;
