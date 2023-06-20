"use client";
import styles from "./Appbar.module.sass";
import { APP_NAME } from "@/app/constants";
import { Roboto } from "next/font/google";
import SearchBox from "@/app/components/appbar/SearchBox";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const Appbar = () => {
  return (
    <div className={styles.appbar}>
      <header className={roboto.className}>{APP_NAME}</header>
      <section className={styles.menu}>
        <SearchBox />
      </section>
    </div>
  );
};

export default Appbar;
