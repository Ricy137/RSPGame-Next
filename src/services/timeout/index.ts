import { useCallback } from "react";
import { atom, useAtomValue } from "jotai";
import { BrowserProvider, parseEther, Contract } from "ethers";
import RSPAbi from "@/utils/contract/abi.json";
import gameEssentialAtom, { countDownAtom } from "../game";

export const timeoutAtom = atom(async (get) => {
  const countDownInfo = await get(countDownAtom);
  if (!countDownInfo) return null;
  const { leftTime } = countDownInfo;
  if (leftTime <= 0) return countDownInfo.turn;
});

export const useTimeout = () => {
  const j1Timeout = useCallback(async () => {
    const gameEssential = useAtomValue(gameEssentialAtom);
    if (!gameEssential) return;
    const { contractAdd } = gameEssential;
    if (!window.ethereum) {
      alert("Please install metamask");
      return;
    }
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RPSContract = new Contract(contractAdd, RSPAbi, signer);
    const tx = await RPSContract.j1Timeout();
    await tx.wait();
    return tx.hash;
  }, [window]);

  const j2Timeout = useCallback(async () => {
    const gameEssential = useAtomValue(gameEssentialAtom);
    if (!gameEssential) return;
    const { contractAdd } = gameEssential;
    if (!window.ethereum) {
      alert("Please install metamask");
      return;
    }
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RPSContract = new Contract(contractAdd, RSPAbi, signer);
    const tx = await RPSContract.j2Timeout();
    await tx.wait();
    return tx.hash;
  }, [window]);

  return { j1Timeout, j2Timeout };
};
