import React, { useState, useEffect, useRef, useContext } from "react";
import { AiFillEye, AiFillLike } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { abbreviateNumber } from "../../utils/numberAbbreviation";
import { SharePopup } from "../Popups";
import { usePopupContext } from "../../context/PopupContextProvider";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ComponentCard = ({ data, view = 123 }) => {
  const [abbreviatedLikesCount, setAbbreviatedLikesCount] = useState("");
  const [abbreviatedViewsCount, setAbbreviatedViewsCount] = useState("");
  // console.log(data);
  const { css, html, js, tailwind } = data?.code[0] || {};
  const username = data?.userId?.username || "";
  useEffect(() => {
    // Set the abbreviated count using the utility function
    setAbbreviatedLikesCount(abbreviateNumber(+data?.likeCounter));
    setAbbreviatedViewsCount(abbreviateNumber(view));
  }, [data?.likeCounter, view]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isOpen, popupContent, openPopup, closePopup } = usePopupContext();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Add a click event listener to close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenPopup = () => {
    const content = (
      <>
        <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-[#00000070] z-20 p-6">
          <div className="relative flex justify-center items-center bg-[#151515]  h-auto w-auto flex-col gap-4 rounded-md">
            {<SharePopup id={data?._id} />}
            <button className="absolute top-2 right-2" onClick={closePopup}>
              <RxCross2 className="text-3xl text-[#6a6a6a]" />
            </button>
          </div>
        </div>
      </>
    );
    openPopup(content);
  };

  const srcCode = `
  <html>
    <head>
      <style>${css}</style>
      ${
        data?.language.includes("Tailwind")
          ? `<script src="https://cdn.tailwindcss.com"></script>`
          : ``
      }
    </head>
    <body>
      ${html}
      <script>${js}</script>
    </body>
  </html>
  `;

  return (
    <>
      <div className="flex flex-col justify-center items-start">
        <iframe
          // src="https://codesandbox.io/embed/empty-blueprint-forked-2qj2p?fontsize=14&hidenavigation=1&theme=dark"
          style={{
            width: "300px",
            height: "270px",
            border: "0",
            borderRadius: "0",
            overflow: "hidden",
            background: "black",
          }}
          title="empty-blueprint-forked-2qj2p"
          srcDoc={srcCode}
        ></iframe>
        <div className="w-full flex justify-between items-center mt-[2px]">
          <Link
            to={`/profile/${data?.userId?.username}`}
            className={`text-white font-medium overflow-hidden flex justify-center items-center gap-2 ${
              username.length > 12
                ? "whitespace-nowrap overflow-ellipsis max-w-[100px]"
                : ""
            }`}
          >
            <img
              className="w-5 h-5 rounded-full border-primary  border-[1px]"
              src={data?.userId?.profilePicUrl || data?.profilePicUrl}
              alt=""
            />
            {data?.userId?.username}
          </Link>
          <div className="flex justify-center items-center gap-2">
            {/* <div className="flex justify-center text-md items-center gap-2">
              <AiFillEye className="text-lg text-[#c6c6c6]" />
              {abbreviatedViewsCount}
            </div> */}
            <div className="flex justify-center text-md items-center gap-2">
              <AiFillLike className="text-lg text-[#c6c6c6]" />
              {abbreviatedLikesCount}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-center items-center text-xl">
            {data?.tags.map((tag, idx) => (
              <span key={idx} className="text-[#c6c6c6] text-sm">
                #{tag}
                {idx !== data?.tags?.length - 1 ? "," : ""}
              </span>
            ))}
          </div>
          <div
            ref={dropdownRef}
            onClick={toggleDropdown}
            className="relative cursor-pointer"
          >
            <BiDotsVerticalRounded className="text-2xl" />

            {/* Dropdown content */}
            {isDropdownOpen && (
              <div className="absolute top-4 right-3 mt-2 w-64 px-2 py-1 bg-[#151515] rounded-lg shadow-lg z-10">
                <ul>
                  <li className="px-4 py-2 text-lg font-semibold flex justify-start items-center gap-2">
                    <AiFillEye />
                    Like
                  </li>
                  <Link to={`/component/${data?._id}`}>
                    <li className="px-4 py-2 text-lg font-semibold flex justify-start items-center gap-2">
                      <AiFillEye />
                      Show Code
                    </li>
                  </Link>
                  <li
                    onClick={handleOpenPopup}
                    className="px-4 py-2 text-lg font-semibold flex justify-start items-center gap-2"
                  >
                    <AiFillEye />
                    Download Code
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ComponentCard;
