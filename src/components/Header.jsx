import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPostAdd } from "react-icons/md";
import { modalFunc } from "../redux/modalSlice";
import { filterNews, orderNews, setInputText } from "../redux/newsSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [inputVal, setInputVal] = useState([]);
  const inputText = useSelector(state => state.news.inputText)

  const handleChange = (e) => {
    setInputVal(e.target.value);

  };

  useEffect(() => {
    console.log("input Val : ", inputVal);
    dispatch(setInputText(inputVal))
    dispatch(filterNews(inputVal))

  }, [inputVal]); // inputVal değiştikçe bu effect çalışacak


  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white p-4" style={{ zIndex: 1000 }}>
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
          className="h-10 rounded-lg px-4 text-black"
          type="text"
          value={inputVal}
          onChange={handleChange}
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
