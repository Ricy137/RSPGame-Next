import { useCallback } from "react";
import { atom, useAtomValue } from "jotai";
import { BrowserProvider, Contract } from "ethers";
import { useRouter } from "next/navigation";
import RSPAbi from "@/utils/contract/abi.json";
import gameEssentialAtom, { countDownAtom } from "../game";

//TODO:
// export const timeoutAtom = atom(async (get) => {
//   const gameEssential = get(gameEssentialAtom);
//   const countDownInfo = await get(countDownAtom);
//   debugger;
//   if (!countDownInfo || !gameEssential?.contractAdd) return null;
//   const { timeoutStamp } = countDownInfo;
//   console.log("timeoutStamp", timeoutStamp);
//   debugger;
//   const leftTime = Math.floor((timeoutStamp - new Date().getTime()) / 1000);
//   console.log("leftTime", leftTime);
//   if (leftTime <= 0) return countDownInfo.turn;
// });

export const useTimeout = () => {
  const gameEssential = useAtomValue(gameEssentialAtom);
  const router = useRouter();
  const j1Timeout = useCallback(async () => {
    if (!gameEssential) return;
    const { contractAdd } = gameEssential;
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      alert("Please install metamask");
      return;
    }
    let network = window.ethereum.networkVersion;
    if (network !== "5") {
      alert("Please change your network to goerli");
      return null;
    }
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RPSContract = new Contract(contractAdd, RSPAbi, signer);
    const tx = await RPSContract.j1Timeout();
    await tx.wait();
    alert("Stake has be returned sucessfully");
    router.push("/");
  }, []);

  const j2Timeout = useCallback(async () => {
    if (!gameEssential) return;
    const { contractAdd } = gameEssential;
    //to avoid error during server pre-rendering
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      alert("Please install metamask");
      return;
    }
    let network = window.ethereum.networkVersion;
    if (network !== "5") {
      alert("Please change your network to goerli");
      return null;
    }
    const signer = await new BrowserProvider(window.ethereum).getSigner();
    const RPSContract = new Contract(contractAdd, RSPAbi, signer);
    const tx = await RPSContract.j2Timeout();
    await tx.wait();
    alert("Stake has be returned sucessfully");
    router.push("/");
  }, []);

  return { j1Timeout, j2Timeout };
};
