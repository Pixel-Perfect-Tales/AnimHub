import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { getComponentById, updateComponent } from "../apis/components.api";
import { getUserData } from ".././apis/user.api";
import { getCookie } from "../context/AuthContextProviders";
import { Button } from "../components/common";
import CodeEditor from "../components/ShowCode/CodeEditor";
import dummyImage from "../assets/dummyImage.jpg";
import { DarkLogo } from "../assets/logos/Logo";
import { Link } from "react-router-dom";
import { auth } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { verifyComponent } from "../apis/admin.api";
import { IoMdCheckmark } from "react-icons/io";
import toast from "react-hot-toast";

const ComponentPage = () => {
  const [userData, setUserData] = useState({});
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [component, setComponent] = useState(null);
  const [updatedState, setUpdatedState] = useState({
    html: "",
    css: "",
    js: "",
    tailwind: "",
  });
  const getComponentData = async () => {
    const fetchedComponent = await getComponentById(id);
    console.log("fetched", fetchedComponent);
    setComponent(fetchedComponent);
    setUpdatedState({
      html: fetchedComponent?.code[0]?.html,
      css: fetchedComponent?.code[0]?.css,
      js: fetchedComponent?.code[0]?.javascript,
      tailwind: fetchedComponent?.code[0]?.tailwind,
    });
  };
  const { photoURL } = auth?.currentUser || false;

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
    fetchData();
    console.log("userData123", component?.email);
    console.log("currentUser", auth?.currentUser?.email);
    console.log("not same", userData?.email !== auth?.currentUser?.email);

    getComponentData();
  }, []);
  console.log(userData);

  const handleVerification = async (componentId, email, score) => {
    const res = await verifyComponent(componentId, email, score);
    console.log(res);
    toast.success("Component Verified Successfully");
    navigate("/dashboard");
  };

  const updateHandler = async () => {
    const data = {
      ...component,
      componentId: component._id,
      code: [
        {
          html: updatedState.html,
          css: updatedState.css,
          javascript: updatedState.js,
          tailwind: updatedState.tailwind,
        },
      ],
    };
    console.log("SData", data);
    const updatedMsg = await updateComponent(data);
    console.log(updatedMsg);
    toast.success("Component Updated Successfully");
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
              {/* <Button label="Create" onClick={handleSave} /> */}

              {/* <Button label="Update" onClick={handleUpdate} /> */}
              {component?.email === auth?.currentUser?.email ||
              userData.isAdmin ? (
                <Button label="Update" onClick={updateHandler} />
              ) : (
                <></>
              )}
              {userData?.isAdmin && !component?.verified && (
                <>
                  <div className="flex justify-between bg-[#212121] border-[#333333] min-w-[400px] items-center p-2 rounded-sm pl-4">
                    <input
                      type="number"
                      name="score"
                      placeholder="Give Score to component"
                      onChange={(e) => setScore(e.target.value)}
                      className=" appearance-none  bg-[#212121] w-full focus:outline-none"
                    />
                    <IoMdCheckmark className="text-[green] text-2xl" />
                  </div>
                  <Button
                    label="Verify"
                    onClick={() => {
                      handleVerification(id, userData?.email, score);
                    }}
                    disabled={!score}
                  />
                </>
              )}
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
          className="w-full h-full flex justify-between items-center px-12"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <CodeEditor
            data={component}
            updatedState={updatedState}
            setUpdatedState={setUpdatedState}
          />
        </div>
      </div>
    </>
  );
};

export default ComponentPage;
