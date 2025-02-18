import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// Check if Remember Me is enabled in localStorage
const rememberMe = localStorage.getItem("rememberMe") === "true";

// Use localStorage only if Remember Me is checked, otherwise use sessionStorage
const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: rememberMe ? localStorage : sessionStorage,
});

// Atom to track if the user wants to store data in the future
export const storeInFutureAtom = atom({
  key: "storeInFutureAtom",
  default: rememberMe, // Set default based on Remember Me
});

export const roleState = atom({
  key: "roleState",
  default: '',
  effects: [persistAtom],
});

export const userState = atom({
  key: "userState",
  default: '',
  effects: [persistAtom],
});

export const profileState = atom({
  key: "profileState",
  default: false,
});
