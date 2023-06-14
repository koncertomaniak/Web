"use client";
import EventsView from "@/app/views/EventsView";
import { RecoilRoot } from "recoil";
import styles from "@/app/layout.module.sass";
import EventBottomSheet from "@/app/components/cards/EventBottomSheet";

const Home = () => {
  return (
    <RecoilRoot>
      <div id={styles["container"]}>
        <EventsView />
      </div>
      <div id={styles["other"]}>
        {/*<BottomSheetOpacity />*/}
        <EventBottomSheet />
      </div>
    </RecoilRoot>
  );
};

export default Home;
