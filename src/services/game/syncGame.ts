import { atomsWithQuery } from "jotai-tanstack-query";
import { Contract, BrowserProvider } from "ethers";
import RSPAbi from "@/utils/contract/abi.json";
import { getGameStatus } from "@/utils/game";
import gameEssentialAtom from ".";

export const Game_Status = [
  "notStarted",
  "J2Moving",
  "J1Solving",
  "ended",
] as const;
//Provider or Signer are not stored to keep them fresh for every transaction
export interface GameInfo {
  status: (typeof Game_Status)[number];
  lastAction: number;
  stake: string;
}

export const [syncGameAtom] = atomsWithQuery<GameInfo | null>((get) => ({
  queryKey: ["gameSync", get(gameEssentialAtom)?.contractAdd],
  queryFn: async ({ queryKey: [, contractAdd] }) => {
    if (!contractAdd)
      return {
        status: "notStarted",
        lastAction: 0,
        stake: "0",
      };
    try {
      if (typeof window === "undefined") return null;
      if (!window.ethereum) {
        throw new Error("Please install metamask");
      }
      const provider = new BrowserProvider(window.ethereum);
      let exisitency = await provider.getCode(contractAdd as string);
      if (!exisitency || exisitency === "0x")
        throw Error("no smart contract detected from the provided address!");
      const RSPContract = new Contract(contractAdd as string, RSPAbi, provider);
      const c2 = await RSPContract.c2();
      const stake = await RSPContract.stake();
      let lastAction = await RSPContract.lastAction();
      const status = getGameStatus(
        !!exisitency,
        c2.toString(),
        stake.toString(),
        lastAction.toString()
      );
      return {
        status,
        lastAction: parseInt(lastAction.toString()),
        stake: stake,
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  refetchInterval: 1000,
}));

// export const gameInfoAtom = atom<GameInfo | null>(
//   (get) => get(syncGameAtom),
//   (get, set, newGameInfo) => {
//     set(syncGameAtom, newGameInfo);
//   }
// );
