import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";

export const storageKey = "NJ_TOKEN";

export const checkLogin = () => !!localStorage.getItem(storageKey);

export const doLogin = () => {
  localStorage.setItem(storageKey, faker.word.sample());
  toast.success("You are logged in from the system.");
};

export const doLogout = () => {
  localStorage.removeItem(storageKey);
  toast.success("You are logged out from the system.");
};