import { atom, useAtom } from "jotai";
import { randomBytes } from "ethers";

export const Game_Status = [
  "notStarted",
  "J2Moving",
  "J1Solving",
  "ended",
] as const;

export const Move = ["Rock", "Paper", "Scissors", "Spock", "Lizard"] as const;

export interface GameInfo {
  status: (typeof Game_Status)[number];
  salt: string;
  contractAdd: string;
}

const gameInfoAtom = atom<GameInfo | null>(null);

export default gameInfoAtom;

export const useStartGame = () => {
  const [gameInfo, setGameInfo] = useAtom(gameInfoAtom);
  const startGame = async (move: number) => {
    const salt = randomBytes(256);
    console.log("salt", salt.toString());
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const gameContract = new ethers.Contract(
    //   "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    //   gameAbi,
    //   signer
    // );
    // const tx = await gameContract.deploy();
    // await tx.wait();
    // const contractAdd = await gameContract.address;
    // const salt = ethers.utils.randomBytes(32);
    // const status = "notStarted";
    // setGameInfo({ status, salt, contractAdd });
  };
  return { gameInfo, startGame };
};
