import React from "react";
import { useDispatch } from "react-redux";
import { MdPostAdd } from "react-icons/md";
import { modalFunc } from "../redux/modalSlice";
import { orderFunc } from "../redux/orderSlice";
import { orderNews } from "../redux/newsSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white p-4" style={{zIndex:1000}}>
      <div className="text-3xl">App</div>
      <button onClick={() => dispatch(orderNews('asc'))}>ASC</button>
      <button onClick={() => dispatch(orderNews('desc'))}>DESC</button>
      <div className="flex items-center gap-5">
        <div className="text-black">
          <select className="h-10 rounded-lg" name="sort" id="sort">
            <option value="asc" onClick={() => dispatch(orderNews('desc'))}>ARTAN</option>
            <option value="desc" onClick={() => dispatch(orderNews('asc'))}>AZALAN</option>
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
