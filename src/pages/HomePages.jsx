import Title from "../components/Elements/Text/Title";
import ChartOverview from "../components/Layouts/ChartOverview";
import DashboardStatsCard from "../components/Layouts/DashboardStatsCard";
import MainLayout from "../components/Layouts/MainLayout";

const HomePages = () => {
  return (
    <MainLayout>
      <Title>Halaman Utama</Title>
      <div className="xl:flex xl:w-auto xl:gap-20">
        <DashboardStatsCard />
        <ChartOverview />
      </div>
    </MainLayout>
  );
};

export default HomePages;
