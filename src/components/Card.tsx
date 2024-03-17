import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

type Props = { data: any; setDeal: any; deals: any };

const Card = ({ data, setDeal, deals }: Props) => {
  const [detailsModal, setDetailsModal] = useState(false);

  const addDeal = () => {
    setDeal([...deals, data]);
    toast.success("Deal added");
  };

  return (
    <div className="lg:col-span-3 md:col-span-4 col-span-12 sm:col-span-6 h-[350px] border bg-white border-gray-400 rounded-xl shadow-lg">
      <img
        src={data.image}
        className="w-full h-[250px] object-contain"
        alt=""
      />
      <div className="px-3 font-semibold text-md mt-1 w-full text-center truncate">
        {data.title}
      </div>
      <div className="mt-2 w-full flex justify-center gap-4">
        <button
          onClick={addDeal}
          className="px-3 py-2 bg-[#008CBA] rounded-lg text-white"
        >
          Add to deals
        </button>
        <button
          onClick={() => setDetailsModal(true)}
          className="px-3 py-2 bg-[#008CBA] rounded-lg text-white"
        >
          Check Details
        </button>
      </div>
      <Modal isOpen={detailsModal} onClose={() => setDetailsModal(false)}>
        <div>
          <div className="flex items-center justify-center">
            <img
              src={data.image}
              className="w-[200px] h-[250px] object-contain"
              alt=""
            />
          </div>
          <div className="font-semibold">{data.title}</div>
          <div>{data.description}</div>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
