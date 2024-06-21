/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DarkLogo } from "../../assets/logos/Logo";
import { BiSearch } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";
import { PiYoutubeLogoFill } from "react-icons/pi";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiWarningCircleFill } from "react-icons/pi";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import { navLinks, subNavLinks } from "./constants";
import PromoStrip from "./PromoStrip";
import LanguagePopup from "../Popups/LanguagePopup";
import { usePopupContext } from "../../context/PopupContextProvider";
import { auth } from "../../firebase/auth";
import { useAuthContext } from "../../context/AuthContextProviders";
import { toast } from "react-hot-toast";
import SearchModal from "./SearchModal";
import { getVerifiedComponents } from "../../apis/components.api";
import { usePremiumContext } from "../../context/IsPremiumContextProvider";

const Navbar = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const [active, setActive] = useState(false)
  const { user } = useAuthContext();
  const { isOpen, popupContent, openPopup, closePopup } = usePopupContext();
  const [componentsData, setComponentsData] = useState([])
  const {premium} = usePremiumContext()
  const category = []
  const [loading, setLoading] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [modalOpened, setModalOpened] = useState(false)

  console.log(searchValue);
  const handleOpenPopup = () => {
    const content = user ? (
      <div className="fixed flex justify-center items-center top-0 max-sm:top-10 left-0 h-screen w-screen bg-[#00000070] z-20 p-6">
        <div className="relative flex justify-center items-center bg-[#151515]  h-auto w-auto flex-col gap-4 rounded-md">
          <LanguagePopup closePopup={closePopup} />
        </div>
      </div>
    ) : (
      toast.error("Login First")
    );
    openPopup(content);
  };

  const handleClick = () => {
    setActive(true)
  }
    const handleData = async () => {
    const data = await getVerifiedComponents();
    setComponentsData(data);
    setLoading(false);
  };

  useEffect(() => {
    handleData()
  },[])

  for(let i=0;i< componentsData.length;i++){
    category.push(componentsData[i].category)
  }
   const filteredComponents = componentsData.filter((component) =>
    component.category.toLowerCase().includes(searchValue.toLowerCase())
  );

  const searchCategory = (searchValue) => {
    return category.filter(item => item.toLowerCase().includes(searchValue.toLowerCase()));
  }

  return (
    <>
      <div className="w-full flex flex-col ">
        <div className="flex justify-center items-center">
          <ul className=" w-full flex justify-center items-center gap-4 max-sm:gap-2 py-1 bg-black flex-wrap max-sm:hidden">
            {subNavLinks.map((link) => (
              <li className=" text-[#969696] max-sm:text-xs">
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-12 max-sm:px-1 py-2 flex justify-between max-sm:justify-center max-sm:gap-1 items-center bg-[#0e0e0e]">
          <div className=" w-[70%] flex justify-center items-center ">
            <div className="flex flex-row justify-center items-center gap-4 max-sm:gap-2">
              <LeftSidebar
                isLeftSidebarOpen={isLeftSidebarOpen}
                setIsLeftSidebarOpen={setIsLeftSidebarOpen}
              />
              <Link to={"/"} className="max-sm:w-2 max-sm:h-12">
                <DarkLogo width="180px" />
              </Link>
            </div>
          
            <div className="w-full flex justify-center items-center gap-2">
             <div className="lg:hidden pl-40">
              <SearchModal />
            </div>   
            <button className=" w-[70%] flex justify-center items-center bg-[#252525] px-4 py-[0.4rem] rounded-full max-sm:hidden" id="search-modal" onClick={handleClick}>
                {/* <BiSearch className="text-[#fff] text-2xl" /> */}
                  <SearchModal />
                <input
                  className="appearance-none focus:outline-none all-none w-full bg-[#252525] text-[#fff] text-sm h-8 px-2 py-1  "
                  type="text"
                  placeholder="Search Animated Components"
                />
              </button>
              <button className="null max-sm:hidden">
                <BsPlusCircleFill
                  className="text-[#c6c6c6] text-3xl max-sm:text-xl"
                  onClick={handleOpenPopup}
                />
              </button>
              <a href="https://www.youtube.com/@_animhub" target="_blank" className="max-sm:hidden">
                <PiYoutubeLogoFill className="text-[#c4302b] text-4xl" />
              </a>
            </div>
          </div>
          <div className="max-sm:pl-4">
            <RightSidebar
              isRightSidebarOpen={isRightSidebarOpen}
              setIsRightSidebarOpen={setIsRightSidebarOpen}
            />
          </div>
        </div>
        <div className="px-12 max-sm:px-2 py-2 pb-3 flex justify-between items-center bg-[#0e0e0e] max-sm:text-sm">
  <ul className="grid lg:grid-cols-8 max-sm:flex max-sm:flex-row max-sm:gap-3 max-sm:items-center justify-items-center w-full h-full items-center mx-auto overflow-x-auto max-sm:whitespace-nowrap">
    {navLinks.map((link) => (
      <li className="lg:group grid w-full h-auto text-[#fff] font-bold max-sm:font-normal cursor-pointer">
        <a className="group-hover:bg-[#333333] group-hover:border-[#363636] border-[1px] border-[transparent] transition duration-30">
          <span className="flex flex-col justify-center items-center">
            <Link
              to={`${link.path ? link.path : ""}`}
              className="inline-block text-center align-top"
            >
              {link.name}{" "}
              {link.content && (
                <IoMdArrowDropdown className="inline-block text-[#fff] text-2xl" />
              )}
            </Link>
            <span className="w-full h-[1.5px] mx-auto bg-yellow-600 group-hover:block group-hover:opacity-100 opacity-0 relative top-0 transition duration-30"></span>
          </span>
        </a>
        {link.content && (
          <div className="absolute top-[126px] left-0 w-full h-auto bg-[#000] hidden text-white  group-hover:flex flex-col shadow-md z-50 border-x-0 border-y-[0.05px] border-[#606060] animate-fadeIn transition duration-30">
            {<link.content />}
          </div>
        )}
      </li>
    ))}
  </ul>
</div>

        <div className="flex flex-row gap-1 max-sm:gap-0 py-1 justify-center bg-[#1b1b1b] max-sm:hidden">
          <PiWarningCircleFill className="text-[#c6c6c6] text-2xl" />
          <p className="max-sm:text-sm">
            If you have anything for us or want to email us{" "}
            <a
              className=" 
            text-[#c6c6c6] hover:text-[#7373ff] transition duration-30 underline"
              href="mailto:hello@animhub.dev"
              target="_blank"
            >
              here
            </a>
          </p>
        </div>
        {/* <PromoStrip /> */}
      </div>
    </>
  );
};

export default Navbar;
