import { atomsWithInfiniteQuery } from "jotai-tanstack-query";
import gameEssentialAtom, { syncGameAtom, GameInfo } from "../game";

export const [resultAtom] = atomsWithInfiniteQuery((get) => ({
  queryKey: [
    "result",
    (get(syncGameAtom) as GameInfo)?.status,
    get(gameEssentialAtom)?.contractAdd,
  ],
  queryFn: async () => {
    const contractAdd = get(gameEssentialAtom)?.contractAdd;
    if (!contractAdd) return null;
    const res = await fetch(
      `https://api-sepolia.etherscan.io/api?module=account&action=txlistinternal&address=${contractAdd}&startblock=0&endblock=99999999999&sort=asc`
    );
    const data = await res.json();
    const { result } = data;
    if (!result || result.length <= 0 || !(result instanceof Array))
      throw new Error("No result");
    let addresses: string[] = [];
    addresses = result.map((item: any) => {
      return item.to as string;
    });
    return addresses;
  },
  getNextPageParam: () => {
    return true;
  },
  retryDelay: 1000,
  retry: 10,
}));
