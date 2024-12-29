import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPostAdd } from "react-icons/md";
import { modalFunc } from "../redux/modalSlice";
import { filterNews, orderNews, setInputText } from "../redux/newsSlice";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../redux/sidebarSlice";

const Header = () => {
  const dispatch = useDispatch();
  const inputText = useSelector((state) => state.news.inputText);
  const isOpen = useSelector((state) => state.sidebar.showSidebar)

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Update input text in Redux state and apply filter
  const handleInputChange = (e) => {
    const value = e.target.value;
    dispatch(setInputText(value));
    dispatch(filterNews(value));
  };

  // Toggle settings menu visibility
  const toggleSettingsMenu = () => {
    setShowSettingsMenu((prev) => !prev);
  };

  // Handle ordering of news
  const handleOrderChange = (order) => {
    dispatch(orderNews(order));
  };


  const adjustSidebar = () => {
    console.log("Is open : ", isOpen);

    dispatch(toggleSidebar(!isOpen));
  };


  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white p-4 z-50">

      <p onClick={adjustSidebar}>X</p>
      {/* Logo */}
      <Link to="/" className="text-3xl">
        App
      </Link>

      {/* Sorting buttons for larger screens
      <div className="hidden md:flex gap-4">
        <button
          onClick={() => handleOrderChange("asc")}
          className="bg-indigo-800 p-2 rounded text-white"
        >
          ARTAN
        </button>
        <button
          onClick={() => handleOrderChange("desc")}
          className="bg-indigo-800 p-2 rounded text-white"
        >
          AZALAN
        </button>
      </div> */}

      {/* Content Section (Search, Post, Profile) */}
      <div className="flex items-center gap-5">
        {/* Sort Dropdown */}
        <div className="text-black hidden md:block">
          <select
            className="h-10 rounded-lg px-4"
            name="sort"
            id="sort"
            onChange={(e) => handleOrderChange(e.target.value)}
            value={inputText}
          >
            <option value="asc">ARTAN</option>
            <option value="desc">AZALAN</option>
          </select>
        </div>

        {/* Search Input */}
        <input
          className="h-10 rounded-lg px-4 text-black"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Arama yap..."
        />

        {/* Add Post Button */}
        <button
          className="bg-indigo-800 w-10 h-10 rounded-full flex items-center justify-center"
          onClick={() => dispatch(modalFunc())}
          aria-label="Create New Post"
        >
          <MdPostAdd size={24} />
        </button>


        {!isLoggedIn && (
          <div>
            <Link to="/login" className="block p-2 hover:bg-indigo-700 rounded">
              Giriş Yap
            </Link>
          </div>
        )}


        {isLoggedIn && (
          <div className="relative">
            <button
              className="text-white"
              onClick={toggleSettingsMenu}
              aria-label="Profile Menu"
            >
              Profil
            </button>

            {/* Profile Dropdown Menu */}
            {showSettingsMenu && (
              <div
                className="absolute top-10 right-0 p-3 bg-black text-white rounded z-50"
                aria-label="Profile options"
              >
                <ul>
                  <li>
                    <Link to="/profile" className="block p-2 hover:bg-indigo-700 rounded">
                      Hesabım
                    </Link>
                  </li>
                  <li>
                    <Link to="/plans" className="block p-2 hover:bg-indigo-700 rounded">
                      Planlarım
                    </Link>
                  </li>
                  <li>
                    <Link to="/calendar" className="block p-2 hover:bg-indigo-700 rounded">
                      Takvim
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" className="block p-2 hover:bg-indigo-700 rounded">
                      Ayarlar
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Sorting Buttons
      <div className="md:hidden flex flex-col gap-4">
        <button
          onClick={() => handleOrderChange("asc")}
          className="bg-indigo-800 p-2 rounded text-white w-full"
        >
          ARTAN
        </button>
        <button
          onClick={() => handleOrderChange("desc")}
          className="bg-indigo-800 p-2 rounded text-white w-full"
        >
          AZALAN
        </button>
      </div> */}
    </div>
  );
};

export default Header;
