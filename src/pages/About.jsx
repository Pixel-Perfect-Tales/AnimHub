import aboutImg from "../assets/AboutPage.svg";
import inspiration from "../assets/inspiration.svg";
import tutorial from "../assets/tutorial.svg";
import community from "../assets/community.svg";
import tile from "../assets/tile.svg";
import { AiFillYoutube } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getVerifiedComponents } from "../apis/components.api";

const About =  () => {


  const [totalContributors, setTotalContributors] = useState([])

  const uniqueUsers = new Set()
  const [componentsAdded, setComponentsAdded] = useState()
  
  const fillUsers = async () => {
    
  const data = await getVerifiedComponents()
  setComponentsAdded(data.length)
  data.forEach(element => {
    if(!uniqueUsers.has(element?.userId?.username)) {
      uniqueUsers.add(element?.userId?.username)
    }
  });
  setTotalContributors([...uniqueUsers])
  }

  useEffect(() => {
    fillUsers()
  },[])

  return (
    <>
      <div className="w-full mt-10 flex flex-col">
        {/* first */}
        <div className="w-[90%] max-sm:w-[100%] mx-auto flex mb-40 max-sm:mb-6">
          <div className="w-[60%] max-sm:w-[100%] flex flex-col gap-6 p-10">
            <div className="w-full flex items-center lg:p-1">
              <p className="text-white text-4xl max-sm:text-2xl font-bold max-sm:font-semibold">
                Explore the animated universe with AnimHub. 🚀
              </p>
            </div>
            <div className="w-full flex items-center p-1">
            <p className="font-normal text-white opacity-70">
               We are passionate about animation and creativity! Our website is
               your gateway to a vibrant world of animated components, from
               buttons and input fields to cards and more.
             </p>
            </div>
            <div className="w-full flex max-sm:flex-wrap max-sm:justify-center items-center lg:gap-10 gap-5">
              {/* <div className="flex flex-col  items-center gap-1">
                <img src={tile} href="" className="w-10 h-10 max-sm:w-8 max-sm:h-8" />
                <p className="text-primary text-4xl max-sm:text-2xl font-bold">12345</p>
                <p className="text-[#808080] font-normal text-sm">
                  Components 
                </p>
              </div> */}
              <div className="flex flex-col items-center gap-1">
                <img src={community} href="" className="w-10 h-10 max-sm:w-8 max-sm:h-8" />
                <p className="text-primary text-4xl max-sm:text-2xl font-bold">{totalContributors !== undefined ? (
                  <span>{totalContributors.length}</span>
                ) : (
                  12345
                )}</p>
                <p className="text-[#808080] font-normal text-sm">
                  Total contributors
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <img src={tile} href="" className="w-10 h-10 max-sm:w-8 max-sm:h-8" />
                <p className="text-primary text-4xl max-sm:text-2xl font-bold">{componentsAdded !== undefined ? (
                  <span>{componentsAdded}</span>
                ) : (
                  12345
                )}</p>
                <p className="text-[#808080] font-normal text-sm">
                  Components
                </p>
              </div>
            </div>
          </div>
          <div className="w-[40%] px-2 flex justify-center items-center max-sm:hidden">
            <img src={aboutImg} href="About Image" className="w-full h-[90%]" />
          </div>
        </div>
        {/* second */}
        <div className="w-full flex flex-col gap-20 max-sm:gap-8 mb-40">
          <div className="w-[60%] max-sm:w-[100%] mx-auto flex flex-col gap-2 items-center mb-12">
            <p className="text-white font-semibold text-5xl max-sm:text-2xl">
              &lt;What we offer&gt;
            </p>
              <p className="text-[#C6C6C6] text-center text-base font-normal">
              Whether you&apos;re an animation enthusiast, a UI/UX designer, or
              just someone who loves interactive content, you&apos;ve come to
              the right place!
            </p>
          </div>
          <div className="w-[80%] mx-auto flex max-sm:flex-col max-sm:gap-4 justify-between max-sm:items-center">
            <div className="flex flex-col items-center gap-4 w-[25%] max-sm:w-[100%] text-center p-6 bg-[#151515] rounded-md">
              <img src={inspiration} href="" className="w-14 h-14 max-sm:w-8 max-sm:h-8" />
              <p className="text-primary text-lg font-bold">Components</p>
              <p className="">
                Get inspired by our showcase of stunning animated components.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 w-[25%] max-sm:w-[100%] text-center p-6 bg-[#151515] rounded-md">
              <img src={tutorial} href="" className="w-14 h-14 max-sm:w-8 max-sm:h-8" />
              <p className="text-primary text-lg font-bold">Tricks</p>
              <p className="">
                Learn the tricks and techniques behind captivating animations
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 w-[25%] max-sm:w-[100%] text-center p-6 bg-[#151515] rounded-md">
              <img src={community} href="" className="w-14 h-14 max-sm:w-8 max-sm:h-8" />
              <p className="text-primary text-lg font-bold">Community</p>
              <p className="">
                Join a community of fellow creators, designers, and animation
                enthusiasts
              </p>
            </div>
          </div>
        </div>
        {/* third */}
        <div className="w-[80%] max-sm:w-[90%] mx-auto flex flex-col items-center gap-10 max-sm:gap-4 p-14 max-sm:p-6 bg-[#151515] rounded-md">
         <p className="text-center text-white font-bold max-sm:font-semibold text-4xl max-sm:text-2xl">Join Our YouTube Community</p>
         <p className="text-center text-[#C6C6C6] font-normal text-lg max-sm:text-base">&quot;Join our YouTube community and embark on a journey into the world of animation and interactive design! 🚀 Subscribe now to stay inspired, learn, and connect with fellow creators. Let's make the digital world more vibrant together! 💫 #AnimHubCommunity&quot;</p>
         <div className="bg-white p-4 max-sm:p-2 flex justify-center items-center gap-4 max-sm:gap-1 rounded-md">
          <AiFillYoutube fill="red" className="w-10 h-10 max-sm:w-6 max-sm:h-6"/>
          <p className="text-black font-bold max-sm:font-semibold text-xl max-sm:text-lg">Youtube</p>
         </div>
        </div>
      </div>
    </>
  );
};

export default About;
