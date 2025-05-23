import { atom } from "recoil"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export interface Restaurant {
  id: number;
  Name: string;
  Description: BlocksContent;
}

export const restaurantsAtom = atom<Restaurant[]>({
  key: "restaurantsAtom",
  default: [],
})
