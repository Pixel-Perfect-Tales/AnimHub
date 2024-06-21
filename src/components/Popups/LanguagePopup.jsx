import  { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { EditorContext } from "../../context/EditorContextProvider";
import { getAllCategories } from "../../apis/category.api";
import { Loader } from "../common";
import { toast } from "react-hot-toast";

const languages = [
  "HTML+CSS",
  "HTML+CSS+JS",
  "HTML+Tailwind",
  "HTML+Tailwind+JS",
];

const LanguagePopup = ({ closePopup }) => {
  const { langCategory, setLangCategory } = useContext(EditorContext);
  const [loading, setLoading] = useState(true);
  // console.log("contexr", langCategory);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const handleSubmit = () => {
    if (langCategory.language === "" || langCategory.category === "") {
      toast.error("Please select both category and language");
      return;
    }

    closePopup();
    console.log("context", langCategory);
    navigate("/editor");
  };

  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
    setLoading(false);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="absolute w-[50vw] max-sm:w-64 bg-[#292929] rounded-lg">
      <button className="absolute top-2 right-2" onClick={closePopup}>
        <RxCross1 className="text-3xl max-sm:text-xl text-[#6a6a6a]" />
      </button>
      <div className="my-10" id="category">
        <h1 className="lg:mx-9 font-[600] text-[30px] max-sm:text-[20px] text-center">Category</h1>
        {categories.map((category, idx) => (
          <button
            key={idx}
            className={`px-5 py-2 mx-5 my-2.5 max-sm:px-1 max-sm:mx-2 max-sm:py-1 max-sm:my-1 max-sm:text-sm rounded-md font-[600]
                        ${
                          langCategory.category !== category.name &&
                          "hover:bg-secondary hover:border-primary"
                        }
                        ${
                          langCategory.category !== category.name &&
                          "border border-[#888]"
                        }
                        ${
                          langCategory.category === category.name &&
                          "bg-primary text-[#000] border-primary"
                        }
          `}
            onClick={() =>
              setLangCategory((prev) => ({ ...prev, category: category.name }))
            }
          >
            {category.name.toUpperCase()}
          </button>
        ))}
        {loading && (
          <div className="flex justify-center items-center w-full">
            <Loader />
          </div>
        )}
      </div>
      <div className="languages my-10">
        <h1 className="lg:mx-9 font-[600] text-[30px] max-sm:text-[20px] text-center">Language</h1>
        {languages.map((language, idx) => (
          <button
            key={idx}
            onClick={() =>
              setLangCategory((prev) => ({ ...prev, language: language }))
            }
            className={`px-5 py-2 mx-5 my-2.5 max-sm:px-1 max-sm:mx-2 max-sm:py-1 max-sm:my-1 max-sm:text-sm rounded-md font-[600]
            ${
              langCategory.language !== language &&
              "hover:bg-secondary hover:border-primary"
            }
            ${langCategory.language !== language && "border border-[#888]"}
            ${
              langCategory.language === language &&
              "bg-primary text-secondary border-primary"
            }
`}
          >
            {language}
          </button>
        ))}
      </div>
      <button
        className="px-5 py-2 mx-[50%] my-[20px] -translate-x-[50%] bg-primary rounded-md text-secondary font-[600]"
        onClick={handleSubmit}
      >
        Done
      </button>
    </div>
  );
};

export default LanguagePopup;
