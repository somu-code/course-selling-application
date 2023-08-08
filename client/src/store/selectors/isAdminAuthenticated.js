import { adminState } from "../atoms/admin";
import { selector } from "recoil";

export const adminAuthenticatedState = selector({
  key: "adminAuthenticatedState",
  get: ({ get }) => {
    const admin = get(adminState);
    return admin.isAuthenticated;
  },
});
