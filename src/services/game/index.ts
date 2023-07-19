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

//atom use Mutation for loading control
export const useStartGame = () => {
  const [gameInfo] = useAtom(syncGameAtom);
  const router = useRouter();
  const setAdd = useSetAtom(gameEssentialAtom);

  const startGame = useCallback(
    async (move: number, j2: string, stake: number) => {
      if (typeof window === "undefined") return;
      if (!window.ethereum) {
        alert("Please install metamask");
        return;
      }
      let network = window.ethereum.networkVersion;
      if (network !== "5") {
        alert("Please change your network to goerli");
        return;
      }
      let salt = randomBytes256();
      let c1_Hash = solidityPackedKeccak256(
        ["uint8", "uint256"],
        [move.toString(), salt.toString()]
      );
      const signer = await new BrowserProvider(window.ethereum).getSigner();
      const RSPContract = new ContractFactory(RSPAbi, RSPBytecode, signer);
      const tx = await RSPContract.deploy(c1_Hash, j2, {
        value: parseEther(stake.toString()),
      });
      await tx.waitForDeployment();
      const address = await tx.getAddress();
      // let lastAction = await (tx as Contract).lastAction();
      setAdd({ contractAdd: address.toString(), salt: salt.toString() });
      router.push("/firsthand/solving");
    },
    []
  );

  return { gameInfo, startGame };
};

export const useJoinGame = () => {
  const router = useRouter();
  const setAdd = useSetAtom(gameEssentialAtom);

  const directByStatus = useCallback((status: string) => {
    switch (status) {
      case "notStarted":
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
  const fetchGameInfo = useCallback(async (contractAdd: string) => {
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      alert("Please install metamask");
      return;
    }
    // let network = window.ethereum.networkVersion;
    // if (network !== "5") {
    //   alert("Please change your network to goerli");
    //   return null;
    // }
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
    return {
      status,
      contractAdd,
      lastAction: parseInt(lastAction.toString()),
      stake: stake,
    };
  }, []);

  const joinGame = useCallback(
    async (contractAdd: string) => {
      const fetchedInfo = await fetchGameInfo(contractAdd);
      setAdd({ contractAdd: contractAdd });
      if (!fetchedInfo) return;
      directByStatus(fetchedInfo.status);
    },
    [fetchGameInfo]
  );

  return { joinGame, directByStatus, fetchGameInfo };
};

export * from "./countDown";
export * from "./play";
export * from "./syncGame";
export * from "./resume";
export * from "./resolve";
