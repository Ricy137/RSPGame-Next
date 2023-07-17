import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { atom, useAtom, useSetAtom } from "jotai";
import {
  solidityPackedKeccak256,
  ContractFactory,
  BrowserProvider,
  parseEther,
  Contract,
} from "ethers";
import RSPAbi from "@/utils/contract/abi.json";
import { RSPBytecode } from "@/utils/contract/bytecode";
import { randomBytes256 } from "@/utils/randomBytes256";
import { getGameStatus } from "@/utils/game";
import { syncGameAtom } from "./syncGame";

export const Processing_Status = ["J2Moving", "J1Solving"];

export const Move = ["Rock", "Paper", "Scissors", "Spock", "Lizard"] as const;

export interface GameEssential {
  contractAdd: string;
  salt?: string;
}
const gameEssentialAtom = atom<GameEssential | null>(null);

export default gameEssentialAtom;

export const useStartGame = () => {
  const [gameInfo, setGameInfo] = useAtom(syncGameAtom);
  const setAdd = useSetAtom(gameEssentialAtom);

  const startGame = useCallback(
    async (move: number, j2: string, stake: number) => {
      if (!window.ethereum) {
        alert("Please install metamask");
        return;
      }
      let salt = randomBytes256();
      let c1_Hash = solidityPackedKeccak256(
        ["uint8", "uint256"],
        [move.toString(), salt.toString()]
      );
      try {
        const signer = await new BrowserProvider(window.ethereum).getSigner();
        const RSPContract = new ContractFactory(RSPAbi, RSPBytecode, signer);
        const tx = await RSPContract.deploy(c1_Hash, j2, {
          value: parseEther(stake.toString()),
        });
        await tx.waitForDeployment();
        const address = await tx.getAddress();
        // let lastAction = await (tx as Contract).lastAction();
        setAdd({ contractAdd: address.toString(), salt: salt.toString() });
        // setGameInfo({
        //   status: "J2Moving",
        //   salt: salt.toString(),
        //   lastAction: parseInt(lastAction.toString()),
        //   stake: stake.toString(),
        // });
      } catch (err) {
        console.log(err);
      }
    },
    [window.ethereum]
  );

  return { gameInfo, startGame };
};

export const useJoinGame = () => {
  // const setGameInfo = useSetAtom(gameInfoAtom);
  const router = useRouter();

  const directByStatus = useCallback((status: string) => {
    switch (status) {
      case "notStarted":
        router.push("/");
        return;
      case "J2Moving":
        router.push("/secondhand");
        return;
      case "J1Solving":
        router.push("/secondhand/solving");
        return;
      case "ended":
        router.push("/result");
        return;
      default:
        router.push("/");
    }
  }, []);
  //TODO: May I move it to make it more general?
  const fetchGameInfo = useCallback(
    async (contractAdd: string) => {
      if (!window.ethereum) {
        alert("Please install metamask");
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      let exisitency = await provider.getCode(contractAdd);
      if (!exisitency)
        throw Error("no smart contract detected from the provided address!");
      const RSPContract = new Contract(contractAdd, RSPAbi, provider);
      const c2 = await RSPContract.c2();
      const stake = await RSPContract.stake();
      let lastAction = await RSPContract.lastAction();
      const status = getGameStatus(
        !!exisitency,
        c2.toString(),
        stake.toString(),
        lastAction.toString()
      );
      // setGameInfo({
      //   status,
      //   contractAdd,
      //   lastAction: parseInt(lastAction.toString()),
      //   stake: stake,
      // });
      return {
        status,
        contractAdd,
        lastAction: parseInt(lastAction.toString()),
        stake: stake,
      };
    },
    [window]
  );

  const joinGame = useCallback(
    async (contractAdd: string) => {
      const fetchedInfo = await fetchGameInfo(contractAdd);
      if (!fetchedInfo) return;
      directByStatus(fetchedInfo.status);
    },
    [fetchGameInfo]
  );

  return { joinGame, directByStatus };
};

export * from "./countDown";
export * from "./play";
export * from "./syncGame";
