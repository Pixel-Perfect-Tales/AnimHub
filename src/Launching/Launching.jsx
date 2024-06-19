import React from "react";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { DarkLogo } from "../assets/logos/Logo";
import classes from "./Launching.module.css";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaSquareYoutube,
} from "react-icons/fa6";

const Launching = () => {
  return (
    <>
      <section className={classes.page}>
        <div className={classes.overlay}></div>

        <div className={classes.page_content}>
          <DarkLogo width="300px" />
          <div className="flex flex-col justify-center items-center gap-4">
            <h3 className={classes.h3}>
              Explore the animated universe with AnimHub. 🚀
            </h3>
            <h3 className={classes.h3}>
              Don&apos;t worry this is a fake timer. 😅
            </h3>
            <div className="h-auto w-full mb-2 bg-black flex justify-center items-center"></div>
          </div>
          <FlipClockCountdown
            className={classes.flip_clock}
            to={
              new Date("2024-07-26T12:00:00").getTime() +
              10 * 24 * 3600 * 1000 +
              5000
            }
            labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
            labelStyle={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: "uppercase",
            }}
            // digitBlockStyle={{ width: 100, height: 100, fontSize: 30 }}
            dividerStyle={{ color: "black", height: 2 }}
            separatorStyle={{ color: "#FFA31A", size: "6px" }}
            duration={0.5}
          />
          <h3 className={classes.h3}>Follow us here! ⬇️</h3>
          <div className="flex gap-4">
            <a
              href="https://twitter.com/_animhub"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareXTwitter size={30} color="#c6c6c6" />
            </a>
            <a
              href="https://www.instagram.com/_animhub"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareInstagram size={30} color="#c6c6c6" />
            </a>
            <a
              href="https://www.youtube.com/_animhub"
              target="_blank"
              rel="noreferrer"
            >
              <FaSquareYoutube size={30} color="#c6c6c6" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Launching;
