import React from "react";

const PromoStrip = () => {
  return (
    <>
      <div className="flex justify-center items-center px-24 py-4 max-sm:px-1 max-sm:hidden">
        <h3 className="flex max-sm:flex-row justify-center items-center border-[0.05px] gap-2 border-[#5d5d5d] text-lg max-sm:text-sm font-semibold text-[#fff] px-52 max-sm:px-2 py-2 rounded-sm">
        <p className="max-sm:text-xs">AnimHub is particpaiting in <span className="text-primary font-bold ">HacktoberFest 2023</span></p>
        </h3>
      </div>
    </>
  );
};

export default PromoStrip;
