import CardAddNew from "../Fragments/CardAddNew";
import Modal from "../Fragments/Modal";
import FormMenu from "../Fragments/FormMenu";
import CardMenu from "../Fragments/Card/CardMenu";
import useMenu from "../../hooks/useMenu";

const CardMenuLayout = () => {
  const {
    menu,
    searchData,
    addMenuModal,
    setAddMenuModal,
    onCloseModal,
    onSelectedMenu,
    onDeleteMenu,
    onAddMenu,
  } = useMenu();

  return (
    <div className="w-full h-auto">
      <div className="flex items-center justify-around flex-wrap gap-8">
        {searchData && menu && menu.length === 0 && (
          <div className="w-full flex items-center justify-center text-neutral p-4 font-semibold">
            {`Tidak Ada Menu Untuk "${searchData}" `}
          </div>
        )}
        <CardAddNew
          title="Tambah Menu Baru"
          cardClassName="min-h-32 max-h-32"
          titleClassName="font-semibold mt-4"
          actionClassName="mt-4"
          btnOnClick={() => setAddMenuModal(true)}
        />
        {menu &&
          menu.length > 0 &&
          menu.map((item) => {
            return (
              <CardMenu
                key={item._id}
                item={item}
                onCardClick={() => onSelectedMenu(item._id)}
                onCardDelete={() => onDeleteMenu(item)}
              />
            );
          })}
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
      </div>
    </div>
  );
};

export default CardMenuLayout;
