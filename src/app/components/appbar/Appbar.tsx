import styles from "./Appbar.module.sass";
import { APP_NAME } from "@/app/constants";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const Appbar = () => {
  return (
    <div className={styles.appbar}>
      <header className={roboto.className}>{APP_NAME}</header>
      <section className={styles.menu}></section>
    </div>
  );
};

export default Appbar;
