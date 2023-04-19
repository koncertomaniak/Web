import {atom} from "recoil";

export const showMoreCardState = atom<boolean>({
    key: "showMoreCard",
    default: false
})