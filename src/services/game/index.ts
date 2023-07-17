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

export const Game_Status = [
  "notStarted",
  "J2Moving",
  "J1Solving",
  "ended",
] as const;
export const Processing_Status = ["J2Moving", "J1Solving"];

export const Move = ["Rock", "Paper", "Scissors", "Spock", "Lizard"] as const;

//Provider or Signer are not stored to keep them fresh for every transaction
export interface GameInfo {
  status: (typeof Game_Status)[number];
  salt?: string;
  contractAdd: string;
  lastAction: number;
  stake: string;
}

const gameInfoAtom = atom<GameInfo | null>(null);

export default gameInfoAtom;

export const useStartGame = () => {
  const [gameInfo, setGameInfo] = useAtom(gameInfoAtom);

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
        let lastAction = await (tx as Contract).lastAction();
        setGameInfo({
          status: "J2Moving",
          salt: salt.toString(),
          contractAdd: address.toString(),
          lastAction: parseInt(lastAction.toString()),
          stake: stake.toString(),
        });
      } catch (err) {
        console.log(err);
      }
    },
    [window.ethereum]
  );

  return { gameInfo, startGame };
};

export const useJoinGame = () => {
  const setGameInfo = useSetAtom(gameInfoAtom);
  const router = useRouter();

  const joinGame = useCallback(async (contractAdd: string) => {
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
    setGameInfo({
      status,
      contractAdd,
      lastAction: parseInt(lastAction.toString()),
      stake: stake,
    });
    switch (status) {
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
        router.push("/secondhand");
    }
  }, []);

  return { joinGame };
};

export * from "./countDown";
export * from "./play";
