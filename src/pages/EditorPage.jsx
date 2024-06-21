import React, { useState, useEffect, useContext } from "react";
import CodeEditor from "../components/Editor/CodeEditor";
// import CodeOutput from "../components/common/CodeOutput";
import ReactGA from "react-ga4";
import { getData } from "../api";
import { usePopupContext } from "../context/PopupContextProvider";
import LanguagePopup from "../components/Popups/LanguagePopup";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";
import { EditorContext } from "../context/EditorContextProvider";
import { createComponent } from "../apis/components.api";
import { getCookie, useAuthContext } from "../context/AuthContextProviders";
import { auth } from "../firebase/auth";
import { DarkLogo } from "../assets/logos/Logo";
import { Link } from "react-router-dom";
import { Button } from "../components/common";
import dummyImage from "../assets/dummyImage.jpg";
import toast from "react-hot-toast";

const EditorPage = () => {
  const [viewers, setViewers] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { isOpen, popupContent, openPopup, closePopup } = usePopupContext();
  // const handleOpenPopup = () => {
  //   const content = user ? (
  //     <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-[#00000070] z-20 p-6">
  //       <div className="relative flex justify-center items-center bg-[#151515]  h-auto w-auto flex-col gap-4 rounded-md">
  //         <LanguagePopup closePopup={closePopup} />
  //       </div>
  //     </div>
  //   ) : (
  //     toast.error("Login First")
  //   );
  //   openPopup(content);
  // };

  const { code, langCategory, tags } = useContext(EditorContext);
  const { email, photoURL, displayName } = auth?.currentUser;
  // const user1 = getCookie("user");
  // const { email, photoURL, displayName } = user1;

  // console.log(user);
  console.log(email);
  useEffect(() => {
    if (auth === null) {
      navigate("/");
      toast.error("Please select a language and category first");
      return;
    }
    if (langCategory.category === "" && langCategory.language === "") {
      navigate("/");
      toast.error("Please select a language and category first");
      return;
    }
    async function fetchData() {
      const resData = await getData("/api/v1/data/viewersData");
      // console.log(resData.data[0].metricValues[0].value);
      setViewers(resData.data[0].metricValues[0].value);
    }
    // fetchData();
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  }, [auth, langCategory]);
  const handleOpenPopup = () => {
    console.log("opening popup on editor page");
    const content = (
      <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-[#00000070] z-[2000] p-6">
        <div className="relative flex justify-center items-center bg-[#151515]  h-auto w-auto flex-col gap-4 rounded-md">
          <LanguagePopup closePopup={closePopup} />
        </div>
      </div>
    );
    console.log(content);
    openPopup(content);
  };
  const handleSave = async () => {
    // console.log("callling");
    const created = await createComponent({ code, langCategory, email, tags });
    if (created) {
      toast.success("Created and sent for verification");
    }
    navigate("/dashboard");
  };
  const handleUpdate = async () => {
    // console.log("updating");
    // await createComponent({ code, langCategory, email });
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col w-full  h-[100vh]">
        <div className="relative w-full py-2 px-12">
          <div className="flex items-center justify-between">
            <Link to="/">
              <DarkLogo width="120px" />
            </Link>
            <div className="flex items-center justify-between gap-2">
              {/* <Button label="New" onClick={() => handleOpenPopup()} /> */}
              {/* <button
                className="bg-[#292929] p-[10px] my-[10px]"
                onClick={handleOpenPopup}
              >
                Create New
              </button> */}
              <Button label="Create" onClick={handleSave} />
              {/* <Button label="Update" onClick={handleUpdate} /> */}
            </div>
            <Link className="w-12 h-12" to="/dashboard">
              <img
                src={photoURL || dummyImage}
                className="w-full h-full rounded-full"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div
          className="w-full h-full flex max-sm:flex-col justify-between items-center px-12"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <CodeEditor />
          {/* {"Currrent Online Members: " + viewers} */}
        </div>
      </div>
    </>
  );
};

export default EditorPage;
