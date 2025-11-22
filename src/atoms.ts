import { atom } from "jotai";

export type User = {
  name: string;
};

export const userAtom = atom({
  name: "",
} as User);
