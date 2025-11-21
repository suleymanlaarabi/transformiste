import { userAtom } from "../atoms";
import { useAtomValue } from "jotai";

export function useUser() {
  return useAtomValue(userAtom);
}
