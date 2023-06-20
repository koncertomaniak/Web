import { atom } from "recoil";
import { EventItem } from "@/app/api/models/event";

export const showMoreCardState = atom<boolean>({
  key: "showMoreCard",
  default: false,
});

export const currentEventCard = atom<EventItem | null>({
  key: "currentEventCard",
  default: null,
});

export const eventItems = atom<EventItem[] | null>({
  key: "events",
  default: null,
});

export const searchBoxInput = atom<string>({
  key: "searchBoxTerm",
  default: "",
});

// export const eventsErrorNetwork = atom<string | null>({
//   key: "eventsErrorNetwork",
//   default: null
// })
