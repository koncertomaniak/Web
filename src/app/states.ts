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
