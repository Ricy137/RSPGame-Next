import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { BrowserProvider, Contract } from "ethers";
import { useRouter } from "next/navigation";
import RSPAbi from "@/utils/contract/abi.json";
import gameEssentialAtom from ".";
export const useResolveGame = () => {
  const gameEssential = useAtomValue(gameEssentialAtom);
  const router = useRouter();

  const resolveGame = useCallback(async (move: number, salt: string) => {
    if (!gameEssential) return;
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      throw new Error("Please install metamask");
    }
    const { contractAdd } = gameEssential;
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RSPContract = new Contract(contractAdd, RSPAbi, signer);
    let tx = await RSPContract.solve(move, salt);
    await tx.wait();
    router.push("/result");
  }, []);
  return resolveGame;
};
