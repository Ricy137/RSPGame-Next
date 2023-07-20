import { useCallback } from "react";
import { atom, useAtom } from "jotai";

export const accountsAtom = atom<string[]>([]);
export const networkAtom = atom<string | undefined>("");

export const useAccountsAtom = () => {
  const [accountsData, setAccounts] = useAtom(accountsAtom);
  const [networkData, setNetwork] = useAtom(networkAtom);

  const detect = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!window.ethereum) {
      throw new Error("Please install MetaMask");
    }
  }, []);

  const initial = useCallback(async () => {
    await detect();
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    setAccounts(accounts);
    const network = await window.ethereum.networkVersion;
    setNetwork(network);
  }, []);

  const connect = useCallback(async () => {
    await detect();
    if (!accountsData || accountsData.length === 0) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
    if (networkData !== "5") {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x5" }],
      });
      setNetwork("5");
    }
  }, [accountsData, networkData]);

  return {
    initial,
    connect,
  };
};
