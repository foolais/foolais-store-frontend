/* eslint-disable react-hooks/exhaustive-deps */
import CardAddNew from "../Fragments/Card/CardAddNew";
import Modal from "../Fragments/Modal/Modal";
import FormMenu from "../Fragments/FormMenu";
import useMenu from "../../hooks/useMenu";
import BadgeStatus from "../Fragments/BadgeStatus";
import FooterMenuAction from "../Fragments/Footer/FooterMenuAction";
import Title from "../Elements/Text/Title";
import Breadcrumbs from "../Fragments/Breadcrumbs";
import Skeleton from "../Fragments/Skeleton/Skeleton";
import CardMenu from "../Fragments/Card/CardMenu";
import { useEffect } from "react";

const CardMenuLayout = () => {
  const {
    menu,
    badgeData,
    loading,
    filteredMenu,
    searchData,
    addMenuModal,
    setAddMenuModal,
    onCloseModal,
    onSelectedMenu,
    onBadgeChange,
    onAddMenu,
    onDeleteMenu,
    getAllMenuData,
  } = useMenu();

  const breadCrumbsData = [
    { text: "Home", link: "/" },
    { text: "Menu", link: "/menu" },
  ];

  useEffect(() => {
    getAllMenuData();
  }, []);

  return (
    <div className="w-full h-auto">
      <Title>Daftar Menu</Title>
      <Breadcrumbs data={breadCrumbsData} />
      {menu && menu?.length > 0 && !loading && (
        <BadgeStatus
          data={badgeData}
          isClickable={true}
          onBadgeChange={onBadgeChange}
          isWithCircleIcon={true}
          type="menu"
        />
      )}
      <div className="lg:flex lg:justify-between lg:gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-36 mt-4 lg:mb-0 lg:h-auto lg:max-h-[calc(100vh-15rem)] lg:overflow-auto lg:pr-4 lg:pb-4 lg:pl-0 lg:w-full">
          {searchData && menu && menu.length === 0 && !loading ? (
            <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
              {`Tidak Ada Menu Untuk "${searchData}" `}
            </div>
          ) : loading ? (
            <Skeleton.List
              total={4}
              className="min-w-42 md:min-w-48 min-h-24 md:min-h-36"
            />
          ) : (
            <>
              <CardAddNew
                title="Tambah Menu Baru"
                cardClassName="min-h-24 md:min-h-36 h-auto min-w-42 md:min-w-48 xl:w-auto"
                titleClassName="font-semibold text-center text-[1rem] md:text-md"
                actionClassName="mt-2"
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
            </>
          )}
        </div>
        {!loading && (
          <>
            {addMenuModal && !loading && (
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
            )}
            {menu && menu?.length > 0 && !loading && <FooterMenuAction />}
          </>
        )}
      </div>
    </div>
  );
};

export default CardMenuLayout;
