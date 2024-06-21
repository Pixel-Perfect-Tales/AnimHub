import React, { useState, useContext, useEffect } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaRegCalendarCheck } from "react-icons/fa";
import { auth } from "../../firebase/auth";
import { AiFillGithub } from "react-icons/ai";
import dummyProfileImg from "../../assets/dummyImage.jpg";
import { EditorContext } from "../../context/EditorContextProvider";

import { formatCustomDate } from "../../utils/formatCustomDate";
import { FaScaleBalanced } from "react-icons/fa6";
import { getCookie } from "../../context/AuthContextProviders";
import { getUserData } from "../../apis/user.api";
import { Link } from "react-router-dom";

const ComponentInfo = () => {
  const { email, photoURL, displayName } = auth.currentUser;
  const { tags, setTags, langCategory } = useContext(EditorContext);
  useEffect(() => {
    setTags([langCategory.category.toLowerCase()]);
  }, []);
  const [userData, setUserData] = useState({});

  // async function getData() {
  //   const userCookie = getCookie("user");
  //   const userEmail = JSON.parse(userCookie).email;
  //   // const userEmail = "omgawandeofficial9834899149@gmail.com"
  //   const fetchedUserInfo = await getUserData(userEmail);
  //   setUserData(fetchedUserInfo);
  //   console.log(fetchedUserInfo, userData);
  //   return;
  // }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCookie = getCookie("user");
        const userEmail = JSON.parse(userCookie).email;
        const response = await getUserData(userEmail);

        if (response) {
          setUserData(response);
        } else {
          console.log("No data fetched");
        }
      } catch (error) {
        console.log("Could not fetch user profile.", error);
      }
    };
    fetchData(); // Call the async function directly
    console.log(userData);
  }, []); // Empty dependency array to run once on mount

  const addTags = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault(); // Prevent adding a new line or comma
      const inputValue = e.target.value.trim(); // Trim whitespace
      if (inputValue && !tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
      }
      e.target.value = "";
    } else if (e.key === "Backspace" && e.target.value === "") {
      // Backspace pressed on an empty input field, navigate to the last tag
      e.preventDefault(); // Prevent browser navigation
      const lastTagIndex = tags.length - 1;
      if (lastTagIndex >= 0) {
        const input = document.getElementById("tag-input");
        if (input) {
          if (lastTagIndex === 0) {
            // If there's only one tag, don't delete it
            input.value = "";
          } else {
            input.value = tags[lastTagIndex];
            setTags(tags.slice(0, lastTagIndex));
          }
        }
      }
    }
  };

  return (
    <div className="w-full full flex flex-col rounded-t-[15px] overflow-scroll">
      {/* <div className="h-[40px] bg-[#292929] rounded-t-[15px] flex flex-row justify-end items-center px-[20px]">
        <AiFillInfoCircle
          className="text-[#FFF500] hover:cursor-pointer"
          title="UserInfo"
        />
      </div> */}
      <div className="flex flex-col flex-grow gap-[20px] max-sm:gap-[20px] items-center p-[40px] max-sm:p-[2px] rounded-t-[15px] bg-[#151515]">
        <div className="w-full flex max-sm:justify-center border-[#f00] gap-[20px] max-sm:gap-[5px] items-center">
          <div className="rounded-full w-[50px] max-sm:w-[100px]">
            <Link
              to={`/profile/${userData.username}`}
              className="font-[400] text-[14px] max-sm:text-[5px] text-[#FFA31A]"
            >
              <img
                src={photoURL || dummyProfileImg}
                alt="ProfileImg"
                className="w-full rounded-full"
              />
            </Link>
          </div>
          <div className="lg:flex-grow">
            <Link
              to={`/profile/${userData.username}`}
              className="font-[400] text-[14px] text-[#FFA31A]"
            >
              <h1 className="font-[600] text-[20px] max-sm:text-[13px] text-[#ffffff]">
                {displayName}
              </h1>

              <h2 className="max-sm:text-[12px]">{userData.username}</h2>
            </Link>
          </div>
          <AiFillGithub
            className="w-auto scale-150 hover:cursor-pointer"
            onClick={() => window.open(`${userData.socialLinks[0]}`, "_blank")}
          />
        </div>
        <hr className="w-[90%] border border-[#555]" />
        <div className="w-full flex max-sm:flex-wrap max-sm:justify-center justify-between items-center gap-[10px] max-sm:gap-2">
          <h1 className="text-[25px] max-sm:text-[20px] font-[700] leading-none">
            {langCategory.category}
            <br />
            {tags.map((tag) => (
              <span className="text-[15px] font-[400] text-[#aaa] ">
                #{tag},{" "}
              </span>
            ))}

            <input
              id="tag-input"
              type="text"
              className="w-[100px] max-sm:w-[70px] h-[30px] bg-[#151515] border border-[#555] rounded-[5px] text-[#aaa] font-[400] text-[15px] max-sm:text-[12px] px-[10px] max-sm:px-[5px]"
              placeholder="Add Tags"
              onKeyDown={addTags}
            />
          </h1>
          <h2 className="max-sm:text-sm">
            <span className="flex items-center gap-[10px] text-[#786666] font-[700]">
              <FaRegCalendarCheck />
              {formatCustomDate(Date.now())}
            </span>
          </h2>
        </div>
        <div className="flex flex-col justify-center items-start text-[#C6C6C6] gap-2 font-medium ">
          <div className="flex justify-center items-start max-sm:items-center gap-2 px-8 max-sm:px-2">
            <FaScaleBalanced className="text-2xl max-sm:text-xs " />
            MIT License
          </div>
          <div className="bg-[#292929] max-sm:text-xs px-6 max-sm:px-0 py-4 max-sm:py-1 rounded-md lg:h-[300px] lg:min-h-[200px] overflow-scroll max-sm:font-thin">
            <p>
              Copyright - {new Date(Date.now()).getFullYear()}{" "}
              {userData.username} ({displayName}){" "}
            </p>

            <p>
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the “Software”), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
            </p>

            <p>
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
            </p>

            <p>
              THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="h-[40px] bg-[#292929] rounded-b-[15px]"></div> */}
    </div>
  );
};

export default ComponentInfo;
