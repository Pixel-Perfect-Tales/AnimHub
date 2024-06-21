import  { useState, useEffect, useRef, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCircleUser } from "react-icons/fa6";
import {
  dropdownItemsRightSidebar,
  dropdownColumnsRightSidebar,
} from "./constants";
import { Login, Signup } from "../Popups/";
import { usePopupContext } from "../../context/PopupContextProvider";
import { AuthContext } from "../../context/AuthContextProviders";
import { auth } from "../../firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContextProvider";

const RightSidebar = ({ isRightSidebarOpen, setIsRightSidebarOpen }) => {
  const navigate = useNavigate();
  //   const [isOpen, setIsOpen] = useState(isRightSidebarOpen);
  const { isOpen, popupContent, openPopup, closePopup } = usePopupContext();
  const [auth1, setAuth] = useState(false);
  const { userData } = useUserContext();

  const handleOpenPopup = (popup) => {
    const content = (
      <>
        <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-[#00000070] z-20 p-6">
          <div className="relative flex justify-center items-center bg-[#151515]  h-auto w-auto flex-col gap-4 rounded-md">
            {popup === "signup" && <Signup closePopup={closePopup} />}
            {popup === "login" && <Login closePopup={closePopup} />}
            <button className="absolute top-2 right-2" onClick={closePopup}>
              <RxCross2 className="text-3xl text-[#6a6a6a]" />
            </button>
          </div>
        </div>
      </>
    );
    openPopup(content);
  };
  const userAuth = useContext(AuthContext);
  useEffect(() => {
    setAuth(userAuth.user ? true : false);
  }, [userAuth]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsRightSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isRightSidebarOpen) {
      document.addEventListener("mousedown", closeDropdown);
    } else {
      document.removeEventListener("mousedown", closeDropdown);
    }

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [isRightSidebarOpen]);

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="">
          {auth1 ? (
            <img
              className="w-12 h-12 max-sm:h-9 max-sm:w-9 rounded-full ring-1 ring-white ring-opacity-20 hover:ring-opacity-60 hover:ring-2 transition duration-30"
              src={auth?.currentUser?.photoURL}
              alt=""
            />
          ) : (
            <FaCircleUser className="text-[#c6c6c6] text-4xl" />
          )}
        </button>

        {isRightSidebarOpen && (
          <>
            <div
              className={`bg-[#151515] origin-top-right absolute z-10 right-0 mt-2 ${
                auth1 ? "w-[17.5rem]" : "w-24"
              } rounded-md shadow-lg border-[#151515] border-2 `}
            >
              {auth1 ? (
                <>
                  <div className="px-4 py-2 flex flex-col items-left justify-start ">
                    <div className="flex justify-between items-center w-full ">
                      <div className="flex flex-col items-left justify-start w-full">
                        <Link
                          to="/dashboard"
                          className="text-white text-xl max-sm:text-lg max-sm:font-semibold font-bold"
                        >
                          {userData?.username}
                        </Link>
                        <h3 className="text-white text-sm font-bold max-sm:font-medium">
                          See your profile
                        </h3>
                      </div>
                      <button
                        onClick={() => {
                          signOut(auth);
                          navigate("/");
                        }}
                        className="flex justify-end items-end w-full p-2"
                      >
                        <PiSignOutBold className="text-[#c6c6c6] text-4xl max-sm:text-2xl" />
                      </button>
                    </div>
                    {/* <hr className="border-[#c6c6c6] border-1" /> */}

                    <ul className="py-2 px-0 flex flex-col items-right justify-center ">
                      {dropdownItemsRightSidebar.map((item, index) => (
                        <li
                          key={index}
                          className={`bg-[#151515] pb-2 font-bold flex flex-col justify-start items-center gap-2 relative rounded-xl `}
                        >
                          <button
                            className={`w-full ${
                              item.special
                                ? "hover:bg-[#5a93ee]"
                                : "hover:bg-[#2b2b2b]"
                            } p-4 rounded-xl flex justify-start items-center gap-6 text-left max-sm:text-md focus:outline-none`}
                          >
                            {item.icon && <item.icon className="text-2xl max-sm:text-xl" />}
                            {item.title}
                          </button>
                        </li>
                      ))}
                      <div className="flex flex-wrap justify-between items-center mt-2 gap-1">
                        {dropdownColumnsRightSidebar.map((column, index) => (
                          <li
                            key={index}
                            className="bg-[#151515] hover:bg-[#2b2b2b] font-bold flex flex-col justify-start items-center gap-1 px-3 py-0 relative rounded-xl"
                          >
                            <button
                              className={`w-full p-4 rounded-xl flex flex-col justify-start items-start gap-1 text-left focus:outline-none`}
                            >
                              {column.icon && (
                                <column.icon className="text-2xl max-sm:text-lg" />
                              )}
                              {column.title}
                            </button>
                          </li>
                        ))}
                      </div>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="py-2 flex flex-col items-right justify-center ">
                  <button
                    onClick={() => handleOpenPopup("login")}
                    // href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleOpenPopup("signup")}
                    // href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
                  >
                    Signup
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {isOpen && (
        <div className="popup">
          {/* <button onClick={closePopup}>Close</button> */}
          {popupContent}
        </div>
      )}
    </>
  );
};

export default RightSidebar;
