import React from "react";
import { Link } from "react-router-dom";
import {
  quickLinks,
  legal,
  openSourceStuff,
  social,
  otherStuff,
} from "./footerConstants";

const Footer = () => {
  return (
    <footer className="h-auto w-full flex flex-col justify-center items-start mt-[2rem]">
      <p className="text-center text-[12px] text-[#969696] leading-4 px-28 max-sm:px-4 mb-12">
        At Animhub, our team is always busy, tinkering away like mad scientists,
        crafting and animating the wildest components for your web adventures.
        It's all here, and it's all 100% free, just like your favorite Saturday
        morning cartoons. We've got an enormous collection of animated wonders
        that you can use to make your websites dance and sing. Animhub is the
        most complete and revolutionary animation component playground around.
        We offer animations that'll make your buttons boogie, your input fields
        twirl, and your cards do the cha-cha. Plus, we've got a community that's
        livelier than a cartoon character on caffeine! We're on a mission to
        keep adding more features that will keep your love for animations alive
        and kicking. So, stay tuned for more animated fun and surprises! Got any
        ideas or feedback? Don't hesitate to drop us a line. We're all ears,
        just like Mickey Mouse!
      </p>
      <div className="h-auto w-full bg-[#151515] flex flex-col justify-center items-start py-0 px-[10vw]">
        <div className="flex w-full justify-between py-8 max-sm:flex-wrap ">
          <div className="flex flex-col">
            <h3 className="text-[#969696] text-xl max-sm:text-lg font-bold pb-4">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((item, key) => {
                return (
                  <>
                    <li className="" key={key}>
                      <Link
                        to={item.link}
                        className="text-primary pb-2 font-normal max-sm:text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-[#969696] text-xl max-sm:text-lg font-bold pb-4">Others</h3>
            <ul className="flex flex-col gap-2">
              {otherStuff.map((item, key) => {
                return (
                  <>
                    <li className="">
                      <Link
                        to={item.link}
                        className="text-primary pb-2 font-normal max-sm:text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[#969696] text-xl max-sm:text-lg font-bold pb-4">
              Open Source
            </h3>
            <ul className="flex flex-col gap-2">
              {openSourceStuff.map((item, key) => {
                return (
                  <>
                    <li className="">
                      <Link
                        to={item.link}
                        className="text-primary pb-2 max-sm:text-sm font-normal "
                      >
                        {item.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-[#969696] text-xl max-sm:text-lg font-bold pb-4">Legal</h3>
            <ul className="flex flex-col items-start gap-2">
              {legal.map((item, key) => {
                return (
                  <>
                    <li className="" key={key}>
                      <Link
                        to={item.link}
                        className="text-primary pb-2 max-sm:text-sm font-normal "
                      >
                        {item.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
        {/* <div className="font-normal text-[#969696] pb-8">Language:</div> */}
      </div>
      <div className="h-auto w-full bg-black flex justify-between items-center px-[10vw] py-4 max-sm:px-[2vw]">
        <div className="flex gap-4">
          {social.map((item, key) => {
            return (
              <>
                <a key={key} href={item.link} target="_blank" rel="noreferrer" className="text-3xl max-sm:text-2xl">{<item.comp />}</a>
              </>
            );
          })}
        </div>
        <div className="">
          <h2 className="text-[#969696] max-sm:text-md">&copy; {new Date().getFullYear()} . Animhub.dev</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
