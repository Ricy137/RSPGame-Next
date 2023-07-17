import { atomsWithQuery } from "jotai-tanstack-query";
import { BrowserProvider } from "ethers";
import gameInfoAtom, { GameInfo, Processing_Status } from ".";

export interface CountDownInfo {
  turn: "first hand" | "second hand";
  started: boolean;
  lastAction: number;
  leftTime: number;
}

export const [countDownAtom] = atomsWithQuery<CountDownInfo | null>((get) => ({
  // queryKey: ["countdown", get(gameInfoAtom)],
  queryKey: [
    "countdown",
    get(gameInfoAtom)?.status,
    get(gameInfoAtom)?.lastAction,
  ],
  queryFn: async () => {
    let gameInfo = get(gameInfoAtom);
    let gameStatusInfo = gameInfo as GameInfo | null;
    if (!window.ethereum) return null;
    if (!gameStatusInfo) return null;
    const { status, lastAction } = gameStatusInfo;
    if (!Processing_Status.includes(status))
      return { turn: "first hand", started: false, lastAction: 0, leftTime: 0 };
    let turn: "first hand" | "second hand" =
      status === "J2Moving" ? "second hand" : "first hand";
    const provider = new BrowserProvider(window.ethereum);
    const blockNumber = await provider.getBlockNumber();
    const blockTime = await provider.getBlock(blockNumber);
    if (!blockTime) return null;
    //Due to execution time, et. It's better to minus 1 second. Though, it's highly likely the transaction would eventually fail if player moved in the last few seconds, trigger metamask or mining the trasaction still requires time.
    const leftTime =
      lastAction - parseInt(blockTime.timestamp.toString()) - 1 + 5 * 60;
    return { turn, started: true, lastAction, leftTime };
  },
}));
