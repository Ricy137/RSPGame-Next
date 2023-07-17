import { atomsWithMutation } from "jotai-tanstack-query";
import { Contract, BrowserProvider } from "ethers";
import RSPAbi from "@/utils/contract/abi.json";
import gameInfoAtom, { GameInfo } from ".";

export const [, playAtom] = atomsWithMutation((get) => ({
  mutationKey: ["play", get(gameInfoAtom)],
  mutationFn: async (move: number) => {
    const gameInfo = get(gameInfoAtom) as GameInfo;
    const { contractAdd, stake } = gameInfo;
    try {
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const RSPContract = new Contract(contractAdd, RSPAbi, signer);
      let tx = await RSPContract.play(move, { value: stake });
      debugger;
      let res = await tx.wait();
      debugger;
    } catch (err) {
      console.log(err);
    }
  },
}));
