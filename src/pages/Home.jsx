/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ComponentCard from "../components/common/ComponentCard";
import { Loader, Pagination } from "../components/common";
import { getVerifiedComponents } from "../apis/components.api";
import ReactGA from "react-ga4";
import { usePremiumContext } from "../context/IsPremiumContextProvider";
import SearchModal from "../components/Navbar/SearchModal";
import { useUserContext } from "../context/UserContextProvider";

const ITEMS_PER_PAGE = 12;

const Home = () => {
  const [componentsData, setComponentsData] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Initialize with 1 page
  const ulContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [loading, setLoading] = useState(true);
  const { premium } = usePremiumContext();
  const { userData } = useUserContext();
  const [activeTag, setActiveTag] = useState("");

  const handleData = async () => {
    const data = await getVerifiedComponents();
    setComponentsData(data);
    console.log(data[0].category);
    const uniqueTags = new Set();

    data.forEach((component) => {
      uniqueTags.add(component.category.toLowerCase())
      component.tags.forEach((tag) => {
        if(!uniqueTags.has(tag.toLowerCase()) ) {
          uniqueTags.add(tag);
        }
      });
    });

    console.log(uniqueTags);

    setTags([...uniqueTags]);

    setLoading(false);

    // Calculate the total number of pages based on the components data
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    setTotalPages(totalPages);
  };

  function handle() {
    alert("Are you sure you want to leave the page?");
    return;
  }

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    window.addEventListener("beforeunload", handle);
    handleData();
    return () => {
      window.removeEventListener("beforeunload", handle);
    };
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const scrollLeft = () => {
    ulContainerRef.current.scrollTo({
      left: ulContainerRef.current.scrollLeft - 500,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    ulContainerRef.current.scrollTo({
      left: ulContainerRef.current.scrollLeft + 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = ulContainerRef.current;

    const handleScroll = () => {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const disableScrollbar = () => {
    ulContainerRef.current.style.overflow = "hidden";
    setTimeout(() => {
      ulContainerRef.current.style.overflow = "scroll";
    }, 1000);
  };

  // Calculate the start and end index of components for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;

  const handleClick = (tag) => {
    setActiveTag((prevTag) => (prevTag === tag ? "" : tag));
  };

  const handleOutsideClick = (e) => {
    if (ulContainerRef.current && !ulContainerRef.current.contains(e.target)) {
      setActiveTag("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const filteredComponents = activeTag
    ? componentsData.filter((component) => component.tags.includes(activeTag))
    : componentsData;

  return (
    <>
      <div className="w-full flex flex-col justify-start items-start px-12 max-sm:px-2">
        <div className="w-full auto flex flex-col justify-start items-center">
          <h1 className="text-xl font-bold max-sm:text-lg max-sm:font-medium hidden">
            Explore all the components GA Page Added
          </h1>
          <div
            className="relative hide-scrollbar mt-4"
            onScroll={disableScrollbar}
          >
            {showLeftArrow && (
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full bg-[#1a1a1a] hover:bg-[#343434] backdrop-blur-md shadow-arrow p-3"
                onClick={scrollLeft}
              >
                <FaChevronLeft />
              </button>
            )}
            <ul
              ref={ulContainerRef}
              className="flex jusify items-center space-x-2 no-scrollbar" // Removed justify-center
              style={{
                width: "90vw",
                scrollBehavior: "smooth", // Add smooth scrolling to the ul container
                overflowX: "scroll",
                "@media (max-width: 768px)": {
                  // Adjust max-width according to your needs
                  width: "50vw",
                }, // Enable horizontal scrolling
              }}
            >
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className={`bg-[#151515] max-sm:text-sm hover:bg-[#2b2b2b] border-2 border-[#212121] px-6 max-sm:px-2 py-2 rounded-full m-1 ${
                    activeTag === tag ? "bg-[#2b2b2b]" : ""
                  }`}
                >
                  <button onClick={() => handleClick(tag)}>{tag}</button>
                </li>
              ))}
            </ul>
            {showRightArrow && (
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-[#1a1a1a] hover:bg-[#343434] backdrop-blur-md shadow-arrow p-3"
                onClick={scrollRight}
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>
        <div className="w-full h-auto flex flex-wrap gap-8 my-10 justify-center items-center">
          {/* cards */}
          {filteredComponents
            .slice(startIndex, endIndex)
            .filter((component) => !component.premium || premium)
            .map((card, index) => {
              return <ComponentCard key={index} data={card} />;
            })}
          {premium && userData?.email !== undefined &&
            filteredComponents
              .slice(startIndex, endIndex)
              .filter((component) => component.premium)
              .map((card, index) => (
                <div key={index} className="hidden" /> // Empty container for hidden content
              ))}
          {loading && (
            <div className="flex justify-center items-center w-full">
              <Loader />
            </div>
          )}
        </div>
        <div className="w-full px-12 mt-2 flex justify-center items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
