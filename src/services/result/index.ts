import { atomsWithQuery } from "jotai-tanstack-query";
import gameEssentialAtom, { syncGameAtom, GameInfo } from "../game";

//TODO: add types
export const [resultAtom] = atomsWithQuery((get) => ({
  queryKey: [
    "result",
    (get(syncGameAtom) as GameInfo)?.status,
    get(gameEssentialAtom)?.contractAdd,
  ],
  queryFn: async () => {
    try {
      const contractAdd = get(gameEssentialAtom)?.contractAdd;
      if (!contractAdd) return;
      const res = await fetch(
        `https://api-goerli.etherscan.io/api?module=account&action=txlistinternal&address=${contractAdd}&startblock=0&endblock=999999999&sort=asc`
      );
      const data = await res.json();
      const { result } = data;
      let addresses: string[] = [];
      addresses = result.map((item: any) => {
        return item.to as string;
      });
      return addresses;
    } catch (err) {
      console.log(err);
    }
  },
}));
