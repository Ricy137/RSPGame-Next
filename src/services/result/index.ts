import { atomsWithInfiniteQuery } from "jotai-tanstack-query";
import gameEssentialAtom, { syncGameAtom, GameInfo } from "../game";

//TODO: add types
export const [resultAtom] = atomsWithInfiniteQuery((get) => ({
  queryKey: [
    "result",
    (get(syncGameAtom) as GameInfo)?.status,
    get(gameEssentialAtom)?.contractAdd,
  ],
  queryFn: async () => {
    //TODO: only for test
    // const contractAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3889";
    const contractAdd = get(gameEssentialAtom)?.contractAdd;
    if (!contractAdd) return null;
    const res = await fetch(
      `https://api-goerli.etherscan.io/api?module=account&action=txlistinternal&address=${contractAdd}&startblock=0&endblock=99999999999&sort=asc`
    );
    const data = await res.json();
    if (!data.result || data.result.length <= 0) throw new Error("No result");
    const { result } = data;
    let addresses: string[] = [];
    addresses = result.map((item: any) => {
      return item.to as string;
    });
    return addresses;
  },
  getNextPageParam: () => {
    return true;
  },
  // refetchOnWindowFocus: true,
  // refetchInterval: 1500,
  retryDelay: 1000,
  retry: 5,
}));
