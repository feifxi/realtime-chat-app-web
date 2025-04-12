import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import avatar from "../assets/image/avatar.jpg";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineSettings } from "react-icons/md";
import { MdDehaze } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { TbMessageFilled } from "react-icons/tb";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [showDropDown, setShowDropDown] = useState(false);

  const handleToggleMenu = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <>
      <header className="fixed top-0 z-40 px-8 sm:px-16 py-3 w-full bg-base-100 border-b border-base-300 ">
        <nav className="flex justify-between items-center mx-auto max-w-screen-2xl">
          <Link
            className="flex items-center gap-1 sm:text-xl font-semibold text-primary"
            to={"/"}
          >
            {/* <MdOutlineChat className="text-2xl sm:text-3xl" /> */}
            <TbMessageFilled className="text-2xl sm:text-3xl" />
            ChanomTalk
          </Link>

          <div className="flex gap-5 justify-center items-center max-sm:hidden">
            <Link to={"/settings"}>
              <button className="btn bg-base-300 btn-sm">
                <MdOutlineSettings className="text-2xl" />
                <span>Settings</span>
              </button>
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="flex order-first">
                  <div className="avatar active:scale-95 transition">
                    <div className="w-10 rounded-xl">
                      <img src={authUser.profilePic || avatar} />
                    </div>
                  </div>
                </Link>

                <button
                  className="flex justify-center items-center gap-2 py-2 px-3 font-bold rounded hover:bg-base-300 transition-all group"
                  onClick={logout}
                >
                  <FiLogOut className="text-2xl" />
                  <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 duration-300 ease-in-out transition-all">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
          {/* Mobile Hamburger Menu */}
          <div
            className="sm:hidden cursor-pointer text-2xl"
            onClick={handleToggleMenu}
          >
            {showDropDown ? <IoMdClose /> : <MdDehaze />}
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {showDropDown && (
        <div
          className="fixed top-0 left-0 z-30 flex justify-end w-full min-h-screen bg-black/50  pt-[48px] sm:hidden"
          onClick={() => {
            setShowDropDown(false);
          }}
        >
          <div className="flex-1 max-w-[60%] min-h-screen bg-base-200">
            <Link
              to={"/settings"}
              className="flex items-center gap-2 font-bold hover:bg-base-300 p-5"
            >
              <MdOutlineSettings className="text-2xl" />
              Settings
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="flex items-center gap-2 font-bold hover:bg-base-300 p-5"
                >
                  <FaRegUser className="text-2xl" />
                  Profile
                </Link>

                <div
                  onClick={logout}
                  className="flex items-center gap-2 font-bold hover:bg-base-300 p-5"
                >
                  <FiLogOut className="text-2xl" />
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
