import React from "react";
import { useDispatch } from "react-redux";
import { MdPostAdd } from "react-icons/md";
import { modalFunc } from "../redux/modalSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white p-4">
      <div className="text-3xl">REACT UYGULAMA</div>
      <div className="flex items-center gap-5">
        <div className="text-black">
          <select className="h-10 rounded-lg" name="sort" id="sort">
            <option value="asc">ARTAN</option>
            <option value="desc">AZALAN</option>
          </select>
        </div>
        <input
          className="h-10 rounded-lg px-4"
          type="text"
          placeholder="Arama yap..."
        />
        <button className="bg-indigo-800 w-10 h-10 rounded-full flex items-center justify-center"
          onClick={() => dispatch(modalFunc())}>

          <MdPostAdd size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
