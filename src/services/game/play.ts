import { atomsWithMutation } from "jotai-tanstack-query";
import { Contract, BrowserProvider } from "ethers";
import RSPAbi from "@/utils/contract/abi.json";
import gameEssentialAtom, { syncGameAtom } from ".";

export const [, playAtom] = atomsWithMutation((get) => ({
  mutationKey: ["play", get(gameEssentialAtom)],
  mutationFn: async (move: number) => {
    const gameEssential = get(gameEssentialAtom);
    if (!gameEssential) return;
    let syncGame = get(syncGameAtom);
    const contractAdd = gameEssential?.contractAdd;
    let stake: string;
    let solvedSyncGame = await syncGame;
    stake = solvedSyncGame?.stake || "0";
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RSPContract = new Contract(gameEssential.contractAdd, RSPAbi, signer);
    let tx = await RSPContract.play(move, { value: stake });
    await tx.wait();
  },
}));
