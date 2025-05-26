import { atom } from "recoil"
import { type BlocksContent } from "@strapi/blocks-react-renderer"

export interface Restaurant {
  id: number;
  documentId: string;
  Name: string;
  Description: BlocksContent;
}

export const restaurantsAtom = atom<Restaurant[]>({
  key: "restaurantsAtom",
  default: [],
})
