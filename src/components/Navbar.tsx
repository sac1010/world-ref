import React from "react";

type props = { setLogoutModal: any; logout: any; deals: any };

const Navbar = ({ setLogoutModal, logout, deals }: props) => {
  return (
    <div className="h-16 border-b border-gray-400 shadow-xl fixed top-0 left-0 w-full bg-gray-100 z-10 flex items-center justify-between px-8">
      <div className="text-lg font-bold">My Deals</div>
      <div className="flex gap-10">
        <div className="font-semibold">Deals: {deals.length}</div>
        <button className="" onClick={() => setLogoutModal(true)}>
          <img src={logout} alt="logout" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
