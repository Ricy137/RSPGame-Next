import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { BrowserProvider, Contract } from "ethers";
import RSPAbi from "@/utils/contract/abi.json";
import gameEssentialAtom from ".";
export const useResolveGame = () => {
  const gameEssential = useAtomValue(gameEssentialAtom);

  const resolveGame = useCallback(
    async (move: number, salt: string) => {
      if (!gameEssential) return;
      if (!window.ethereum) {
        alert("Please install metamask");
        return;
      }
      const { contractAdd } = gameEssential;
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const RSPContract = new Contract(contractAdd, RSPAbi, signer);
      let tx = await RSPContract.solve(move, salt);
      await tx.wait();
    },
    [window]
  );
  return resolveGame;
};
