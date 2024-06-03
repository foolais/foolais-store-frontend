import Counter from "../Fragments/Counter";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "../Fragments/Modal";
import FormMenu from "../Fragments/FormMenu";
import useFooterMenu from "../../hooks/useFooterMenu";
import useBadge from "../../hooks/useBadge";
import FooterLayouts from "./Footer/FooterLayouts";
import BadgeStatus from "../Fragments/BadgeStatus";
import { useEffect } from "react";

const FooterMenuAction = () => {
  const initialBadge = [
    { text: "Makan Di Tempat", color: "secondary", value: "dine_in" },
    { text: "Bawa Pulang", color: "primary", value: "take_away" },
  ];

  const {
    selectedMenu,
    setSelectedMenu,
    tableCart,
    updateMenuModal,
    setUpdateMenuModal,
    handleChangeQuantity,
    onUpdateMenu,
    onCloseModal,
    getTitleData,
    resetTableCart,
    onAddToCart,
  } = useFooterMenu();

  const { badgeData, badgeValue, onBadgeChange } = useBadge(initialBadge);

  useEffect(() => {
    setSelectedMenu((prev) => {
      return {
        ...prev,
        is_take_away: badgeValue === "take_away",
      };
    });
  }, [badgeValue, setSelectedMenu]);

  return (
    <FooterLayouts>
      <div className="flex items-center gap-2 mb-2">
        <FooterLayouts.Title
          title={getTitleData()}
          isWithCloseBtn={tableCart !== null}
          onClickCloseBtn={resetTableCart}
        />
        <div
          className={`tooltip tooltip-right ${
            !selectedMenu?.name ? "opacity-0 scale-0" : "opacity-100"
          } ease-in-out duration-300 cursor-pointer`}
          data-tip="Ubah Menu"
          onClick={() => setUpdateMenuModal(true)}
        >
          <AiOutlineEdit size={20} />
        </div>
      </div>
      <div className="grid grid-cols-[30%_10px_auto] gap-4">
        <p className="font-bold text-md flex items-center">Tipe Makan </p>
        <span className="flex items-center">:</span>
        <BadgeStatus
          data={badgeData}
          isClickable={selectedMenu?.name}
          onBadgeChange={onBadgeChange}
        />
        <p className="font-bold text-md flex items-center">Jumlah</p>
        <span className="flex items-center">:</span>
        <Counter
          value={selectedMenu ? selectedMenu?.quantity : 1}
          className="justify-start"
          handleCounter={handleChangeQuantity}
          disabled={!selectedMenu?.name}
        />
      </div>
      <FooterLayouts.BtnAction
        disabled={!selectedMenu?.name}
        onClick={onAddToCart}
      >
        Tambah Ke Keranjang
      </FooterLayouts.BtnAction>
      {/* Modal Update Menu  */}
      <Modal
        key={selectedMenu?._id}
        title={`Ubah Menu Untuk ${selectedMenu?.name}`}
        showModal={updateMenuModal}
        closeModal={() => onCloseModal()}
      >
        <FormMenu
          isEdit={true}
          btnText="Ubah"
          defaultValue={selectedMenu}
          onSubmit={(event) => onUpdateMenu(event, selectedMenu._id)}
        />
      </Modal>
    </FooterLayouts>
  );
};

export default FooterMenuAction;
