import { adminState } from "../atoms/admin";
import { selector } from "recoil";

export const adminEmailState = selector({
  key: "adminEmailState",
  get: ({ get }) => {
    const admin = get(adminState);
    return admin.adminEmail;
  },
});
