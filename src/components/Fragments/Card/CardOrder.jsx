import Button from "../../Elements/Button/Button";

const CardOrder = () => {
  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg flex justify-between border-[1px] border-secondary">
      <div className="w-1/2">
        <p className="font-bold text-2xl">Pesanan : #1</p>
        <p className="font-semibold text-lg my-1">Meja : 2</p>
        <p className="font-semibold text-sm">Status: Selesai</p>
      </div>
      <div className="w-auto flex flex-col justify-end">
        <p className="text-right">17/11/2022, 20:30 PM</p>
        <p className="text-right font-semibold my-1">Rp. 100.000</p>
        <Button className="btn-sm bg-secondary">Lihat Detail -</Button>
      </div>
    </div>
  );
};

export default CardOrder;
