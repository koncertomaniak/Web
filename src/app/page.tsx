"use client";
import EventsView from "@/app/views/EventsView";
import {RecoilRoot} from "recoil";

const Home = () => {
  return (
      <RecoilRoot>
        <EventsView />
      </RecoilRoot>
  );
};

export default Home;
