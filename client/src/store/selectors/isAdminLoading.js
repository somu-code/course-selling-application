import { selector } from "recoil";
import { adminState } from "../atoms/admin";

export const adminLoadingState = selector({
  key: "adminLoadingState",
  get: ({ get }) => {
    const state = get(adminState);
    return state.isLoading;
  },
});
