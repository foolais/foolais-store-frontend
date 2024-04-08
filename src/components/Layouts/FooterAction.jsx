import Counter from "../Fragments/Counter";
import Divider from "../Elements/Divider/Divider";
import CardMenu from "../Fragments/CardMenu";
import Button from "../Elements/Button/Button";
import { AiOutlineRight } from "react-icons/ai";

const FooterAction = () => {
  return (
    <div className="fixed bottom-0 right-0 left-0 h-28 bg-neutral ml-16 flex">
      {/* Title Name */}
      <div className="absolute -top-6 left-0 bg-accent py-2 px-4 rounded-r-md text-secondary font-semibold">
        Mie Ayam Bakso
      </div>
      {/* Counter */}
      <Counter value={1} className="ml-2 pt-2" />
      <Divider className="divider-horizontal" />
      <div className="flex flex-col gap-2 justify-center pt-2">
        {/* Tipe */}
        <CardMenu.Type />
        {/* Catatan */}
        <CardMenu.Notes
          textButton="Lihat Catatan"
          title="Catatan"
          btnClassName="btn-sm btn-outline"
        />
      </div>
      <Divider className="divider-horizontal" />
      <div className="flex items-center pt-2">
        <Button className="bg-accent text-secondary">
          Tambah
          <AiOutlineRight size={15} />
        </Button>
      </div>
      {/* Button Add */}
    </div>
  );
};

export default FooterAction;
