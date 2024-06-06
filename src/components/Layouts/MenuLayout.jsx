import CardAddNew from "../Fragments/Card/CardAddNew";
import Modal from "../Fragments/Modal/Modal";
import FormMenu from "../Fragments/FormMenu";
import CardMenu from "../Fragments/Card/CardMenu";
import useMenu from "../../hooks/useMenu";
import BadgeStatus from "../Fragments/BadgeStatus";
import FooterMenuAction from "../Fragments/Footer/FooterMenuAction";
import Title from "../Elements/Text/Title";
import Breadcrumbs from "../Fragments/Breadcrumbs";

const CardMenuLayout = () => {
  const {
    menu,
    badgeData,
    filteredMenu,
    searchData,
    addMenuModal,
    setAddMenuModal,
    onCloseModal,
    onSelectedMenu,
    onBadgeChange,
    onAddMenu,
    onDeleteMenu,
  } = useMenu();

  const breadCrumbsData = [
    { text: "Home", link: "/" },
    { text: "Menu", link: "/menu" },
  ];

  return (
    <div className="w-full h-auto">
      <Title>Daftar Menu</Title>
      <Breadcrumbs data={breadCrumbsData} />
      <BadgeStatus
        data={badgeData}
        isClickable={true}
        onBadgeChange={onBadgeChange}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-36">
        {searchData && menu && menu.length === 0 && (
          <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
            {`Tidak Ada Menu Untuk "${searchData}" `}
          </div>
        )}
        <CardAddNew
          title="Tambah Menu Baru"
          cardClassName="min-h-32 h-auto min-w-48"
          titleClassName="font-semibold mt-4"
          actionClassName="mt-4"
          btnOnClick={() => setAddMenuModal(true)}
        />
        {filteredMenu &&
          filteredMenu.length > 0 &&
          filteredMenu.map((item) => {
            return (
              <CardMenu
                key={item._id}
                item={item}
                onCardClick={() => onSelectedMenu(item._id)}
                onCardDelete={() => onDeleteMenu(item)}
              />
            );
          })}
      </div>
      <Modal
        title="Tambah Menu Baru"
        showModal={addMenuModal}
        closeModal={() => onCloseModal()}
      >
        <FormMenu
          onSubmit={(event) => onAddMenu(event)}
          btnText="Tambah Menu"
        />
      </Modal>
      <FooterMenuAction />
    </div>
  );
};

export default CardMenuLayout;
