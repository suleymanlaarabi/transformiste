import { parseColor } from "@chakra-ui/react";
import { atom } from "jotai";

export type User = {
  name: string;
};

export const userAtom = atom({
  name: "",
} as User);

export const carroserieSettingsAtom = atom({
  bodyColor: parseColor("#000000"),
  edge: parseColor("#7b7bffff"),
});

export const settingsAtom = atom({
  gizmo: true,
});
